package structures

class LeakyStack[T](private val maxLength: Int = 10) extends scala.collection.mutable.Stack[T] {
  private var elems: List[T] = List()

  override def push(elem: T): LeakyStack.this.type = {
    elems = if (elems.length >= maxLength) elem :: elems.tail else elem :: elems
    this
  }
}
