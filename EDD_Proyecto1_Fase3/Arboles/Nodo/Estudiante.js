import Tree from "../NTree.js";
import CircularLinkedList from "../../LinkedList/CircularLinkedList.js";

export default class Estudiante {
    constructor(nombre, carne, password, carpetaRaiz) {
        this.nombre = nombre;
        this.carne = carne;
        this.password = password;
        this.encriptedPassword = this.encriptarPassword(password);
        this.carpetaRaiz = carpetaRaiz;
        this.nTree = new Tree('/');
        this.bitacora = new CircularLinkedList();
        this.archivos = new CircularLinkedList();
    }
    encriptarPassword(password) {
        let encriptedPassword = '';
        for (let i = 0; i < password.length; i++) {
            encriptedPassword += String.fromCharCode(password.charCodeAt(i) + 3);
        }
        return encriptedPassword;
    }
}