package fun

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"io/ioutil"
	"nodes"
	"os"
	"os/exec"
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
	GraphQueue(userList, "Lista de usuarios en el Sistema")
}

func AddToList(userList *nodes.Node, student *nodes.Student) *nodes.Node {

	if userList == nil {

		return NewNode(student)
	} else {
		return AddStart(userList, student)
	}
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

func ListSize(list *nodes.Node) (int, *nodes.Node) {
	flag := true
	tmp := list
	counter := 0
	if list == nil {
		return counter, nil
	}
	for flag {
		tmp = tmp.Next
		counter++
		if tmp == nil {
			flag = false
		}
	}
	flag = true
	tmp = list
	for flag {
		tmp = tmp.Next
		if tmp.Next == nil {
			flag = false
		}
	}
	return counter, tmp
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

func crearArchivoDot(nombre_archivo string) {
	//Verifica que el archivo existe
	var _, err = os.Stat(nombre_archivo)
	//Crea el archivo si no existe
	if os.IsNotExist(err) {
		var file, err = os.Create(nombre_archivo)
		if err != nil {
			return
		}
		defer file.Close()
	}
	fmt.Println("Archivo creado exitosamente", nombre_archivo)
}

func escribirArchivoDot(contenido string, nombre_archivo string) {
	// Abre archivo usando permisos READ & WRITE
	var file, err = os.OpenFile(nombre_archivo, os.O_RDWR, 0644)
	if err != nil {
		return
	}
	defer file.Close()
	// Escribe algo de texto linea por linea
	_, err = file.WriteString(contenido)
	if err != nil {
		return
	}
	// Salva los cambios
	err = file.Sync()
	if err != nil {
		return
	}
	fmt.Println("Archivo actualizado existosamente.")
}

func GraphQueue(node *nodes.Node, nombre_imagen string) {
	fmt.Println("Impresion")
	nombre_archivo_dot := "./lista.dot"
	// nombre_imagen := "lista.jpg"
	texto := "digraph lista{\n"
	texto += "rankdir=LR;\n"
	texto += "node[shape = record];\n"
	texto += "nodonull1[label=\"null\"];\n"
	texto += "nodonull2[label=\"null\"];\n"
	auxiliar := node
	contador := 0
	size, _ := ListSize(node)
	for i := 0; i < size; i++ {
		texto = texto + "nodo" + strconv.Itoa(i) + "[label=\"{|" + strconv.Itoa(auxiliar.User.Id) + "\\n" + auxiliar.User.Name + "|}\"];\n"
		auxiliar = auxiliar.Next
	}

	texto += "nodonull1->nodo0 [dir=back];\n"
	for i := 0; i < size-1; i++ {
		c := i + 1
		texto += "nodo" + strconv.Itoa(i) + "->nodo" + strconv.Itoa(c) + ";\n"
		texto += "nodo" + strconv.Itoa(c) + "->nodo" + strconv.Itoa(i) + ";\n"
		contador = c
	}
	texto += "nodo" + strconv.Itoa(contador) + "->nodonull2;\n"
	texto += "}"

	crearArchivoDot(nombre_archivo_dot)
	escribirArchivoDot(texto, nombre_archivo_dot)
	ejecutar(nombre_imagen, nombre_archivo_dot)

}

func ejecutar(nombre_imagen string, archivo_dot string) {
	path, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path, "-Tjpg", archivo_dot).Output()
	mode := 0777
	_ = ioutil.WriteFile(nombre_imagen, cmd, os.FileMode(mode))
}
