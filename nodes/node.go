package nodes

type Node struct {
	Next   *Node
	Before *Node
	User   *Student
	Log    *Bitacora
}



// func (node *Node) newLogin(id, pass string) {
// 	flag := true
// 	tmp := node
// 	for flag {

// 		tmp = tmp.Next
// 		if tmp.Next == nil {
// 			if string(tmp.User.Id) == id
// 			flag = false
// 		}

// 	}
// }
