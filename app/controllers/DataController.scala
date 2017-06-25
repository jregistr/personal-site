package controllers

import play.api.Logger
import play.api.mvc._

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{JsObject, JsValue}
import services.ConfigLoader
import services.Constants.{succMessage, failMessage}

/**
  * Base controller class for the controllers that supply data to the front end.
  *
  * @param configLoader - A dependency on the config file loader service.
  */
abstract class DataController(configLoader: ConfigLoader) extends Controller {

  protected val logger = Logger(getClass)

  protected val FailedMessage = "Failed to load data"

  /**
    * Pattern matches on a [[Future]] housing a [[Try]] to determine what to render.
    *
    * @param data - The data to match over.
    * @return - Returns an [[Ok]] response if operation was successful or an [[InternalServerError]] otherwise.
    */
  def renderFutureData(data: Future[Try[JsValue]]): Future[Result] = {
    data.map {
      case Success(result) => Ok(succMessage(result))
      case Failure(t) =>
        logger.error(FailedMessage, t)
        InternalServerError(failMessage(FailedMessage))
    }
  }

  /**
    * Calls [[ConfigLoader]] service to load a file then renders the result.
    *
    * @param configFileName - The name of the file to load.
    * @param fallBack       - The fallback file if the config file wasn't found.
    * @return Returns the result of the file loading.
    */
  def renderConfigObj(configFileName: String, fallBack: Option[String]): Action[AnyContent] = Action.async {
    val configFileFuture: Future[Try[JsObject]] = configLoader.loadObject(configFileName, fallBack)
    renderFutureData(configFileFuture)
  }

}
