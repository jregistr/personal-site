package controllers

import javax.inject._

import play.api.mvc._
import services.MailerService

/**
  * This controller creates an [[Action]] to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject() (mailer: MailerService) extends Controller {

  /**
    * @return Returns the application home page.
    */
  def index = Action {
    Ok(views.html.index())
  }

}
