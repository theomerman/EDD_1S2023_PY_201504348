import Tree from "../NTree.js";
import CircularLinkedList from "../../LinkedList/CircularLinkedList.js";

export default class Estudiante {
    constructor(nombre, carne, password, carpetaRaiz) {
        this.nombre = nombre;
        this.carne = carne;
        this.password = password;
        this.carpetaRaiz = carpetaRaiz;
        this.nTree = new Tree('/');
        this.bitacora = new CircularLinkedList();
        this.archivos = new CircularLinkedList();
    }
}