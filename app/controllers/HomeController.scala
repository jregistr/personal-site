package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter
import services.ConfigDataService

import scala.concurrent.Future

/**
  * This controller creates an [[Action]] to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class HomeController @Inject()(configDataService: ConfigDataService) extends Controller {

  /**
    * @return Returns the application home page.
    */
  def index: Action[AnyContent] = Action.async {
    val collected: Future[(Option[String], Option[String])] = for {
      titleFuture <- configDataService.title.map { t => Option(t) } recover { case _ => None }
      favFuture <- configDataService.favicon.map { t => Option(t) } recover { case _ => None }
    } yield (titleFuture, favFuture)
    collected
      .map { res => Ok(views.html.index(res)) }
      .recover { case _ => Ok(views.html.index((None, None))) }
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.MailController.index
      )
    ).as("text/javascript")
  }

}
