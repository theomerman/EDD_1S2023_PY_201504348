import AVLTree from '../Arboles/AVLTree.js'
import Estudiante from '../Arboles/Nodo/Estudiante.js'
import { hiddeAll } from '../Login.js';
import { HashTable } from '../HashTable/HashTable.js';
const mostrarAlumnos = document.getElementById('button1');
const arbolEstudiantes = document.getElementById('button2');
const cargaMasiva = document.getElementById('load-json-btn');
const logOut = document.getElementById('log-out');

const preOrder = document.getElementById('pre-order');
const inOrder = document.getElementById('in-order');
const postOrder = document.getElementById('post-order');
const hashButton = document.getElementById('hash-table');


let hashTable = new HashTable(7);
let arbolAVL = new AVLTree();
export { arbolAVL };

const table = document.getElementById('table');



mostrarAlumnos.addEventListener('click', () => {
    table.hidden = true;
    document.getElementById('ordenamientos').hidden = false;
    document.getElementById('reporte-avl').hidden = true;

});

arbolEstudiantes.addEventListener('click', () => {
    table.hidden = true;
    document.getElementById('ordenamientos').hidden = true;
    document.getElementById('reporte-avl').hidden = false;
    let graph = `digraph G{\nrankdir=UD\nnode[shape=box]\nconcentrate=true
        ${arbolAVL.root.getCodigoInterno()}}
        `


    document.getElementById('reporte-avl').src = encodeURI("https://quickchart.io/graphviz?graph=" + graph);
    // 
});


cargaMasiva.addEventListener('click', () => {
    // Get the selected file from the file input element
    const fileInput = document.getElementById('json-file-input');
    const file = fileInput.files[0];

    if (!file) {
        alert('No se ha seleccionado un archivo.')
        return;
    }

    // Use FileReader to read the JSON data from the selected file
    const reader = new FileReader();
    reader.onload = () => {
        const jsonData = JSON.parse(reader.result);

        // console.log(jsonData);

        jsonData.alumnos.forEach(alumno => {

            if (!arbolAVL.search(alumno.carnet)) {

                arbolAVL.insert(alumno.carnet, new Estudiante(alumno.nombre, alumno.carnet, alumno.password, alumno.Carpeta_Raiz));
                hashTable.set(alumno.carnet, alumno);
                
            }


        });
        alert('Se cargaron los alumnos exitosamente')
        // console.log(hashTable);
        let graph = `digraph G{\nrankdir=UD\nnode[shape=box]\nconcentrate=true
            ${arbolAVL.root.getCodigoInterno()}}
            `
        // console.log(arbolAVL.size());
        // arbolAVL.tmp = "";
        // arbolAVL.inOrderTraversal(arbolAVL.root);
        // console.log(graph);

    };
    reader.onerror = () => {
        console.error('Error loading JSON file.');
    };
    reader.readAsText(file);
});


preOrder.addEventListener('click', () => {
    arbolAVL.tmp = "";
    arbolAVL.preOrderTraversal(arbolAVL.root);
    table.hidden = false;
    document.getElementById('ordenamientos').hidden = false;
    document.getElementById('reporte-avl').hidden = true;
    table.innerHTML = `
    <thead>
        <tr>
        <th>Carné</th>
        <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
    ${arbolAVL.tmp}
  </tbody>
`;
});

inOrder.addEventListener('click', () => {
    arbolAVL.tmp = "";
    arbolAVL.inOrderTraversal(arbolAVL.root);
    table.hidden = false;
    document.getElementById('reporte-avl').hidden = true;
    table.innerHTML = `
    <thead>
        <tr>
        <th>Carné</th>
        <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
    ${arbolAVL.tmp}
  </tbody>
`;
});

postOrder.addEventListener('click', () => {
    arbolAVL.tmp = "";
    arbolAVL.postOrderTraversal(arbolAVL.root);
    table.hidden = false;
    document.getElementById('reporte-avl').hidden = true;
    table.innerHTML = `
    <thead>
        <tr>
        <th>Carné</th>
        <th>Nombre</th>
        </tr>
    </thead>
    <tbody>
    ${arbolAVL.tmp}
  </tbody>
`;
});


hashButton.addEventListener('click', () => {
    let tmp = "";
    console.log(hashTable);
    // console.log(hashTable.table[0][0]);


    hashTable.table[0].forEach((element2) => {
        if (element2) {
            // console.log(element2[1]);
            tmp += `<tr><td>${element2[1].carnet}</td><td>${element2[1].nombre}</td> <td> ${element2[1].password}</td> </tr>`   
        }
    });


    table.hidden = false;
    document.getElementById('reporte-avl').hidden = true;
    table.innerHTML = `
    <thead>
        <tr>
        <th>Carné</th>
        <th>Nombre</th>
        <th>Contraseña</th>
        </tr>
    </thead>
    <tbody>
    ${tmp}
  </tbody>
`;
});



logOut.addEventListener('click', () => {
    hiddeAll();
    document.getElementById('login-div').hidden = false;

});

