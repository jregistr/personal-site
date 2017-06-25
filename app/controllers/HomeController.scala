package controllers

import javax.inject._

import play.api._
import play.api.mvc._
import services.MailerService

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject() (mailer: MailerService) extends Controller {

  def index = Action {
    Ok(views.html.index())
  }

  def beam = Action {
    mailer.sendMail("Burly Troll Man","jregistr@oswego.edu", "Ma money", "So much cool stuff! \nCool stuff!!!")
    Ok("HI")
  }

}
