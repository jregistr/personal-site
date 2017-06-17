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

def runDevBuild(implicit dir: File): Int = runAfterNpmInstall(Process(BuildUI.BuildDev) !)

def runProdBuild(implicit dir: File): Int = runAfterNpmInstall(Process(BuildUI.BuildProd) !)

lazy val devBuild = TaskKey[Unit]("Running development build")
lazy val prodBuild = TaskKey[Unit]("Running production build")

devBuild := {
  implicit val frontRoot = baseDirectory.value / BuildUI.FrontEndFolder
  if (runDevBuild != Success)
    println
  "There are errors in ui build"
}

prodBuild := {
  implicit val frontRoot = baseDirectory.value / BuildUI.FrontEndFolder
  if (runProdBuild != Success)
    throw new Exception("There were errors in ui build")
}

dist <<= dist dependsOn prodBuild

stage <<= stage dependsOn prodBuild