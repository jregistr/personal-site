package controllers

import play.api.Logger
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.JsValue
import play.api.mvc._
import services.ConfigDataService
import services.Constants.{failMessage, succMessage}

import scala.concurrent.Future

/**
  * Base controller class for the controllers that supply data to the front end.
  *
  * @param dataService - A dependency on the data loader service service.
  */
abstract class DataController(dataService: ConfigDataService) extends Controller {

  protected val logger = Logger(getClass)

  protected val FailedMessage = "Failed to load data"

  /**
    * Pattern matches on a [[Future]]  to determine what to render.
    *
    * @param data - The data to match over.
    * @return - Returns an [[Ok]] response if operation was successful or an [[InternalServerError]] otherwise.
    */
  def renderFutureData(data: Future[JsValue]): Future[Result] = {
    data map { res => Ok(succMessage(res))
    } recover {
      case t: Throwable =>
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
  def renderConfig(data: Future[JsValue]): Action[AnyContent] = Action.async {
    renderFutureData(data)
  }

}
