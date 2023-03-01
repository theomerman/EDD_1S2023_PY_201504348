package nodes

import "time"

type Bitacora struct {
	Name string
	Date string
	Hour string
}

func (bitacora Bitacora) SetTime(name string) {
	bitacora.Name = name
	bitacora.Date = string(time.Now().Day()) + string(time.Now().Month()) + string(time.Now().Year())
	bitacora.Hour = string(time.Now().Hour()) + string(time.Now().Minute())
}
