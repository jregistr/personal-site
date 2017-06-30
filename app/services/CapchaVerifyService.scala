package services

import javax.inject.Inject

import akka.actor.ActorSystem
import play.api.Logger
import play.api.libs.json.Json
import play.api.libs.ws.WSClient
import services.Constants.ServerConfig

import scala.concurrent.{ExecutionContext, Future}
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
  def verify(capChaToken: String): Future[Boolean]

}

/**
  * An  implementation of the capcha verify service.
  *
  * @param configLoader - Has a dependency on the config load to the secret.
  * @param ws           - Has a dependency on [[WSClient]] to make the verification request.
  * @param akkaSystem   - The actor system to use to load set up the execution content.
  */
class QueryingCapchaService @Inject()(configLoader: ConfigLoader, ws: WSClient,
                                      akkaSystem: ActorSystem) extends CapchaVerifyService {

  // Execution context, defined in application.conf
  implicit val myExecutionContext: ExecutionContext = akkaSystem.dispatchers.lookup("contexts.api-queries")

  private lazy val loadSecret: Future[String] = configLoader.loadObject(ServerConfig._1, Some(ServerConfig._2))
    .map { config =>
      (config \ "capchaSecret").as[String]
    }

  /**
    * Verifies a recapcha token.
    *
    * @param capChaToken - The capcha token to verify.
    * @return - An attempt at verifying a token.
    */
  override def verify(capChaToken: String): Future[Boolean] = loadSecret.map { secret =>
    val request = ws
      .url("https://www.google.com/recaptcha/api/siteverify")
      .withHeaders(
        "Accept" -> "application/json",
        "Content-type" -> "application/x-www-form-urlencoded"
      )

    val processResponse: Future[Boolean] = request.post(
      Seq(
        s"secret=$secret",
        s"response=$capChaToken"
      ).mkString("&")
    ).map { response =>
      val json = response.json
      val success = (json \ "success").as[Boolean]
      success
    }
    processResponse
  }.flatMap(identity)
}