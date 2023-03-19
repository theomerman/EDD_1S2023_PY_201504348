package menu

import (
	"fmt"
	"fun"
	"nodes"
	// "fun"
	// "nodes"
)

func Menu() {
	userList, userQueue, adminLog := new(nodes.Node), new(nodes.Node), new(nodes.Node)
	userQueue = nil
	userList = nil
	adminLog = nil
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
		fmt.Print("Elige una opcion: ")
		option = fun.ReadLine()

		if option == "2" {
			flag = false
			break
		} else if option == "1" {
			fmt.Print("Introduce tu usuario: ")
			user := fun.ReadLine()
			fmt.Print("Introduce tu Contraseña: ")
			pass := fun.ReadLine()
			if user == "admin" && pass == "admin" {
				menuAdmin(&userList, &userQueue, &adminLog)
			} else {

				if userList == nil {
					fmt.Println("El usuario no existe en la base de datos o la contraseña es incorrecta")
				} else {
					tmp := fun.SearchUser(&userList, user, pass)

					if tmp != nil {
						fun.NewLogin(&tmp)
						menuUser(&tmp)

					} else {
						fmt.Println("El usuario no existe en la base de datos o la contraseña es incorrecta")
					}

					// tmp.User.Log.SetTime(tmp.User.Name)
				}
			}
		}

	}
}
func menuUser(user **nodes.Node) {
	flag := true

	for flag {
		fmt.Println("***************** EDD GoDrive *******************")
		fmt.Println("*              1. Generar Log                   *")
		fmt.Println("*              2. Cerrar Sesión                 *")
		fmt.Println("*************************************************")
		fmt.Print("Elige una opcion: ")
		option := fun.ReadLine()

		switch option {
		case "1":
			fun.GraphUserLog(*user, "Log de Usuarios")
			fun.OpenImage("Log de Usuarios")
		case "2":
			flag = false
		}
	}

}
func menuAdmin(userList **nodes.Node, userQueue **nodes.Node, adminLog **nodes.Node) {
	option := ""
	flag2 := true
	fmt.Println("Se inició sesión correctamente")
	for flag2 {

		fmt.Println("***************** EDD GoDrive *******************")
		fmt.Println("*      1. Ver Estudiantes Pendientes            *")
		fmt.Println("*      2. Ver Estudiantes del Sistema / JSON    *")
		fmt.Println("*      3. Registrar Nuevo Estudiante            *")
		fmt.Println("*      4. Carga Masiva de Estudiantes           *")
		fmt.Println("*      5. Cerrar Sesión                         *")
		fmt.Println("*************************************************")
		fmt.Print("Elige una opcion: ")

		option = fun.ReadLine()

		switch option {
		case "1":

			fun.LookPending(*userQueue)
			acceptStudentMenu(&*userQueue, &*userList, &*adminLog)

		case "2":
			fun.LookSystem(*userList)
			nodes.GenerateJSON(*userList)

		case "3":

			*userQueue = fun.AddToQueue(*userQueue)
		case "4":
			fmt.Print("Introduce el nombre del archivo: ")
			root := fun.ReadLine()

			*userQueue = fun.MasiveLoad(*userQueue, root)
		case "5":
			flag2 = false
		}
	}
}

func acceptStudentMenu(userQueue **nodes.Node, userList **nodes.Node, adminLog **nodes.Node) {
	flag := true
	option := ""

	for flag {
		counter, student := fun.ListSize(*userQueue)
		if student == nil {
			fmt.Println("\n----------***No hay usuarios Pendientes***----------\n")
			return
		}
		// fmt.Println(userList)

		fmt.Println("*********** Estudiantes Pendientes **************")
		fmt.Println("*                                               *")
		fmt.Println("*              * Pendientes:", counter, "*               *")
		fmt.Println("*                                               *")
		fmt.Println("*  Estudiante Actual: ", student.User.Name)
		fmt.Println("*                                               *")
		fmt.Println("*      1. Aceptar al Estudiante                 *")
		fmt.Println("*      2. Rechazar al Estudiante                *")
		fmt.Println("*      3. Graficar Pendientes                   *")
		fmt.Println("*      4. Bitacora Administrativa               *")
		fmt.Println("*      5. Volver al Menú                        *")
		fmt.Println("*                                               *")
		fmt.Println("*************************************************")

		fmt.Print("Elige una opcion: ")

		option = fun.ReadLine()

		switch option {
		case "1":

			*userList = fun.AddToList(*userList, student.User)

			// fmt.Println(*adminLog)
			// fun.NewAdminLoging(*adminLog, student.User, true)

			if *adminLog == nil {
				*adminLog = fun.NewAdminLog(nodes.NewBitacoraAdmin(student.User.Name, student.User.Id, true))

			} else {
				tmp := fun.NewAdminLog(nodes.NewBitacoraAdmin(student.User.Name, student.User.Id, true))
				// fmt.Println(tmp)
				tmp.Next = *adminLog
				*adminLog = tmp
			}

			fun.RemoveEnd(*userQueue)

		case "2":

			if *adminLog == nil {
				*adminLog = fun.NewAdminLog(nodes.NewBitacoraAdmin(student.User.Name, student.User.Id, false))

			} else {
				tmp := fun.NewAdminLog(nodes.NewBitacoraAdmin(student.User.Name, student.User.Id, false))
				fmt.Println(tmp)
				tmp.Next = *adminLog
				*adminLog = tmp
			}

			*userQueue = fun.RemoveEnd(*userQueue)
		case "3":
			fun.GraphQueue(*userQueue, "Estudiantes en Cola")
			fun.OpenImage("Estudiantes en Cola")
		case "4":
			fun.GraphAdminLog(*adminLog, "Admin Log")
			fun.OpenImage("Admin Log")
		case "5":
			flag = false
		}

	}

}
