package structures

class LeakyStack[T](private val maxLength: Int = 10) extends java.util.Stack[T] {

  override def push(elem: T): T = {
    if(elementData.length >= maxLength) {
      removeElementAt(0)
    }
    super.push(elem)
    elem
  }
}
