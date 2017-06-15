import javax.inject._
import play.api._
import play.api.http.HttpFilters
import play.api.mvc._

import filters.ExampleFilter

/**
 * This class configures filters that run on every request. This
 * class is queried by Play to get a list of filters.
 *
 * Play will automatically use filters from any class called
 * `Filters` that is placed the root package. You can load filters
 * from a different class by adding a `play.http.filters` setting to
 * the `application.conf` configuration file.
 *
 * each response.
 */
@Singleton
class Filters @Inject() () extends HttpFilters {

  override val filters: Seq[Filter] = {
//    // Use the example filter if we're running development mode. If
//    // we're running in production or test mode then don't use any
//    // filters at all.
//    if (env.mode == Mode.Dev) Seq(exampleFilter) else Seq.empty
  }

}
