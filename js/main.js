
// contains the data stored in firebase database
let data = [];

// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(config);

async function getData() {
  try {
    const response = await firebase.database().ref('usuarios').once('value');
    const obj = response.val();
    for (const key in obj) {
      data.push({
        id: key,
        ...obj[key],
      });
    }
    createTable();
  } catch (error) {
    console.error('getData error', error);
  }
}

function createTable() {
  const container = document.getElementById('table');
  if (container) {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      // create a tr
      const tr = document.createElement('tr');
      for (const key in element) {
        if (element.hasOwnProperty(key) && key !== 'id') {
          const dataField = element[key];
          // create a td
          const td = document.createElement('td');
          td.innerText = dataField;
          tr.appendChild(td);
        }
      }
      container.appendChild(tr);
    }
  }
}

async function submitHandler() {
  try {
    // inputs
    const identificacionEl = document.getElementById('txtIdentificacion');
    const nombreEl = document.getElementById('txtNombre');
    const usuarioEl = document.getElementById('txtUsuario');
    // input values
    const identificacion = identificacionEl.value;
    const nombre = nombreEl.value;
    const usuario = usuarioEl.value;

    if (identificacion && nombre && usuario) {
      const payload = {
        identificacion,
        nombre,
        usuario,
      };
      const response = await firebase.database().ref('usuarios').push(payload);
      // reset form
      identificacionEl.value = null;
      nombreEl.value = null;
      usuarioEl.value = null;
      // reload the page
      window.location.reload();
    }
  } catch (error) {
    console.error('submitHandler', error);
  }
} 

window.onload = () => {
  getData();
};