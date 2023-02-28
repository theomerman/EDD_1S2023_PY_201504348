package nodes

type Student struct {
	Id   int
	Name string
	Pass string
}

func NewStudent(id int, name, pass string) *Student {

	tmp := new(Student)
	tmp.Id = id
	tmp.Name = name
	tmp.Pass = pass
	return tmp
}
