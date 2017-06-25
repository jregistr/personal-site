package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import play.api.mvc._
import services.MailerService

import scala.concurrent.Future

class MailController @Inject()(mailerService: MailerService) extends Controller {

  def index(name: String, email: String, subject: String, message: String): Action[AnyContent] = Action.async {
    val result: Future[Boolean] = mailerService.sendMail(name, email, subject, message)
    result.map{value =>
      val out = Json.obj(
        "result" -> value
      )
      if(value) Ok(out) else BadRequest(out)
    }
  }

}
