class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.archivoCodificado = null;
    }
}

export default class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // Agrega un nodo al inicio de la lista
    insert(value) {
        const newNode = new Node(value);

        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
        } else {
            newNode.next = this.head;
            this.head = newNode;
            this.tail.next = this.head;
        }

        this.length++;
    }
    // Devuelve un array con los valores de la lista
    
    graph() {
        let tmp = 0;
        let tmp2 = 0;
        let graph = `
digraph G{
rankdir=LR
node[shape=box]
concentrate=true
splines=ortho\n`;

        let current = this.head;

        while (current !== null) {
            graph += `nodo${tmp} [ label = " Accion: ${current.value}"];\n`;
            tmp2 = tmp;
            tmp++;
            // graph += `nodo0 [ label = "/"];`;
            current = current.next;

            if (current === this.head) {
                graph += `nodo${tmp2} -> nodo0;\n}`;
                console.log(graph);
                return graph;
            }else{
                graph += `nodo${tmp2} -> nodo${tmp};\n`;
            }
        }
        graph += '}'
        return graph;
    }
}

// const list = new CircularLinkedList();



// list.graph('acción');
// console.log(list.toArray()); 
