class Node {
    constructor(value, estudiante, contadorGraphviz) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1;
        this.estudiante = estudiante;
        this.contadorGraphviz = contadorGraphviz;
    }
    getCodigoInterno() {
        let etiqueta;
        etiqueta = `nodo${this.contadorGraphviz} [ label = " ${this.value} \n ${this.estudiante.nombre} \n Altura: ${this.height - 1} "];\n`;
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

export default class AVLTree {
    constructor() {
        this.root = null;
        this.tmp = "";
        this.graph = "";
        this.contadorGraphviz = 0;
    }

    // obtener la altura del nodo
    height(node) {
        if (node == null) {
            return 0;
        }
        return node.height;
    }

    // obtener el factor de balance del nodo
    balanceFactor(node) {
        if (node == null) {
            return 0;
        }
        return this.height(node.left) - this.height(node.right);
    }

    // rotar derecha
    rotateRight(node) {
        let left = node.left;
        let rightOfLeft = left.right;
        left.right = node;
        node.left = rightOfLeft;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        left.height = 1 + Math.max(this.height(left.left), this.height(left.right));
        return left;
    }

    // rotar izquierda
    rotateLeft(node) {
        let right = node.right;
        let leftOfRight = right.left;
        right.left = node;
        node.right = leftOfRight;
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        right.height = 1 + Math.max(this.height(right.left), this.height(right.right));
        return right;
    }

    // instartar un nodo
    insert(value, estudiante) {
        this.root = this.insertNode(this.root, value, estudiante);
    }

    insertNode(node, value, estudiante) {
        if (node == null) {
            this.contadorGraphviz += 1;
            return new Node(value, estudiante, this.contadorGraphviz);
        }
        if (value < node.value) {
            node.left = this.insertNode(node.left, value, estudiante);
        } else {
            node.right = this.insertNode(node.right, value, estudiante);
        }
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balanceFactor = this.balanceFactor(node);
        if (balanceFactor > 1) {
            if (value < node.left.value) {
                return this.rotateRight(node);
            } else if (value > node.left.value) {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        } else if (balanceFactor < -1) {
            if (value > node.right.value) {
                return this.rotateLeft(node);
            } else if (value < node.right.value) {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }
        return node;
    }

    // obtener el nodo con el valor mínimo
    minNode(node) {
        let current = node;
        while (current.left != null) {
            current = current.left;
        }
        return current;
    }

    // Borrar nodo
    delete(value) {
        this.root = this.deleteNode(this.root, value);
    }

    deleteNode(node, value) {
        if (node == null) {
            return null;
        }
        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            if (node.left == null || node.right == null) {
                let temp = null;
                if (node.left != null) {
                    temp = node.left;
                } else {
                    temp = node.right;
                }
                if (temp == null) {
                    temp = node;
                }
                node = temp;
            } else {
                let temp = this.minNode(node.right);
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }
        if (node == null) {
            return node;
        }
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
        let balanceFactor = this.balanceFactor(node);
        if (balanceFactor > 1) {
            if (this.balanceFactor(node.left) >= 0) {
                return this.rotateRight(node);
            } else {
                node.left = this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        } else if (balanceFactor < -1) {
            if (this.balanceFactor(node.right) <= 0) {
                return this.rotateLeft(node);
            } else {
                node.right = this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }
        return node;
    }


    search(value) {
        let current = this.root;
        while (current !== null) {
            if (value === current.value) {
                return current;
            } else if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return null;
    }

    
    inOrderTraversal(node) {
        if (node != null) {
            this.inOrderTraversal(node.left);
            // console.log(node.value);
            // console.log(node.estudiante);
            this.tmp += `
            <tr>
                <td>${node.estudiante.carne}</td>
                <td>${node.estudiante.nombre}</td>
            </tr>
            `;

            this.inOrderTraversal(node.right);
        }
    }

    

    preOrderTraversal(node) {
        if (node != null) {
            // console.log(node.value);
            this.tmp += `
            <tr>
                <td>${node.estudiante.carne}</td>
                <td>${node.estudiante.nombre}</td>
            </tr>
            `;
            this.preOrderTraversal(node.left);
            this.preOrderTraversal(node.right);
        }
    }

    
    postOrderTraversal(node) {
        if (node != null) {
            this.postOrderTraversal(node.left);
            this.postOrderTraversal(node.right);
            // console.log(node.value);
            this.tmp += `
            <tr>
                <td>${node.estudiante.carne}</td>
                <td>${node.estudiante.nombre}</td>
            </tr>
            `;
        }
    }
    size(node = this.root) {
        if (node === null) {
            return 0;
        } else {
            return 1 + this.size(node.left) + this.size(node.right);
        }
    }
}


// let avlTree = new AVLTree();
// avlTree.insert(10);
// avlTree.insert(20);
// avlTree.insert(30);
// avlTree.insert(40);
// avlTree.insert(50);
// avlTree.insert(25);
// avlTree.delete(30);
// console.log()
// console.log('In-order traversal:');
// avlTree.inOrderTraversal(avlTree.root);
// console.log('Pre-order traversal:');
// avlTree.preOrderTraversal(avlTree.root);
// console.log('Post-order traversal:');
// avlTree.postOrderTraversal(avlTree.root);

