package data


class LeakyList[T](private val maxSize: Int) {

  private var data: List[T] = _

  def add(item: T): List[T] = {
    if (data.length < maxSize) {
      data = data :+ item
    } else {
      data = data.tail :+ item
    }
    data
  }

  def addAll(items: T*): List[T] = {
    items.foreach(add)
    data
  }

  def underLying(): List[T] = data

}

object LeakyList {
  def apply[T](maxSize: Int): LeakyList[T] = new LeakyList[T](maxSize)

  def apply[T](maxSize: Int, items: T*): LeakyList[T] = {
    val list = new LeakyList[T](maxSize)
    list.addAll(items: _*)
    list
  }
}
