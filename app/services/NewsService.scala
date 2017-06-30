package services

import javax.inject.{Inject, Singleton}

import akka.actor.ActorSystem
import data.LeakyList
import play.api.Logger
import play.api.inject.ApplicationLifecycle
import play.api.libs.json._
import play.api.libs.ws._
import services.Constants.ServerConfig

import scala.collection.JavaConversions._
import scala.concurrent.duration._
import scala.concurrent.{ExecutionContext, Future}
import scala.language.postfixOps

/**
  * Trait for the news service provider.
  */
trait NewsService {

  /**
    * @return Returns the current news list.
    */
  def findArticles(): Future[JsArray]

  /**
    * Queries the news source for articles.
    *
    * @return - Returns the data that was retrieved from source.
    */
  protected def queryArticles(): Future[JsArray]
}

/**
  * An implementation of the [[NewsService]] that
  *
  * @param akkaSystem   - A dependency on the akka system to set up the [[ExecutionContext]] to run queries on.
  * @param configLoader - A dependency on the config loader service.
  * @param ws           - A dependency on the web service.
  * @param lifecycle    - A dependency on the application life cycle.
  */
@Singleton
class QueryingNewsService @Inject() private(akkaSystem: ActorSystem,
                                            configLoader: ConfigLoader,
                                            ws: WSClient,
                                            lifecycle: ApplicationLifecycle) extends NewsService {
  // Execution context, defined in application.conf
  implicit val myExecutionContext: ExecutionContext = akkaSystem.dispatchers.lookup("contexts.api-queries")

  //Set hook to clean up system when app goes down
  lifecycle.addStopHook { () =>
    Future.successful(akkaSystem.terminate())
  }

  //on start up, trigger querying for news
  updateArticlesList()

  // update the news every 10 minutes
  akkaSystem.scheduler.schedule(30 minutes, 30 minutes) {
    updateArticlesList()
  }

  private lazy val logger = Logger(getClass)

  //lazyly load the server config file and retrieve the api key from it.
  private lazy val apiKeyFuture: Future[String] = configLoader.loadObject(ServerConfig._1, Some(ServerConfig._2))
    .map { jsObject => (jsObject \ "newsApiKey").as[String] }

  // store the current news.
  private val store: LeakyList[JsValue] = LeakyList(15)

  /**
    * Creates a list of [[WSRequest]] objects for the set news sources.
    *
    * @param key - The api key to use.
    * @return - Returns the list of configured request objects.
    */
  private def apiRequests(key: String) = List(
    newsApiReq("hacker-news", key),
    newsApiReq("the-verge", key),
    newsApiReq("engadget", key)
  )

  /**
    * Configures a [[WSRequest]] object to query the api with.
    *
    * @param source - The source query parameter.
    * @param key    - The key parameter.
    * @return - A configured [[WSRequest]] object.
    */
  private def newsApiReq(source: String, key: String): WSRequest = ws.url("https://newsapi.org/v1/articles")
    .withHeaders("Accept" -> "application/json")
    .withQueryString(
      "source" -> source,
      "sortBy" -> "latest",
      "apiKey" -> key
    )
    .withFollowRedirects(true)

  /**
    * @inheritdoc
    */
  override def findArticles(): Future[JsArray] = Future {
    JsArray(store.underLying().reverse)
  }

  /**
    * @inheritdoc
    */
  override protected def queryArticles(): Future[JsArray] = apiKeyFuture.map { key =>
    // If there is an api key available
    //sends out the requests
    val requestFutures: List[Future[WSResponse]] = apiRequests(key).map(req => req.get())
    // when all responses have come back
    val flattened: Future[List[WSResponse]] = Future.sequence(requestFutures)

    val articlesFuture: Future[JsArray] = flattened map (list => {
      val collected = list collect {
        // filter out responses that don't have an "ok" status
        case response: WSResponse if (response.json \ "status").as[String] == "ok" =>
          val articles: List[JsValue] = (response.json \ "articles").as[JsArray].value.filterNot(article => {
            val title = article \ "title"
            val description = article \ "description"
            val url = article \ "url"
            // drop articles where title or description or url isn't present
            title.isInstanceOf[JsUndefined] || description.isInstanceOf[JsUndefined] || url.isInstanceOf[JsUndefined]
          }).toList

          //take the top three or everything if there's 3 or less available.
          val top: List[JsValue] =
            if (articles.size <= 3)
              articles
            else
              articles.subList(0, 3).toList
          top
      }
      JsArray(collected.flatten)
    })
    articlesFuture
  }.flatMap(identity)

  /**
    * Method to run to do an update on the current list of articles.
    */
  private def updateArticlesList(): Unit = queryArticles() map { articles =>
    val diff: Seq[JsValue] = articles.value.filterNot(queried => {
      val queriedUrl: String = (queried \ "url").as[String]
      val find = store.underLying().find(p => (p \ "url").as[String] == queriedUrl)
      find.isDefined
    })

    store.addAll(diff: _*)
  } recover {
    case e: Throwable => logger.error("Failed to update articles", e)
  }

}
