class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  class CircularList {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    // Agrega un nuevo nodo al final de la lista circular
    add(value) {
      const newNode = new Node(value);
      if (this.head === null) {
        this.head = newNode;
      } else {
        this.tail.next = newNode;
      }
      newNode.next = this.head;
      this.tail = newNode;
    }
  
    // Elimina un nodo de la lista circular
    remove(value) {
      if (this.head === null) {
        return;
      }
      let currentNode = this.head;
      let previousNode = null;
      while (currentNode.value !== value) {
        if (currentNode.next === this.head) {
          return;
        }
        previousNode = currentNode;
        currentNode = currentNode.next;
      }
      if (previousNode !== null) {
        previousNode.next = currentNode.next;
      } else {
        while (currentNode.next !== this.head) {
          currentNode = currentNode.next;
        }
        currentNode.next = this.head.next;
        this.head = this.head.next;
      }
    }
  
    
    print() {
      if (this.head === null) {
        return;
      }
      let currentNode = this.head;
      console.log(currentNode.value);
      while (currentNode.next !== this.head) {
        currentNode = currentNode.next;
        console.log(currentNode.value);
      }
    }
  }