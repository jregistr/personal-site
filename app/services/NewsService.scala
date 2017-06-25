package services

import javax.inject.{Inject, Singleton}

import akka.actor.ActorSystem
import play.api.Logger
import play.api.inject.ApplicationLifecycle
import play.api.libs.json._
import play.api.libs.ws._
import services.Constants.ServerConfig

import scala.collection.JavaConversions._
import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}
import scala.concurrent.duration._
import scala.language.postfixOps

trait NewsService {
  def findArticles(): Future[Try[JsArray]]

  protected def queryArticles(): Future[Try[JsArray]]
}

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
  akkaSystem.scheduler.schedule(10 minutes, 10 minutes) {
    updateArticlesList()
  }

  private lazy val logger = Logger(getClass)

  private lazy val apiKeyFuture: Future[Option[String]] = configLoader.loadObject(ServerConfig._1, Some(ServerConfig._2)) map {
    case Success(jsObject) => Try((jsObject \ "newsApiKey").as[String]) match {
      case Success(key) => Some(key)
      case _ => None
    }
    case _ => None
  }

  private val store: ListBuffer[JsValue] = new ListBuffer[JsValue]

  private def apiRequests(key: String) = List(
    newsApiReq("hacker-news", key),
    newsApiReq("the-verge", key),
    newsApiReq("engadget", key)
  )

  private def newsApiReq(source: String, key: String): WSRequest = ws.url("https://newsapi.org/v1/articles")
    .withHeaders("Accept" -> "application/json")
    .withQueryString(
      "source" -> source,
      "sortBy" -> "latest",
      "apiKey" -> key
    )
    .withFollowRedirects(true)

  override def findArticles(): Future[Try[JsArray]] = Future {
    Try(JsArray(store.reverse))
  }

  override protected def queryArticles(): Future[Try[JsArray]] = apiKeyFuture.map {
    case Some(key) =>
      val requestFutures: List[Future[WSResponse]] = apiRequests(key).map(req => req.get())
      val flattened: Future[List[WSResponse]] = Future.sequence(requestFutures)

      val articlesFuture: Future[JsArray] = flattened map (list => {
        val collected = list collect {
          case response: WSResponse if (response.json \ "status").as[String] == "ok" =>
            val articles: List[JsValue] = (response.json \ "articles").as[JsArray].value.filterNot(article => {
              val title = article \ "title"
              val description = article \ "description"
              val url = article \ "url"
              title.isInstanceOf[JsUndefined] || description.isInstanceOf[JsUndefined] || url.isInstanceOf[JsUndefined]
            }).toList

            val top: List[JsValue] =
              if (articles.size <= 3)
                articles
              else
                articles.subList(0, 3).toList
            top
        }
        JsArray(collected.flatten)
      })

      articlesFuture.map { array =>
        Try(array)
      }
    case None => Future {
      Try(JsArray())
    }
  }.flatMap(identity)

  private def updateArticlesList(): Unit = queryArticles() map {
    case Success(articles) =>
      val diff: Seq[JsValue] = articles.value.filterNot(queried => {
        val queriedUrl: String = (queried \ "url").as[String]
        val find = store.find(p => (p \ "url").as[String] == queriedUrl)
        find.isDefined
      })

      store.appendAll(diff)
    case Failure(t) => logger.error("Updating articles failed", t)
  }

}
