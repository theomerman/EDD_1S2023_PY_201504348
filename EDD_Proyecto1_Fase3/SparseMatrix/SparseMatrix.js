class NodeMatrix{
    constructor(value, base64){
        
        this.value = value
        this.base64 = base64;

        this.up = null;
        this.down = null;
        this.previus = null;
        this.next = null;
    }
}
export {NodeMatrix}
export {SparseMatrix}
class SparseMatrix{
    constructor(head){
        this.head = new NodeMatrix(head);
    }
    insertHorizontal(node, head) {
        let newNode = node;
        if(head.next === null){
            head.next = newNode;
            newNode.previus = head;            
        }else{
            let tmp = head.next;
            let tmp2 = null;
            while(tmp != null){
                if(newNode.value < tmp.value){
                    tmp.previus.next = newNode;
                    newNode.previus = tmp.previus;
                    newNode.next = tmp;
                    tmp.previus = newNode;
                    return
                }
                tmp2 = tmp;
                tmp = tmp.next;
            }
            tmp2.next = newNode;
            newNode.previus = tmp2;
        }
    }

    insertVertical(node, head) {
        let newNode = node;
        if(head.down === null){
            head.down = newNode;
            newNode.up = head;            
        }else{
            let tmp = head.down;
            let tmp2 = null;
            while(tmp != null){
                if(newNode.value < tmp.value){
                    tmp.up.down = newNode;
                    newNode.up = tmp.up;
                    newNode.down = tmp;
                    tmp.up = newNode;
                    return
                }
                tmp2 = tmp;
                tmp = tmp.down;
            }
            tmp2.down = newNode;
            newNode.up = tmp2;
        }
    }
}

// let node = new SparseMatrix('documentos');

// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);
// node.insertVertical(new NodeMatrix('a','asdfasfdafsdafsdfds'),node.head);


// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);
// node.insertHorizontal(new NodeMatrix('a'), node.head);


