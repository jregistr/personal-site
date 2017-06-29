package data


class LeakyList[T](private val maxSize: Int) {

  private var data: List[T] = List()

  def add(item: T): LeakyList[T] = {
    if (data.length < maxSize) {
      data = data :+ item
    } else {
      data = data.tail :+ item
    }
    this
  }

  def addAll(items: T*): LeakyList[T] = {
    if (items != null)
      items.foreach(add)
    this
  }

  def underLying(): List[T] = data

}

object LeakyList {

  def apply[T](maxSize: Int, items: T*): LeakyList[T] = {
    val list = new LeakyList[T](maxSize)
    if (items != null)
      list.addAll(items: _*)
    list
  }
}
