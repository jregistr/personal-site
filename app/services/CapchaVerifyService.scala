package services

import javax.inject.Inject

import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json.{JsObject, JsString, Json}
import play.api.libs.ws.WSClient
import services.Constants.ServerConfig

import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

/**
  * Trait for recapcha verification service.
  */
trait CapchaVerifyService {

  /**
    * Verifies a recapcha token.
    *
    * @param capChaToken - The capcha token to verify.
    * @return - An attempt at verifying a token.
    */
  def verify(capChaToken: String): Future[Try[Boolean]]
}

class QueryingCapchaService @Inject()(configLoader: ConfigLoader, ws: WSClient) extends CapchaVerifyService {
  /**
    * Verifies a recapcha token.
    *
    * @param capChaToken - The capcha token to verify.
    * @return - An attempt at verifying a token.
    */
  override def verify(capChaToken: String): Future[Try[Boolean]] = configLoader.loadObject(ServerConfig._1, Some(ServerConfig._2)).map {
    case Success(config) =>
      val secretTry: Try[String] = Try({
        (config \ "capchaSecret").as[String]
      })

      val send: Future[Try[Boolean]] = secretTry match {
        case Success(secret) =>
          val request = ws
            .url("https://www.google.com/recaptcha/api/siteverify")
            .withHeaders(
              "Accept" -> "application/json",
              "Content-type" -> "application/x-www-form-urlencoded"
            )

          val processResponse: Future[Try[Boolean]] = request.post(
            Seq(
              s"secret=$secret",
              s"response=$capChaToken"
            ).mkString("&")
          ).map { response =>
            Try({
              val json = response.json
              println(Json.stringify(json))
              val success = (json \ "success").as[Boolean]
              success
            })
          }

          processResponse
        case Failure(t) => Future {
          Failure(t)
        }
      }
      send
    case Failure(t) => Future {
      Failure(t)
    }
  }.flatMap(identity)
}