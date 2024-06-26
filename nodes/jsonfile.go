package nodes

import (
	"encoding/json"
	"fmt"
	"os"
)

type Alumno struct {
	Name     string `json:"nombre"`
	ID       int    `json:"carnet"`
	Password string `json:"password"`
	Folder   string `json:"Carpeta_Raiz"`
}

func GenerateJSON(node *Node) {
	if node == nil {
		return
	}
	alumnos := []Alumno{}

	if node.Next == nil {

		alumnos = append(alumnos, Alumno{
			Name:     node.User.Name,
			ID:       node.User.Id,
			Password: node.User.Pass,
			Folder:   "/",
		})
	} else {
		flag := true
		tmp := node
		for flag {
			alumnos = append(alumnos, Alumno{
				Name:     tmp.User.Name,
				ID:       tmp.User.Id,
				Password: tmp.User.Pass,
				Folder:   "/",
			})
			tmp = tmp.Next
			if tmp == nil {
				flag = false
			}
		}
	}

	data := map[string][]Alumno{
		"alumnos": alumnos,
	}

	jsonData, err := json.MarshalIndent(data, "", "    ")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println(string(jsonData))

	crearArchivoJSON("ListaUsuarios.json")
	escribirArchivoJSON(string(jsonData), "ListaUsuarios.json")
}

func crearArchivoJSON(nombre_archivo string) {
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

func escribirArchivoJSON(contenido string, nombre_archivo string) {
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
