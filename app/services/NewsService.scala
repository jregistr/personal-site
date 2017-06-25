package services

import javax.inject.{Inject, Singleton}

import play.api.inject.ApplicationLifecycle

trait NewsItem {
  val title: String
  val shortDescription: String
  val url: String

}

@Singleton
class NewsService @Inject() (lifecycle: ApplicationLifecycle) {

}
