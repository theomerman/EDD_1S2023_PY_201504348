package nodes

import (
	"strconv"
	"time"
)

type Bitacora struct {
	Name     string
	Id       string
	Date     string
	Hour     string
	Accepted bool
}

func NewBitacora(name string) *Bitacora {
	bitacora := new(Bitacora)
	bitacora.Name = name
	bitacora.Date = time.Now().Month().String() + "-" + strconv.Itoa(time.Now().Day()) + "-" + strconv.Itoa(time.Now().Year())
	bitacora.Hour = strconv.Itoa(time.Now().Hour()) + ":" + strconv.Itoa(time.Now().Minute())
	return bitacora
}

func NewBitacoraAdmin(name string, id int, accepted bool) *Bitacora {
	bitacora := new(Bitacora)
	bitacora.Name = name
	bitacora.Id = strconv.Itoa(id)
	bitacora.Date = time.Now().Month().String() + "-" + strconv.Itoa(time.Now().Day()) + "-" + strconv.Itoa(time.Now().Year())
	bitacora.Hour = strconv.Itoa(time.Now().Hour()) + ":" + strconv.Itoa(time.Now().Minute())
	bitacora.Accepted = accepted
	return bitacora
}
