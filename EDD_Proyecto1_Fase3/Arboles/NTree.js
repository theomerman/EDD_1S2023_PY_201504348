import { NodeMatrix } from "../SparseMatrix/SparseMatrix.js";
import { SparseMatrix } from "../SparseMatrix/SparseMatrix.js";

export {Node};

class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
        this.sparseMatrix = new SparseMatrix(value);
    }

    addChild(node) {
        this.children.push(node);
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