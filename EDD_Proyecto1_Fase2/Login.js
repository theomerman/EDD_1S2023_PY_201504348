import AVLTree from "./Arboles/AVLTree.js";
import { arbolAVL } from "./AdminPage/AdminPage.js";


// Get the login form element
const loginForm = document.querySelector('#login-form');

//divs
const loginDiv = document.getElementById('login-div');
const adminDashboard = document.getElementById('admin-div');
const reporteAVL = document.getElementById('reporte-avl')
const ordenamientos = document.getElementById('ordenamientos');

const userDashboard = document.getElementById('user-div');

let username = "";
// export {username};

let currentUser;
export {currentUser}

var nTreeNode;
export {nTreeNode};



loginForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    
    currentUser = arbolAVL.search(parseInt(username));

    

    if (username === 'admin' && password === 'admin') {

        loginDiv.hidden = true;
        userDashboard.hidden = true;
        adminDashboard.hidden = false;
        
    }else if(currentUser){
        if(currentUser.estudiante.password === password){
            loginDiv.hidden = true;
            userDashboard.hidden = false; 
            adminDashboard.hidden = true;
            document.getElementById('fname').value = '/';
            document.getElementById('welcome').innerHTML = `Bienvenido ${currentUser.estudiante.nombre}`;
            nTreeNode = currentUser.estudiante.nTree.root;
        }else{
            alert('Invalid username or password. Please try again.');
        }

    } else {
        
        alert('Invalid username or password. Please try again.');
    }
});





function hiddeAll(){
    adminDashboard.hidden = true;
    reporteAVL.hidden = true;
    ordenamientos.hidden = true;
    userDashboard.hidden = true
}
// hiddeAll();
export{hiddeAll}


