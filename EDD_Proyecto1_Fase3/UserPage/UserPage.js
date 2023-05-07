import { hiddeAll } from "../Login.js";
import { currentUser } from "../Login.js";
import { Node } from "../Arboles/NTree.js";
import { nTreeNode } from "../Login.js";
import { SparseMatrix } from "../SparseMatrix/SparseMatrix.js";
import { NodeMatrix } from "../SparseMatrix/SparseMatrix.js";

var currentFolder;


document.getElementById('log-out2').addEventListener('click', () => {
    hiddeAll();
    document.getElementById('login-div').hidden = false;

});

document.getElementById('fname').addEventListener("keydown", function (event) {

    if (event.key === "Enter" || event.key === "Return") {
        // console.log(document.getElementById('fname').value)
        let ruta = document.getElementById('fname').value

        if (ruta === '/') {
            // tmp = ruta.substring(1);
            // rutaMatriz = ruta.substring(1).split('/');

            currentFolder = currentUser.estudiante.nTree.root;
        } else {
            let rutaSplit = ruta.substring(1);

            rutaSplit = rutaSplit.split('/');
            // console.log(rutaSplit);   
            goToRoot(rutaSplit);
        }

        // console.log(graphNtree(currentUser.estudiante.nTree.root));

        generateFolders();


    }

});

document.getElementById('boton-crear-carpeta').addEventListener('click', () => {

    let tmp = document.getElementById('fname').value;
    var newFolder = window.prompt('Introduce el nombre de la carpeta');
    addFolder(newFolder);
});

document.getElementById('boton-eliminar-carpeta').addEventListener('click', () => {

    var newFolder = window.prompt('Introduce el nombre de la carpeta que deseas eliminar');
    removeFolder(newFolder);
});

function addFolder(newFolder) {

    if (document.getElementById('fname').value === '/') {
        currentFolder = currentUser.estudiante.nTree.root;
    }

    let date = new Date();

    for (let i = 0; i < currentFolder.children.length; i++) {
        if (newFolder === currentFolder.children[i].value) {
            currentFolder.addChild(new Node(currentFolder.children[i].value + "(2)"));
            currentUser.estudiante.bitacora.insert(`Se creo carpeta \n\\"${currentFolder.children[i].value + "(2)"}\\"
Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);


            generateFolders();
            return alert(`La carpeta ya existe pero se agregó como ${currentFolder.children[i].value}(2)`);
        }
    }
    currentFolder.addChild(new Node(newFolder));


    currentUser.estudiante.bitacora.insert(`Se creo carpeta \n\\"${newFolder}\\"
Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);


    generateFolders();

    // currentUser.estudiante.nTree.traverseBF(node => console.log(node.value));
}

function removeFolder(removeFolder) {
    let date = new Date();
    for (let i = 0; i < currentFolder.children.length; i++) {
        if (removeFolder === currentFolder.children[i].value) {
            currentFolder.children.splice(i, 1);
            generateFolders();
            currentUser.estudiante.bitacora.insert(`Se eliminó \n\\"${removeFolder}\\"
Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);


            return alert(`La carpeta se eliminó con éxito`);
        }
    }
    alert('La carpeta no existe');
}

function goToRoot(rutaSplit) {
    var tmp = currentUser.estudiante.nTree.root;
    var tmp2 = currentUser.estudiante.nTree.root.value;
    for (let i = 0; i < rutaSplit.length; i++) {
        for (let j = 0; j < tmp.children.length; j++) {
            if (rutaSplit[i] === tmp.children[j].value) {
                tmp = tmp.children[j];
                break;
            }
        }
        if (tmp.value === tmp2) {
            alert('no existe la carpeta especificada');
            return;
        } else {
            tmp2 = tmp.value;
        }
    }
    currentFolder = tmp;
}
var dotInfo = '';
var contadorGraphviz = 0;
var nivel = 1;
function graphNtree(node) {
    dotInfo = `graph G{
layout=neato;

`;
    contadorGraphviz = 0;
    traverse(node,nivel);
    dotInfo += '}'
    return dotInfo
}

function traverse(node, _nivel) {
    if(node.value == '/')
        dotInfo += `nodo${contadorGraphviz} [ label = "${node.value}", shape = box];\n`;
    else dotInfo += `nodo${contadorGraphviz} [ label = "${node.value}"];\n`;

    const tmp = contadorGraphviz;
    contadorGraphviz++;
    if (node.children.length > 0) {

        for (let i = 0; i < node.children.length; i++) {
            dotInfo += `nodo${tmp} -- nodo${contadorGraphviz}[label = "${_nivel}"];\n`;
            traverse(node.children[i], _nivel + 1);
        }
    }
}

export { generateFolders }

function generateFolders() {
    let folders = '';
    for (let i = 0; i < currentFolder.children.length; i++) {
        // console.log(currentFolder.children[i].value);
        folders += `
        <div class="folder" style="background-image: url('folder.png');">
            <p>${currentFolder.children[i].value}</p>
        </div>
        `
    }
    let tmp = currentFolder.sparseMatrix.head.down;
    while(tmp != null){
        if(tmp.value.indexOf("pdf") >= 0){
            folders += `
        <div class="folder" style="background-image: url('pdf.png');">
            <p>${tmp.value}</p>
        </div>
        `
        }else if(tmp.value.indexOf("txt") >= 0){
            folders += `
        <div class="folder" style="background-image: url('txt.png');">
            <p>${tmp.value}</p>
        </div>
        `
        }else if(tmp.value.indexOf("gif") >= 0){
            folders += `
        <div class="folder" style="background-image: url('gif.png');">
            <p>${tmp.value}</p>
        </div>
        `
        }else if(tmp.value.indexOf("jpg") >= 0){
            folders += `
        <div class="folder" style="background-image: url('jpg.jpeg');">
            <p>${tmp.value}</p>
        </div>
        `
        }
        tmp = tmp.down;
    }

    document.getElementById('folder-files-div').innerHTML = folders;
}

document.getElementById("boton-reporte-carpeta").addEventListener('click', () => {
    let graph = graphNtree(currentUser.estudiante.nTree.root);
    document.getElementById('reporte-ntree').hidden = false;
    document.getElementById('reporte-ntree').src = encodeURI("https://quickchart.io/graphviz?graph=" + graph);
});

document.getElementById("boton-reporte-archivos").addEventListener('click', () => {
    let graph = currentUser.estudiante.bitacora.graph();
    document.getElementById('reporte-ntree').hidden = false;
    document.getElementById('reporte-ntree').src = encodeURI("https://quickchart.io/graphviz?graph=" + graph);
});




function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}




document.getElementById('upload-file').addEventListener('click', async () => {
    if (document.getElementById('fname').value === '/') {
        currentFolder = currentUser.estudiante.nTree.root;
    }
    const fileInput = document.getElementById("myFileInput");
    let newFile = fileInput.files[0].name;
    let file = fileInput.files[0];

    let base64String = await fileToBase64(file);
    console.log(base64String);

    currentFolder.sparseMatrix.insertVertical(new NodeMatrix(newFile,base64String),currentFolder.sparseMatrix.head);


    let date = new Date();
    currentUser.estudiante.bitacora.insert(`Se creo archivo \n\\"${newFile}\\"
    Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
    Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);
    generateFolders();
});


document.getElementById('boton-ver-archivo').addEventListener('click', async () => {
    if (document.getElementById('fname').value === '/') {
        currentFolder = currentUser.estudiante.nTree.root;
    }
    var verArchivo = window.prompt('Introduce el nombre de la carpeta');
    let tmp = currentFolder.sparseMatrix.head;
    while(tmp != null){
        if(tmp.value == verArchivo){
            document.getElementById('folder-files-div').innerHTML = tmp.base64;
            const newTab = window.open();
            newTab.document.write(tmp.base64);
            return
        }
        tmp = tmp.down;
    }
    alert('No se encontró el archivo');
});

document.getElementById("boton-reporte-archivos2").addEventListener('click', () => {
    let count = 0;
    let graph1 = ''
    let tmp = currentFolder.sparseMatrix.head;
    while(tmp.down != null){
        graph1 += `nodo${count}
        [ label = " ${tmp.value}"];
        nodo${count} -> nodo${count + 1};
        nodo${count + 1} -> nodo${count};`
        tmp = tmp.down;
        count++;
    }
    graph1 += `nodo${count}
    [ label = " ${tmp.value}"];
    nodo${count} -> nodo${0};
    nodo${0} -> nodo${count};`
    

    let graph = `digraph G{
    rankdir=LR
    node[shape=box]
    concentrate=true
    splines=ortho
    ${graph1}
    }`
    console.log(graph);
    document.getElementById('reporte-ntree').hidden = false;
    document.getElementById('reporte-ntree').src = encodeURI("https://quickchart.io/graphviz?graph=" + graph);
});