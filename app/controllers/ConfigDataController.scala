package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{JsArray, JsNull, JsObject, JsValue}
import play.api.mvc._
import services.ConfigLoader
import services.Constants._

import scala.concurrent.Future
import scala.util.{Success, Try}


class ConfigDataController @Inject()(configLoader: ConfigLoader) extends DataController(configLoader) {

  def app: Action[AnyContent] = renderConfigObj(AppConfig._1, Some(AppConfig._2))

  def profile: Action[AnyContent] = renderConfigObj(ProfileConfig._1, Some(ProfileConfig._2))

  def credits: Action[AnyContent] = renderConfigObj(CreditsConfig._1, Some(CreditsConfig._2))

  def main: Action[AnyContent] = Action.async {
    val configs: Future[(Try[JsArray], Try[JsArray], Try[JsObject], Try[JsArray])] = for {
      occupationsTry <- configLoader.loadArray(WorkHistoryConfig._1, Some(WorkHistoryConfig._2))
      projectsTry <- configLoader.loadArray(FeaturedProjectsConfig._1, Some(FeaturedProjectsConfig._2))
      techSumTry <- configLoader.loadObject(LangsFramesConfig._1, Some(LangsFramesConfig._2))
      articlesTry <- configLoader.loadArray(ArticlesConfig._1, Some(ArticlesConfig._2))
    } yield (occupationsTry, projectsTry, techSumTry, articlesTry)


    configs.map { fut: (Try[JsArray], Try[JsArray], Try[JsObject], Try[JsArray]) =>
      val pairs: List[(String, JsValue)] = List(
        "occupations" -> fut._1,
        "projects" -> fut._2,
        "techSummary" -> fut._3,
        "articles" -> fut._4
      ).map(p => {
        p._2 match {
          case Success(jsValue) => p._1 -> jsValue
          case _=> p._1 -> JsNull
        }
      })

      Ok(succMessage(JsObject(pairs)))
    }
  }

}
