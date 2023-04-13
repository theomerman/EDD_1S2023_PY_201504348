import Tree from "../NTree.js";

export default class Estudiante{
    constructor(nombre, carne, password, carpetaRaiz){
        this.nombre = nombre;
        this.carne = carne;
        this.password = password;
        this.carpetaRaiz = carpetaRaiz;
        this.nTree = new Tree('/');
    }
}