package services

import javax.inject.Inject
import javax.mail.Message.RecipientType
import javax.mail.internet.{InternetAddress, MimeMessage}
import javax.mail.{Session, internet}

import play.api.Logger
import play.api.libs.json.JsObject
import services.Constants.ServerConfig

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success, Try}

/**
  * Trait to describe the mailer.
  */
trait Mailer {

  /**
    * Makes use of google smtp to send a message to the recipient listed in the config file.
    *
    * @param senderName  - The name of the sender.
    * @param senderEmail - The email of the sender.
    * @param subject     - The subject of the message.
    * @param content     - The content of the message.
    * @return - Returns a future with a boolean for the successful-nes of the action.
    */
  def sendMail(senderName: String, senderEmail: String, subject: String, content: String): Future[Boolean]
}

/**
  * An implementation of the [[Mailer]].
  *
  * @param loader - A dependency on the [[ConfigLoader]] service.
  */
class MailerService @Inject()(loader: ConfigLoader) extends Mailer {

  val logger = Logger(getClass)

  /**
    * @inheritdoc
    */
  def sendMail(senderName: String, senderEmail: String, subject: String, content: String): Future[Boolean] =
  //load up the serve config json file
    loader.loadObject(ServerConfig._1, Some(ServerConfig._2)).map { config =>
      // Attempt to configure SMTP and send the message using Google smtp.
      val send = sendMessage(config, senderName, senderEmail, subject, content)

      send match {
        case _: Success[_] => true
        case Failure(e) =>
          logError(senderEmail, subject, e)
          false
      }
    }

  /**
    *
    * @param config - The config json file.
    * @see [[sendMail]]
    * @return - Returns an empty try object.
    */
  private def sendMessage(config: JsObject, senderName: String, senderEmail: String,
                          subject: String, content: String): Try[Unit] = Try({
    val appEmail = (config \ "gEmail").as[String]

    //Configure the properties
    val props = System.getProperties
    props.put("mail.smtp.port", new Integer(587))
    props.put("mail.smtp.auth", "true")
    props.put("mail.smtp.starttls.enable", "true")

    val session = Session.getDefaultInstance(props, null)
    val message = new MimeMessage(session)

    // The email is sent from the app email, the name of the app and the sender's name are attached together
    // to make identifying these messages easy.
    message.setFrom(new internet.InternetAddress(appEmail,
      s"${(config \ "appName").as[String]} -- $senderName"))

    // Sets up the recipient as the one listed in the file.
    message.addRecipient(RecipientType.TO, new InternetAddress((config \ "recipientEmail").as[String]))
    message.setSubject(subject)

    // Configures the body of the message. The senders information are added here as well as their message.
    message.setContent(
      s"""
         |<strong>From: $senderName</strong> <br>
         |<strong>Email: $senderEmail</strong><br>
         |<strong>Content:</strong>
         |<p>$content</p>
                  """.stripMargin,
      "text/html")

    message.setHeader("label", "Personal Site")
    val transport = session.getTransport("smtp")
    transport.connect("smtp.gmail.com", appEmail, (config \ "gAppPassword").as[String])
    transport.sendMessage(message, message.getAllRecipients)
    transport.close()
  })

  /**
    * Method to log an error.
    *
    * @param sender  - The sender's name.
    * @param subject - The subject of the message.
    * @param e       - The error that occurred.
    */
  private def logError(sender: String, subject: String, e: Throwable): Unit = {
    logger.error(s"Message by: $sender with subject: $subject failed to be sent", e)
  }

}
