package services

import java.io.FileInputStream
import javax.inject.Inject

import akka.actor._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}


trait ConfigLoader {

  def loadObject(configFileName: String, fallBackFileName: Option[String]): Future[Try[JsObject]] =
    load(configFileName, fallBackFileName)(_.as[JsObject])

  def loadArray(configFileName: String, fallBackFileName: Option[String]): Future[Try[JsArray]] =
    load(configFileName, fallBackFileName)(_.as[JsArray])

  protected def load[T <: JsValue](configFileName: String, fallBackFileName: Option[String])
                                  (convert: JsValue => T): Future[Try[T]]
}

class JsonConfigLoader @Inject()(akkaSystem: ActorSystem) extends ConfigLoader {
  implicit val myExecutionContext: ExecutionContext = akkaSystem.dispatchers.lookup("contexts.file-loadups")

  override protected def load[T](configFileName: String, fallBackFileName: Option[String] = None)
                                (convert: JsValue => T): Future[Try[T]] = Future {

    val configOptionUrl: Try[String] = Try(getClass.getResource(configFileName).getFile) match {
      case u: Success[_] => u
      case f: Failure[_] => fallBackFileName match {
        case Some(fallback) => Try(getClass.getResource(fallback).getFile)
        case _ => f
      }
    }

    configOptionUrl match {
      case Success(url) =>
        Try(convert(Json.parse(new FileInputStream(url))))
      case f: Failure[_] => Failure(f.exception)
    }
  }
}
