package services

object Constants {
  val ServerConfig: (String, String) = ("/_server.config.json", "/_server.config.example.json")

  val AppConfig: (String, String) = ("/app.config.json", "/app.config.example.json")
  val ProfileConfig: (String, String) = ("/profile.config.json", "/profile.config.example.json")
  val WorkHistoryConfig: (String, String) = ("/work-history.config.json", "/work-history.config.example.json")
  val FeaturedProjectsConfig: (String, String) = ("featured-projects.config.json", "/featured-projects.config.example.json")
  val LangsFramesConfig: (String, String) = ("/langs-frames.config.json", "/langs-frames.config.example.json")
  val ArticlesConfig: (String, String) = ("/articles.config.json", "/articles.config.example.json")

  val CreditsConfig: (String, String) = ("/credits.config.json", "/credits.config.example.json")

  val JsonContentType = "application/json"
}
