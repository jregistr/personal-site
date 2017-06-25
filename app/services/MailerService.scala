package services

import javax.inject.Inject
import javax.mail.Message.RecipientType
import javax.mail.internet.{InternetAddress, MimeMessage}
import javax.mail.{Session, internet}

import play.api.Logger
import services.Constants.AppConfig

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.{Failure, Success, Try}


trait Mailer {
  def sendMail(senderName: String, senderEmail: String, subject: String, content: String): Future[Boolean]
}

class MailerService @Inject()(loader: ConfigLoader) extends Mailer {

  val logger = Logger(getClass)

  def sendMail(senderName: String, senderEmail: String, subject: String, content: String): Future[Boolean] =
    loader.load(AppConfig._1, Some(AppConfig._2)).map { config =>
      val send: Try[Unit] = Try({
        val appEmail = config.get("gEmail").getAsString

        val props = System.getProperties
        props.put("mail.smtp.port", new Integer(587))
        props.put("mail.smtp.auth", "true")
        props.put("mail.smtp.starttls.enable", "true")

        val session = Session.getDefaultInstance(props, null)

        val message = new MimeMessage(session)
        message.setFrom(new internet.InternetAddress(appEmail,
          s"${config.get("appName").getAsString} -- $senderName"))

        message.addRecipient(RecipientType.TO, new InternetAddress(config.get("recipientEmail").getAsString))
        message.setSubject(subject)

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
        transport.connect("smtp.gmail.com", appEmail, config.get("gAppPassword").getAsString)
        transport.sendMessage(message, message.getAllRecipients)
        transport.close()
      })
      send match {
        case _: Success[_] => true
        case Failure(e) =>
          logError(senderEmail, subject, e)
          false
      }
    }

  private def logError(sender: String, subject: String, e: Throwable): Unit = {
    logger.error(s"Message by: $sender with subject: $subject failed to be sent", e)
  }

}
