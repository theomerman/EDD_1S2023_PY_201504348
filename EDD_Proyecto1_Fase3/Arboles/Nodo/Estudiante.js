import Tree from "../NTree.js";
import CircularLinkedList from "../../LinkedList/CircularLinkedList.js";

export default class Estudiante {
    constructor(nombre, carne, password, carpetaRaiz) {
        this.nombre = nombre;
        this.carne = carne;
        this.password = password;
        this.encriptedPassword = this.encryptPassword(password);
        this.carpetaRaiz = carpetaRaiz;
        this.nTree = new Tree('/');
        this.bitacora = new CircularLinkedList();
        this.archivos = new CircularLinkedList();
        this.mensajes = new Map();
        

    }

    
    encryptPassword(password) {
        // Generate the hashed password using SHA-256
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  
        return hashedPassword;
      }
  
      // Example usage:


}