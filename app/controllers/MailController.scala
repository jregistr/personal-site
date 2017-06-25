package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.JsNull
import play.api.mvc._
import services.Constants.{failMessage, succMessage}
import services.MailerService

import scala.concurrent.Future

/**
  * Controller to handle mailing.
  *
  * @param mailerService - A dependency on the mailing service.
  */
class MailController @Inject()(mailerService: MailerService) extends Controller {

  /**
    * Action to process message input and send email.
    *
    * @param name    - The name of the sender.
    * @param email   - The email of the sender.
    * @param subject - The subject of the message.
    * @param message - The content of the message.
    * @return - Returns a json describing the success of the operation.
    */
  def index(name: String, email: String, subject: String, message: String): Action[AnyContent] = Action.async {
    // call to the mailing service to send an email
    val result: Future[Boolean] = mailerService.sendMail(name, email, subject, message)
    result
      .map(value => {
        if (value) Ok(succMessage(JsNull)) else BadRequest(failMessage("Did not successfully send message"))
      })
  }

}
