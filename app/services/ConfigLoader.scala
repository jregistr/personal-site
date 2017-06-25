package services

import java.io.FileReader
import javax.inject.Inject

import com.google.gson.{JsonArray, JsonElement, JsonObject, JsonParser}
import com.google.gson.stream.JsonReader

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}
import akka.actor._


trait ConfigLoader {

  def loadObject(configFileName: String, fallBackFileName: Option[String]): Future[Try[JsonObject]] =
    load(configFileName, fallBackFileName)(_.getAsJsonObject)

  def loadArray(configFileName: String, fallBackFileName: Option[String]): Future[Try[JsonArray]] =
    load(configFileName, fallBackFileName)(_.getAsJsonArray)

  protected def load[T <: JsonElement](configFileName: String, fallBackFileName: Option[String])
                                      (convert: JsonElement => T): Future[Try[T]]
}

class JsonConfigLoader @Inject()(akkaSystem: ActorSystem) extends ConfigLoader {
  implicit val myExecutionContext: ExecutionContext = akkaSystem.dispatchers.lookup("contexts.file-loadups")

  override protected def load[T](configFileName: String, fallBackFileName: Option[String] = None)
                                (convert: JsonElement => T): Future[Try[T]] = Future {

    val configOptionUrl: Try[String] = Try(getClass.getResource(configFileName).getFile) match {
      case u: Success[_] => u
      case f: Failure[_] => fallBackFileName match {
        case Some(fallback) => Try(getClass.getResource(fallback).getFile)
        case _ => f
      }
    }

    configOptionUrl match {
      case Success(url) =>
        val reader = new JsonReader(new FileReader(url))
        Try(convert(new JsonParser().parse(reader)))
      case Failure(e) => throw e
    }
  }
}
