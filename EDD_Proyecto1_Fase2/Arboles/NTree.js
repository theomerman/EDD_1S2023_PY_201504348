export {Node};

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }

    getCodigoInterno(){
        let etiqueta;
        etiqueta =`nodo${this.contadorGraphviz} [ label = " ${this.value} \n ${this.estudiante.nombre} \n Altura: ${this.height} "];\n`;
        if (this.left != null) {
        etiqueta = etiqueta + this.left.getCodigoInterno()
                + "nodo" + this.contadorGraphviz + "->nodo" + this.left.contadorGraphviz + "\n";
    }
        if (this.right != null) {
            etiqueta = etiqueta + this.right.getCodigoInterno()
                    + "nodo" + this.contadorGraphviz + "->nodo" + this.right.contadorGraphviz + "\n";
        }
        return etiqueta;
        }

}

export default class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue);
    }

    traverseDF(callback) {
        (function recurse(currentNode) {
            for (let i = 0, length = currentNode.children.length; i < length; i++) {
                recurse(currentNode.children[i]);
            }
            callback(currentNode);
        })(this.root);
    }

    traverseBF(callback) {
        let queue = [this.root];
        let currentNode = queue.shift();
        while (currentNode) {
            for (let i = 0, length = currentNode.children.length; i < length; i++) {
                queue.push(currentNode.children[i]);
            }
            callback(currentNode);
            currentNode = queue.shift();
        }
    }



}

// const tree = new Tree(1);
// const node2 = new Node(2);
// const node3 = new Node(3);
// const node4 = new Node(4);
// const node5 = new Node(5);
// tree.root.addChild(node2);
// tree.root.addChild(node3);
// node2.addChild(node4);
// node2.addChild(node5);
// tree.traverseDF(node => console.log(node.value));
// tree.traverseBF(node => console.log(node.value));