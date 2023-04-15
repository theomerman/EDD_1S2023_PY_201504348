import { hiddeAll } from "../Login.js";
import { currentUser } from "../Login.js";
import { Node } from "../Arboles/NTree.js";
import { nTreeNode } from "../Login.js";

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
function graphNtree(node) {
    dotInfo = `digraph G{
rankdir=UD
node[shape=box]
concentrate=true
splines=ortho;
`;
    contadorGraphviz = 0;
    traverse(node);
    dotInfo += '}'
    return dotInfo
}

function traverse(node) {

    dotInfo += `nodo${contadorGraphviz} [ label = "${node.value}"];\n`;
    const tmp = contadorGraphviz;
    contadorGraphviz++;
    if (node.children.length > 0) {

        for (let i = 0; i < node.children.length; i++) {
            dotInfo += `nodo${tmp} -> nodo${contadorGraphviz};\n`;
            traverse(node.children[i]);
        }
    }
}

export { generateFolders }

function generateFolders() {
    let folders = '';
    for (let i = 0; i < currentFolder.children.length; i++) {
        console.log(currentFolder.children[i].value);
        folders += `
        <div class="folder" style="background-image: url('folder.png');">
            <p>${currentFolder.children[i].value}</p>
        </div>
        `
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








function base64(fileInput) {
    return new Promise((resolve, reject) => {
        const file = fileInput.files[0];
        if (!file) {
            reject(new Error("No file selected."));
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            resolve(base64);
        };
        reader.onerror = error => {
            reject(error);
        };
    });
}






document.getElementById('upload-file').addEventListener('click', () => {
    const fileInput = document.getElementById("myFileInput");
    let newFolder = fileInput.files[0].name;
    base64(fileInput)
    .then(base64 => {
        console.log(base64);

        if (document.getElementById('fname').value === '/') {
            currentFolder = currentUser.estudiante.nTree.root;
        }
    
        let date = new Date();
    
        for (let i = 0; i < currentFolder.children.length; i++) {
            if (newFolder === currentFolder.children[i].value) {
                currentFolder.addChild(new Node(currentFolder.children[i].value + "(2)"));
                currentUser.estudiante.archivos.insert(`Se creo archivo \n\\"${currentFolder.children[i].value + "(2)"}\\"
    Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
    Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);
    
    
                generateFolders();
                return alert(`El archivo ya existe pero se agregó como ${newFolder}(2)`);
            }
        }
        currentFolder.addChild(new Node(newFolder));
    
    
        currentUser.estudiante.archivos.insert(`Se creo archivo \n\\"${newFolder}\\"
    Fecha: ${date.getDate() + '-' + Number(date.getMonth()) + 1 + '-' + date.getFullYear()}
    Hora: ${date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()}`);
    
    
        generateFolders();











        
        currentUser.estudiante.bitacora.insert()
    })
    .catch(error => {
        console.error(error);
    });
});
