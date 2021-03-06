import com.google.inject.AbstractModule
import java.time.Clock

import services._

/**
 * This class is a Guice module that tells Guice how to bind several
 * different types. This Guice module is created when the Play
 * application starts.

 * Play will automatically use any class called `Module` that is in
 * the root package. You can create modules in other locations by
 * adding `play.modules.enabled` settings to the `application.conf`
 * configuration file.
 */
class Module extends AbstractModule {

  /**
    * Configures the dependency binding for custom service classes.
    */
  override def configure(): Unit = {
    bind(classOf[Clock]).toInstance(Clock.systemDefaultZone)
    bind(classOf[ConfigLoader]).to(classOf[JsonConfigLoader])
    bind(classOf[Mailer]).to(classOf[MailerService])
    bind(classOf[CapchaVerifyService]).to(classOf[QueryingCapchaService])

    bind(classOf[NewsService]).to(classOf[QueryingNewsService]).asEagerSingleton()
    bind(classOf[ConfigDataService]).to(classOf[FileBasedConfigDataService]).asEagerSingleton()
  }

}
