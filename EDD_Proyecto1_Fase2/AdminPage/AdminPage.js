import AVLTree from '../Arboles/AVLTree.js'

const mostrarAlumnos = document.getElementById('button1');
const arbolEstudiantes = document.getElementById('button2');
const cargaMasiva = document.getElementById('load-json-btn');
let arbolAVL = new AVLTree();


const table = document.getElementById('table');

const newContent = `
<tr>
<td>4</td>
<td>Jane</td>
<td>Doe</td>
<td>@jane</td>
</tr>
<tr>
<td>5</td>
<td>John</td>
<td>Smith</td>
<td>@john</td>
</tr>
`;

mostrarAlumnos.addEventListener('click', () => {
    table.hidden = false;
    table.innerHTML = `
  <thead>
    <tr>
      <th>#</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Product 1</td>
      <td>$100</td>
      <td>Description 1</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Product 2</td>
      <td>$200</td>
      <td>Description 2</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Product 3</td>
      <td>$300</td>
      <td>Description 3</td>
    </tr>
    ${newContent}
  </tbody>
`;
});

arbolEstudiantes.addEventListener('click', () => {
    table.hidden = true;
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
        
        console.log(jsonData);
        arbolAVL.insert(3);
        arbolAVL.inOrderTraversal(arbolAVL.root);
    };
    reader.onerror = () => {
        console.error('Error loading JSON file.');
    };
    reader.readAsText(file);
});