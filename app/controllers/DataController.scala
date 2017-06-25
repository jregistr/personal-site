package controllers

import play.api.Logger
import play.api.mvc._

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{JsObject, JsValue}
import services.ConfigLoader
import services.Constants.{succMessage, failMessage}

abstract class DataController(configLoader: ConfigLoader) extends Controller {

  protected val logger = Logger(getClass)

  protected val FailedMessage = "Failed to load data"

  def renderFutureData(data: Future[Try[JsValue]]): Future[Result] = {
    data.map {
      case Success(result) => Ok(succMessage(result))
      case Failure(t) =>
        logger.error(FailedMessage, t)
        InternalServerError(failMessage(FailedMessage))
    }
  }

  def renderConfigObj(configFileName: String, fallBack: Option[String]): Action[AnyContent] = Action.async {
    val configFileFuture: Future[Try[JsObject]] = configLoader.loadObject(configFileName, fallBack)
    renderFutureData(configFileFuture)
  }

}
