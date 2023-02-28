package fun

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"nodes"
	"os"
	"strconv"
)

func NewNode(student *nodes.Student) *nodes.Node {

	tmp := new(nodes.Node)
	tmp.User = student
	return tmp
}

func AddStart(node *nodes.Node, student *nodes.Student) *nodes.Node {

	tmp := NewNode(student)

	tmp.Next = node
	node.Before = tmp

	return tmp
}

func AddEnd(node *nodes.Node, student *nodes.Student) *nodes.Node {
	tmp := NewNode(student)
	tmp2 := node
	flag := true

	for flag {
		tmp2 = tmp2.Next
		if tmp2.Next == nil {
			flag = false
		}
	}

	tmp2.Next = tmp
	tmp.Before = tmp2
	return node
}

func RemoveStart(node *nodes.Node) *nodes.Node {
	node = node.Next
	node.Before = nil

	return node
}

func RemoveEnd(node *nodes.Node) *nodes.Node {
	tmp := node
	flag := true
	for flag {
		tmp = tmp.Next
		if tmp.Next.Next == nil {
			flag = false

		}
	}
	tmp.Next.Before = nil
	tmp.Next = nil
	return node

}

func ReadLine() string {

	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	return scanner.Text()
}

func LookPending(userQueue *nodes.Node) {
	if userQueue == nil {
		fmt.Println("La cola de alumnos está vacía")
		return
	}
	PrintAll(userQueue)
}

func LookSystem(userList *nodes.Node) {
	if userList == nil {
		fmt.Println("La lista de estudiantes está vacía")
		return
	}
	PrintAll(userList)
}

func AddToQueue(userQueue *nodes.Node) *nodes.Node {
	fmt.Print("Ingrese el Nombre: ")
	name := ReadLine()
	fmt.Print("Ingrese el Apellido: ")
	name = name + ReadLine()
	fmt.Print("Ingrese Carné: ")
	id, err := strconv.ParseInt(ReadLine(), 0, 64)
	if !(err == nil) {
		fmt.Println("El formato del carné no es valido, por favor introduzca solo numeros")
		return userQueue
	}
	fmt.Print("Ingrese un Password: ")
	pass := ReadLine()

	if userQueue == nil {

		return NewNode(nodes.NewStudent(int(id), name, pass))
	} else {
		return AddStart(userQueue, nodes.NewStudent(int(id), name, pass))
	}
}

func MasiveLoad(userQueue *nodes.Node) *nodes.Node {
	csv := ReadCsvFile("prueba.csv")

	for _, line := range csv {
		id, err := strconv.ParseInt(line[0], 0, 64)
		if !(err == nil) {
			fmt.Println("El formato del carné no es valido, por favor introduzca solo numeros")
			return userQueue
		}
		emp := nodes.Student{
			Id:   int(id),
			Name: line[1],
			Pass: line[2],
		}
		fmt.Println(emp.Id, " "+emp.Name+" "+emp.Pass)
		if userQueue == nil {

			userQueue = NewNode(nodes.NewStudent(int(id), line[1], line[2]))
		} else {
			userQueue = AddStart(userQueue, nodes.NewStudent(int(id), line[1], line[2]))
		}
	}
	return userQueue
}

func ReadCsvFile(filePath string) [][]string {
	f, err := os.Open(filePath)
	if err != nil {
		fmt.Println("Unable to read input file "+filePath, err)
	}
	defer f.Close()

	csvReader := csv.NewReader(f)
	records, err := csvReader.ReadAll()
	if err != nil {
		fmt.Println("Unable to parse file as CSV for "+filePath, err)
	}

	return records[1:]
}

func PrintAll(list *nodes.Node) {
	flag := true
	tmp := list
	for flag {
		fmt.Print("->", tmp.User)
		tmp = tmp.Next
		if tmp == nil {
			flag = false
		}
	}
	fmt.Println()

}
