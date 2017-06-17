import scala.language.postfixOps

name := """personal-site"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.11"

libraryDependencies += jdbc
libraryDependencies += cache
libraryDependencies += ws
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "2.0.0" % Test

resourceDirectories in Compile += baseDirectory.value / "resources"

PlayKeys.playRunHooks <+= baseDirectory.map(BuildUI.apply)

val Success = 0 // 0 exit code
val Error = 1 // 1 exit code

def runAfterNpmInstall(task: => Int)(implicit dir: File): Int = {
  if (BuildUI.nodeModulesExists(dir)) {
    task
  }
  else {
    val processed: Int = Process(BuildUI.NpmInstal, dir).run().exitValue()
    if (processed == Success) task else Error
  }
}

def runProdBuild(implicit dir: File): Int = runAfterNpmInstall(Process(BuildUI.BuildProd, dir) !)
def runUICleanTask(dir: File): Int = Process(BuildUI.Clean, dir) !

lazy val prodBuild = TaskKey[Unit]("Running production build")
lazy val cleanUpUI = TaskKey[Unit]("Running clean task")

prodBuild := {
  val frontRoot = baseDirectory.value / BuildUI.FrontEndFolder
  if (runProdBuild(frontRoot) != Success)
    throw new Exception("There were errors in ui build")
}

cleanUpUI := {
  val frontRoot = baseDirectory.value / BuildUI.FrontEndFolder
  println(frontRoot.getPath)
  runUICleanTask(frontRoot)
}

dist <<= dist dependsOn prodBuild

stage <<= stage dependsOn prodBuild

clean <<= clean dependsOn cleanUpUI
