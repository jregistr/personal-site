package controllers

import javax.inject._

import com.google.gson.{JsonArray, JsonElement, JsonObject}
import play.api.libs.concurrent.Execution.Implicits._
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
    val configs: Future[(Try[JsonArray], Try[JsonArray], Try[JsonObject], Try[JsonArray])] = for {
      occupationsTry <- configLoader.loadArray(WorkHistoryConfig._1, Some(WorkHistoryConfig._2))
      projectsTry <- configLoader.loadArray(FeaturedProjectsConfig._1, Some(FeaturedProjectsConfig._2))
      techSumTry <- configLoader.loadObject(LangsFramesConfig._1, Some(LangsFramesConfig._2))
      articlesTry <- configLoader.loadArray(ArticlesConfig._1, Some(ArticlesConfig._2))
    } yield (occupationsTry, projectsTry, techSumTry, articlesTry)

    val mainData = new JsonObject()

    configs.map { fut: (Try[JsonArray], Try[JsonArray], Try[JsonObject], Try[JsonArray]) =>
      def add(key: String, tryData: Try[JsonElement]): Unit = {
        tryData match {
          case Success(value) => mainData.add(key, value)
          case _=>
        }
      }

      add("occupations", fut._1)
      add("projects", fut._2)
      add("techSummary", fut._3)
      add("articles", fut._4)

      Ok(mainData.toString).as(JsonContentType)
    }
  }

}
