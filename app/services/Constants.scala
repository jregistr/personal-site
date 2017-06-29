package services

import play.api.libs.json.{JsBoolean, JsObject, JsString, JsValue}

/**
  * Object to house some common used constants and methods.
  */
object Constants {

  val ServerConfig: (String, String) = ("/_server.config.json", "/_server.config.example.json")

  val AppConfig: (String, String) = ("/app.config.json", "/app.config.example.json")
  val ProfileConfig: (String, String) = ("/profile.config.json", "/profile.config.example.json")
  val WorkHistoryConfig: (String, String) = ("/work-history.config.json", "/work-history.config.example.json")
  val FeaturedProjectsConfig: (String, String) = ("/featured-projects.config.json", "/featured-projects.config.example.json")
  val LangsFramesConfig: (String, String) = ("/langs-frames.config.json", "/langs-frames.config.example.json")
  val ArticlesConfig: (String, String) = ("/articles.config.json", "/articles.config.example.json")

  val CreditsConfig: (String, String) = ("/credits.config.json", "/credits.config.example.json")
  val GithubConfig: (String, String) = ("/github.config.json", "/github.config.example.json")

  /**
    * Creates the standard format for json returned to the user when a failure occured.
    *
    * @param message - The message to display.
    * @return - Returns a [[JsObject]] with the given message and the value success as false.
    */
  def failMessage(message: String): JsObject = JsObject(Seq(
    "success" -> JsBoolean(false),
    "message" -> JsString(message)
  ))

  /**
    * @see [[failMessage()]]
    * @param data - The data to render.
    */
  def succMessage(data: JsValue): JsObject = JsObject(Seq(
    "success" -> JsBoolean(true),
    "data" -> data
  ))

}
