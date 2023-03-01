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
	userQueue = nil
	userList = nil
	// userList = fun.NewNode(nodes.NewStudent(0, "", ""))

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
			MenuAdmin(&userList, &userQueue)
		}

	}
}

func MenuAdmin(userList **nodes.Node, userQueue **nodes.Node) {
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

			fun.LookPending(*userQueue)
			acceptStudentMenu(&*userQueue, &*userList)
		case "2":
			fun.LookSystem(*userList)

		case "3":

			*userQueue = fun.AddToQueue(*userQueue)
		case "4":
			// fmt.Println(fun.ReadCsvFile("prueba.csv"))

			*userQueue = fun.MasiveLoad(*userQueue)
		case "5":
			flag2 = false
		}
	}
}

func acceptStudentMenu(userQueue **nodes.Node, userList **nodes.Node) {
	flag := true
	option := ""

	for flag {
		counter, student := fun.ListSize(*userQueue)
		if student == nil {
			fmt.Println("\n----------***No hay usuarios Pendientes***----------\n")
			return
		}
		// fmt.Println(userList)
		fun.GraphQueue(*userQueue, "Estudiantes en Cola")
		fmt.Println("*********** Estudiantes Pendientes **************")
		fmt.Println("*                                               *")
		fmt.Println("*              * Pendientes:", counter, "*               *")
		fmt.Println("*                                               *")
		fmt.Println("*  Estudiante Actual: ", student.User.Name)
		fmt.Println("*                                               *")
		fmt.Println("*      1. Aceptar al Estudiante                 *")
		fmt.Println("*      2. Rechazar al Estudiante                *")
		fmt.Println("*      3. Volver al Menú                        *")
		fmt.Println("*                                               *")
		fmt.Println("*************************************************")

		fmt.Print("Elige una opcion: ")

		option = fun.ReadLine()

		switch option {
		case "1":

			*userList = fun.AddToList(*userList, student.User)

			fun.RemoveEnd(*userQueue)

		case "2":
			*userQueue = fun.RemoveEnd(*userQueue)
		case "3":
			flag = false
		}

	}

}
