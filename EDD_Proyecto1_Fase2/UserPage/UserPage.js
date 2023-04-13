import { hiddeAll } from "../Login.js";
import { currentUser } from "../Login.js";
import { Node } from "../Arboles/NTree.js";
import { nTreeNode } from "../Login.js";

var currentFolder;


document.getElementById('log-out2').addEventListener('click', () => {
    hiddeAll();
    document.getElementById('login-div').hidden = false;
    
});

document.getElementById('fname').addEventListener("keydown", function(event) {

    if (event.key === "Enter" || event.key === "Return") {
        // console.log(document.getElementById('fname').value)
        let ruta = document.getElementById('fname').value
        
        if(ruta === '/'){
            // tmp = ruta.substring(1);
            // rutaMatriz = ruta.substring(1).split('/');
            
            currentFolder = currentUser.estudiante.nTree.root;
        }else{
            let rutaSplit = ruta.substring(1);
            
            rutaSplit = rutaSplit.split('/');
            // console.log(rutaSplit);   
            goToRoot(rutaSplit);  
        }
        
        currentUser.estudiante.nTree.traverseBF(node => console.log(node.value));
    }
    
});

document.getElementById('boton-crear-carpeta').addEventListener('click', () => {

    let tmp = document.getElementById('fname').value;
    var newFolder = window.prompt('Introduce el nombre de la carpeta');
    addFolder(newFolder);
});

document.getElementById('boton-eliminar-carpeta').addEventListener('click', () => {

    console.log('entro');
    var newFolder = window.prompt('Introduce el nombre de la carpeta que deseas eliminar');
    removeFolder(newFolder);
});

function addFolder(newFolder){
    
    if(document.getElementById('fname').value === '/'){
        currentFolder = currentUser.estudiante.nTree.root;
    }


    for(let i = 0; i < currentFolder.children.length; i++){
        if(newFolder === currentFolder.children[i].value){
            currentFolder.addChild(new Node(currentFolder.children[i].value + "(2)"));
            return alert(`La carpeta ya existe pero se agregó como ${currentFolder.children[i].value}(2)`);
        }
    }
    currentFolder.addChild(new Node(newFolder));
    console.log(currentFolder);
    currentUser.estudiante.nTree.traverseBF(node => console.log(node.value));
}

function removeFolder(removeFolder){
    
    for(let i = 0; i < currentFolder.children.length; i++){
        if(removeFolder === currentFolder.children[i].value){
            currentFolder.children.splice(i,1);
            return alert(`La carpeta se eliminó con éxito`);
        }
    }
    alert('La carpeta no existe');
}

function goToRoot(rutaSplit){
    var tmp = currentUser.estudiante.nTree.root;
    var tmp2 = currentUser.estudiante.nTree.root.value;
    for(let i = 0; i < rutaSplit.length; i++){
        for (let j = 0; j < tmp.children.length; j++) {
            if(rutaSplit[i] === tmp.children[j].value){
                tmp = tmp.children[j];
                break;
            }   
        }
        if(tmp.value === tmp2){
            alert('no existe la carpeta especificada');
            return;
        }else{
            tmp2 = tmp.value;
        }
    }
    currentFolder = tmp;
}