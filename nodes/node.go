package nodes

type Node struct {
	Next   *Node
	Before *Node
	User   *Student
	Log    *Node
	Queue  *Bitacora
}
