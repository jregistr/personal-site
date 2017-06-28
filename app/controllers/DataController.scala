package controllers

import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.JsValue
import play.api.mvc._
import services.ConfigDataService
import services.Constants.{failMessage, succMessage}

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

/**
  * Base controller class for the controllers that supply data to the front end.
  *
  * @param dataService - A dependency on the data loader service service.
  */
abstract class DataController(dataService: ConfigDataService) extends Controller {

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
    * Method to render the given data to the user.
    *
    * @param data - The data to render.
    * @return - The provided user as a response to be sent over to the user.
    */
  def renderConfig(data: Future[Try[JsValue]]): Action[AnyContent] = Action.async {
    renderFutureData(data)
  }

}
