package services

import java.io.FileReader

import com.google.gson.{JsonObject, JsonParser}
import com.google.gson.stream.JsonReader

import scala.util.{Failure, Success, Try}

trait ConfigLoader {
  def load(configFileName: String, fallBackFileName: Option[String]): Try[JsonObject]
}

class JsonConfigLoader extends ConfigLoader {
  override def load(configFileName: String, fallBackFileName: Option[String] = None): Try[JsonObject] = {
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
        Try(new JsonParser().parse(reader).getAsJsonObject)
      case Failure(e) => Failure(e)
    }
  }
}
