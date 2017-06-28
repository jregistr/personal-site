package services

import javax.inject.{Inject, Singleton}

import play.api.libs.json.{JsArray, JsNull, JsObject, JsValue}
import services.Constants._

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}
import play.api.libs.concurrent.Execution.Implicits._

/**
  * Trait for configuration data loading.
  */
trait ConfigDataService {
  def title: Future[Try[String]]
  def app: Future[Try[JsObject]]
  def profile: Future[Try[JsObject]]
  def credits: Future[Try[JsObject]]
  def github: Future[Try[JsObject]]
  def mains: Future[Try[JsObject]]
}

/**
  * An implementation of [[ConfigDataService]] that loads data from the config json files.
  */
@Singleton
class FileBasedConfigDataService @Inject()(configLoader: ConfigLoader) extends ConfigDataService {

  override def title: Future[Try[String]] = configLoader.loadObject(ServerConfig._1, Some(ServerConfig._2)) map {
    case Success(config) => Try({
      (config \ "title").as[String]
    })
    case Failure(t) => Failure(t)
  }

  override def app: Future[Try[JsObject]] = configLoader.loadObject(AppConfig._1, Some(AppConfig._2))

  override def profile: Future[Try[JsObject]] = configLoader.loadObject(ProfileConfig._1, Some(ProfileConfig._2))

  override def credits: Future[Try[JsObject]] = configLoader.loadObject(CreditsConfig._1, Some(CreditsConfig._2))

  override def github: Future[Try[JsObject]] = configLoader.loadObject(GithubConfig._1, Some(GithubConfig._2))

  override def mains: Future[Try[JsObject]] = (for {
    // Load all the config objects to put together
    occupationsTry <- configLoader.loadArray(WorkHistoryConfig._1, Some(WorkHistoryConfig._2))
    projectsTry <- configLoader.loadArray(FeaturedProjectsConfig._1, Some(FeaturedProjectsConfig._2))
    techSumTry <- configLoader.loadObject(LangsFramesConfig._1, Some(LangsFramesConfig._2))
    articlesTry <- configLoader.loadArray(ArticlesConfig._1, Some(ArticlesConfig._2))
  } yield (occupationsTry, projectsTry, techSumTry, articlesTry))

    .map { fut: (Try[JsArray], Try[JsArray], Try[JsObject], Try[JsArray]) =>
      val pairs: List[(String, JsValue)] = List(
        "occupations" -> fut._1,
        "projects" -> fut._2,
        "techSummary" -> fut._3,
        "articles" -> fut._4
      ).map(p => {
        // if it was successfully loaded, at it, else add null
        p._2 match {
          case Success(jsValue) => p._1 -> jsValue
          case _ => p._1 -> JsNull
        }
      })
      Success(JsObject(pairs))
    }

}
