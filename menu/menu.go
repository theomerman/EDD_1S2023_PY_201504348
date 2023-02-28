package menu

import (
	"fmt"
	"fun"
	"nodes"
	// "fun"
	// "nodes"
)

func Menu() {
	userList, userQueue := new(nodes.Node), new(nodes.Node)
	// userList := fun.NewNode(nodes.NewStudent(0, "", ""))
	// userQueue := fun.NewNode(nodes.NewStudent(0, "", ""))
	userList, userQueue = nil, nil

	flag := true
	option := ""
	// id := 0
	// user := ""
	// pass := ""

	for flag {

		fmt.Println("***************** EDD GoDrive *******************")
		fmt.Println("*              1. Iniciar Sesión                *")
		fmt.Println("*             2. Salir del Sistema              *")
		fmt.Println("*************************************************")
		fmt.Println("Elige una opcion: ")
		option = fun.ReadLine()

		if option == "2" {
			flag = false
			break
		} else if option == "1" {
			MenuAdmin(userList, userQueue)
		}

	}
}

func MenuAdmin(userList *nodes.Node, userQueue *nodes.Node) {
	option := ""
	flag2 := true
	fmt.Println("Se inició sesión correctamente")
	for flag2 {

		fmt.Println("***************** EDD GoDrive *******************")
		fmt.Println("*      1. Ver Estudiantes Pendientes            *")
		fmt.Println("*      2. Ver Estudiantes del Sistema           *")
		fmt.Println("*      3. Registrar Nuevo Estudiante            *")
		fmt.Println("*      4. Carga Masiva de Estudiantes           *")
		fmt.Println("*      5. Cerrar Sesión                         *")
		fmt.Println("*************************************************")
		fmt.Print("Elige una opcion: ")

		option = fun.ReadLine()

		switch option {
		case "1":
			fun.LookPending(userQueue)
		case "2":
			fun.LookSystem(userList)

		case "3":

			userQueue = fun.AddToQueue(userQueue)
		case "4":
			// fmt.Println(fun.ReadCsvFile("prueba.csv"))

			userQueue = fun.MasiveLoad(userQueue)
		case "5":
			flag2 = false
		}
	}
}
