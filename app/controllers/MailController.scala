package controllers

import javax.inject._

import play.api.mvc._
import services.MailerService

class MailController @Inject()(mailerService: MailerService) extends Controller {

  def index(name: String, email: String, subject: String, message: String) = Action {
    val result = mailerService.sendMail(name, email, subject, message)
    if (result) Ok(s"$result") else BadRequest(s"$result")
  }

}
