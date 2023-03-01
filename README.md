# Documentación Técnica

Este paquete contiene varias funciones que se utilizan para agregar y eliminar elementos de una lista doblemente enlazada de estudiantes y una cola de estudiantes. También hay funciones para leer un archivo CSV y cargar datos de ese archivo en la cola.

## Funciones

### `NewNode(student *nodes.Student) *nodes.Node`

La función `NewNode` crea un nuevo nodo para una lista doblemente enlazada con un estudiante dado y devuelve un puntero al nodo creado.

### `AddStart(node *nodes.Node, student *nodes.Student) *nodes.Node`

La función `AddStart` agrega un nuevo nodo con un estudiante al principio de una lista doblemente enlazada y devuelve un puntero al nodo recién creado.

### `AddEnd(node *nodes.Node, student *nodes.Student) *nodes.Node`

La función `AddEnd` agrega un nuevo nodo con un estudiante al final de una lista doblemente enlazada y devuelve un puntero al primer nodo de la lista.

### `RemoveStart(node *nodes.Node) *nodes.Node`

La función `RemoveStart` elimina el primer nodo de una lista doblemente enlazada y devuelve un puntero al nuevo primer nodo.

### `RemoveEnd(node *nodes.Node) *nodes.Node`

La función `RemoveEnd` elimina el último nodo de una lista doblemente enlazada y devuelve un puntero al primer nodo de la lista.

### `ReadLine() string`

La función `ReadLine` lee una línea de entrada estándar y devuelve la línea como una cadena.

### `LookPending(userQueue *nodes.Node)`

La función `LookPending` imprime todos los estudiantes en la cola de estudiantes.

### `LookSystem(userList *nodes.Node)`

La función `LookSystem` imprime todos los estudiantes en la lista doblemente enlazada de estudiantes y genera un gráfico de la lista utilizando Graphviz.

### `AddToList(userList *nodes.Node, student *nodes.Student) *nodes.Node`

La función `AddToList` agrega un nuevo estudiante a una lista doblemente enlazada de estudiantes y devuelve un puntero al nuevo primer nodo de la lista.

### `AddToQueue(userQueue *nodes.Node) *nodes.Node`

La función `AddToQueue` agrega un nuevo estudiante a la cola de estudiantes y devuelve un puntero al nuevo primer nodo de la cola.

### `MasiveLoad(userQueue *nodes.Node) *nodes.Node`

La función `MasiveLoad` carga datos de un archivo CSV en una cola de estudiantes y devuelve un puntero al primer nodo de la cola.

### `ReadCsvFile(filePath string) [][]string`

La función `ReadCsvFile` lee un archivo CSV en una matriz de cadenas y devuelve la matriz sin la primera fila (que se espera que contenga encabezados de columna).