

// Get the login form element
const loginForm = document.querySelector('#login-form');

//divs
const loginDiv = document.getElementById('login-div');
const adminDashboard = document.getElementById('admin-div');

// let es = new Estudiante();


// avl.insert(new Node());

// Add an event listener to the login form submission
loginForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the username and password input values
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Check if the username and password are correct
    if (username === 'admin' && password === 'admin') {
        // Redirect the user to another page
        // window.location.href = 'AdminPage/dashboard.html';
        loginDiv.hidden = true;
        adminDashboard.hidden = false;
        
    } else {
        // Display an error message
        alert('Invalid username or password. Please try again.');
    }
});




// loginDiv.hidden = true;
function ocultarTodo(){
    adminDashboard.hidden = true;

}
ocultarTodo();


