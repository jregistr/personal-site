package services

import java.io.FileInputStream
import javax.inject.Inject

import akka.actor._
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.{Failure, Success, Try}

/**
  * Trait for the config loader service.
  */
trait ConfigLoader {

  /**
    * Attemps to load a config file as a json object.
    *
    * @param configFileName   - The name of the config file to load.
    * @param fallBackFileName - The fallback file to load if the first one wasn't found.
    * @return - Returns a [[Future]] containing the a [[Try]] of [[JsObject]].
    */
  def loadObject(configFileName: String, fallBackFileName: Option[String]): Future[JsObject] =
    load(configFileName, fallBackFileName)(_.as[JsObject])

  /**
    * @see [[ConfigLoader.loadObject]]
    */
  def loadArray(configFileName: String, fallBackFileName: Option[String]): Future[JsArray] =
    load(configFileName, fallBackFileName)(_.as[JsArray])

  /**
    * Generic method to load a config file object. Loads up a config file as a [[JsValue]] then used
    * convert to transform into expected data type.
    *
    * @param configFileName   @see [[ConfigLoader.loadObject]]
    * @param fallBackFileName @see [[ConfigLoader.loadObject]]
    * @param convert          - The function to run the loaded [[JsValue]] through.
    * @tparam T - A subclass of [[JsValue]].
    * @return - The loaded and converted data.
    */
  protected def load[T <: JsValue](configFileName: String, fallBackFileName: Option[String])
                                  (convert: JsValue => T): Future[T]
}

/**
  * An implementation of the [[ConfigLoader]] trait.
  *
  * @param akkaSystem - A dependency on the akka system. Used for configuring the [[ExecutionContext]].
  */
class JsonConfigLoader @Inject()(akkaSystem: ActorSystem) extends ConfigLoader {

  //execution content for file loading. This is configured in the application.conf
  implicit val myExecutionContext: ExecutionContext = akkaSystem.dispatchers.lookup("contexts.file-loadups")

  /**
    * @inheritdoc
    */
  override protected def load[T](configFileName: String, fallBackFileName: Option[String] = None)
                                (convert: JsValue => T): Future[T] = Future {

    // Attempt to load the config file. If it fails, attempt to load the fallback file.
    val configOptionUrl: Try[String] = Try(getClass.getResource(configFileName).getFile) match {
      case u: Success[_] => u
      case f: Failure[_] => fallBackFileName match {
        case Some(fallback) => Try(getClass.getResource(fallback).getFile)
        case _ => f
      }
    }

    // pattern match on the result of loading the file.
    configOptionUrl match {
      case Success(url) =>
        // If file loading was successful, try to parse and convert the data.
        convert(Json.parse(new FileInputStream(url)))
      case Failure(t) => throw t
    }
  }
}
