package providers

import java.nio.file.{FileSystems, Files}
import java.security.KeyStore
import javax.net.ssl._

import play.core.ApplicationProvider
import play.server.api._

class CustomSSLEngineProvider(appProvider: ApplicationProvider) extends SSLEngineProvider {

  private val priorityCipherSuites = List(
    "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
    "TLS_DHE_RSA_WITH_AES_256_GCM_SHA384",
    "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
  )

  override def createSSLEngine(): SSLEngine = {
    val ctx = createSSLContext()
    val sslEngine = ctx.createSSLEngine
    val cipherSuites = sslEngine.getEnabledCipherSuites.toList
    val orderedCipherSuites =
      priorityCipherSuites.filter(cipherSuites.contains) ::: cipherSuites.filterNot(priorityCipherSuites.contains)
    sslEngine.setEnabledCipherSuites(orderedCipherSuites.toArray)
    val params = sslEngine.getSSLParameters
    params.setUseCipherSuitesOrder(true)
    sslEngine.setSSLParameters(params)
    sslEngine
  }

  private def readPassword(): Array[Char] = System.getProperty("play.server.https.keyStore.password").toCharArray

  private def readKeyInputStream(): java.io.InputStream = {
    val keyPath = FileSystems.getDefault.getPath(System.getProperty("play.server.https.keyStore.path"))
    Files.newInputStream(keyPath)
  }

  private def readKeyManagers(): Array[KeyManager] = {
    val password = readPassword()
    val keyInputStream = readKeyInputStream()
    val keyStore = KeyStore.getInstance(KeyStore.getDefaultType)
    keyStore.load(keyInputStream, password)
    val kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm)
    kmf.init(keyStore, password)

    val res = kmf.getKeyManagers
    keyInputStream.close()
    res
  }

  private def createSSLContext(): SSLContext = {
    val keyManagers = readKeyManagers()
    val sslContext = SSLContext.getInstance("TLS")
    sslContext.init(keyManagers, Array.empty, null)
    sslContext
  }

}
