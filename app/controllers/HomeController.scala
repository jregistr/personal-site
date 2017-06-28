package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter
import services.ConfigDataService

import scala.concurrent.Future
import scala.util.{Success, Try}

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
    val collected: Future[(Try[String], Try[String])] = for {
      titleFuture <- configDataService.title
      favFuture <- configDataService.favicon
    } yield (titleFuture, favFuture)

    collected map { tupled: (Try[String], Try[String]) =>
      val toList: List[Option[String]] = List(tupled._1, tupled._2).map {
        case Success(value) => Some(value)
        case _ => None
      }
      Ok(views.html.index((toList.head, toList(1))))
    }
  }

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.MailController.index
      )
    ).as("text/javascript")
  }

}
