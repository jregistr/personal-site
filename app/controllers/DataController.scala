package controllers

import com.google.gson.{JsonElement, JsonObject}
import play.api.Logger
import play.api.mvc._

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}
import services.Constants.JsonContentType
import play.api.libs.concurrent.Execution.Implicits._
import services.ConfigLoader

abstract class DataController(configLoader: ConfigLoader) extends Controller {

  protected val logger = Logger(getClass)

  protected val FailedMessage = "Failed to load data"

  def renderFutureData(data: Future[Try[JsonElement]]): Future[Result] = {
    data.map {
      case Success(result) => Ok(result.toString).as(JsonContentType)
      case Failure(t) =>
        logger.error(FailedMessage, t)
        InternalServerError(FailedMessage)
    }
  }

  def renderConfigObj(configFileName: String, fallBack: Option[String]): Action[AnyContent] = Action.async {
    val configFileFuture: Future[Try[JsonObject]] = configLoader.loadObject(configFileName, fallBack)
    renderFutureData(configFileFuture)
  }

}
