package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{JsArray, JsNull, JsObject, JsValue}
import play.api.mvc._
import services.{ConfigLoader, NewsService}
import services.Constants._

import scala.concurrent.Future
import scala.util.{Success, Try}

/**
  * Controller to pass render data to the front end.
  * @param configLoader - The configuration file loader service.
  * @param newsService - The news updater service.
  */
class ConfigDataController @Inject()(configLoader: ConfigLoader,
                                     newsService: NewsService) extends DataController(configLoader) {
  /**
    * Simple pass through. Retrieves the app config list and passes it forward.
    * @return - Returns the app loaded config data as json.
    */
  def app: Action[AnyContent] = renderConfigObj(AppConfig._1, Some(AppConfig._2))

  /**
    * @see [[ConfigDataController.app]]
    */
  def profile: Action[AnyContent] = renderConfigObj(ProfileConfig._1, Some(ProfileConfig._2))

  /**
    * @see [[ConfigDataController.app]]
    */
  def credits: Action[AnyContent] = renderConfigObj(CreditsConfig._1, Some(CreditsConfig._2))

  /**
    * Loads up multiple config files and combines them into one json output. This payload contans most of the
    * data that is rendered on the page.
    * @return Returns the object housing the different loaded config file data.
    */
  def main: Action[AnyContent] = Action.async {
    // Load up work config, featured, langs and articles into a future of a tuple of 4
    val configs: Future[(Try[JsArray], Try[JsArray], Try[JsObject], Try[JsArray])] = for {
      occupationsTry <- configLoader.loadArray(WorkHistoryConfig._1, Some(WorkHistoryConfig._2))
      projectsTry <- configLoader.loadArray(FeaturedProjectsConfig._1, Some(FeaturedProjectsConfig._2))
      techSumTry <- configLoader.loadObject(LangsFramesConfig._1, Some(LangsFramesConfig._2))
      articlesTry <- configLoader.loadArray(ArticlesConfig._1, Some(ArticlesConfig._2))
    } yield (occupationsTry, projectsTry, techSumTry, articlesTry)

    // map over the future
    configs.map { fut: (Try[JsArray], Try[JsArray], Try[JsObject], Try[JsArray]) =>
      // pair each try with a key for the final object
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

      // render the final object
      Ok(succMessage(JsObject(pairs)))
    }
  }

  /**
    * Simple pass through for the new service data.
    * @return Returns the data returned to it by the news service.
    */
  def news: Action[AnyContent] = Action.async {
    val newsFuture: Future[Try[JsArray]] = newsService.findArticles()
    renderFutureData(newsFuture)
  }

}
