package services

import javax.inject.{Inject, Singleton}

import com.google.gson.JsonObject
import play.api.inject.ApplicationLifecycle

trait NewsItem {
  val title: String
  val shortDescription: String
  val url: String

  val asJson: JsonObject = {
    val obj = new JsonObject
    obj.addProperty("title", title)
//    obj.addProperty("shortDescription", )
  }
}

@Singleton
class NewsService @Inject() (lifecycle: ApplicationLifecycle) {

}
