package controllers

import javax.inject._

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.Json
import play.api.mvc._
import services.{ConfigLoader, MailerService}

import scala.concurrent.Future

class ConfigDataController @Inject() (configLoader: ConfigLoader) extends Controller {

//  def main = Action.async {
//    val configs = for{
//
//    }
//  }

}
