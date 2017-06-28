package controllers

import javax.inject._

import play.api.mvc._
import services.{ConfigDataService, NewsService}

/**
  * Controller to pass render data to the front end.
  *
  * @param configDataService - The configuration file loader service.
  * @param newsService       - The news updater service.
  */
class ConfigDataController @Inject()(configDataService: ConfigDataService,
                                     newsService: NewsService) extends DataController(configDataService) {
  /**
    * Simple pass through. Retrieves the app config list and passes it forward.
    *
    * @return - Returns the app loaded config data as json.
    */
  def app: Action[AnyContent] = renderConfig(configDataService.app)

  /**
    * @see [[ConfigDataController.app]]
    */
  def profile: Action[AnyContent] = renderConfig(configDataService.profile)

  /**
    * @see [[ConfigDataController.app]]
    */
  def credits: Action[AnyContent] = renderConfig(configDataService.credits)

  /**
    * @see [[ConfigDataController.app]]
    */
  def github: Action[AnyContent] = renderConfig(configDataService.github)

  /**
    * @see [[ConfigDataController.app]]
    */
  def main: Action[AnyContent] = renderConfig(configDataService.mains)

  /**
    * Simple pass through for the new service data.
    *
    * @return Returns the data returned to it by the news service.
    */
  def news: Action[AnyContent] = renderConfig(newsService.findArticles())

}
