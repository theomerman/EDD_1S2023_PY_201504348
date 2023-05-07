export { DoublyLinkedList };
class Node {
    constructor(index, emisor, receptor, mensaje) {
        this.index = index;
        this.timeStamp = new Date();
        this.emisor = emisor;
        this.receptor = receptor;
        this.mensaje = mensaje;
        this.previuosHash = this.getPreviusHash();
        this.hash = this.generateHash();
        this.next = null;
        this.prev = null;
    }

    generateHash(index, timeStamp, emisor, receptor, mensaje) {

        const hash = CryptoJS.SHA256(index + timeStamp + emisor + receptor + mensaje).toString(CryptoJS.enc.Hex);

        return hash;
    }
    getPreviusHash() {
        return this.prev ? this.prev.hash : "0000";
    }

}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.currentIndex = 0;
    }


    addToEnd(emisor, receptor, mensaje) {
        const newNode = new Node(this.currentIndex, emisor, receptor, mensaje);

        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.currentIndex++;
    }

    // traverseForward() {
    //     let current = this.head;

    //     while (current) {
    //       console.log(`Index: ${current.index}, Data: ${current.data}`);
    //       current = current.next;
    //     }
    //   }

}

