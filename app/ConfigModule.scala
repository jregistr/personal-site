import com.typesafe.config.Config
import play.api.{Configuration, Environment}
import play.api.inject.{Binding, Module => InjectModule}

class ConfigModule extends InjectModule {
  override def bindings(environment: Environment, configuration: Configuration): Seq[Binding[_]] = Seq(
    bind[Config].toInstance(configuration.underlying)
  )
}
