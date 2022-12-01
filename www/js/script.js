getCategories();
 
$(document).ready(function() {

});

// START
function getCategories() {
  // GET categorias
  let busquedaCategorias = (data) => {
    data.forEach((category) => {
      let parent = document.getElementById("categorias");
      let button = document.createElement("button")
      button.classList.add("list-group-item", "list-group-item-action");
      button.innerText = category.name;
      // button.data-bs-toggle="list";
      button.setAttribute('data-bs-toggle', 'list');
      button.type="button";
      button.id = category.id; //Añade el ID en cada elemento del LI.
      button.addEventListener("click", function (event) {
        getSitesByCategory(category.id);
      });
      parent.appendChild(button);
    });
  };
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => busquedaCategorias(data));
}

function limpiarTabla() {
  $("#tbodyid").empty();
}

function getSitesByCategory(id) {
  limpiarTabla();
  //devuelve los sitios de una categoria

  let parent = document.getElementsByTagName("tbody")[0];
  parent.innerHTML = "";

  let busquedaSitesByCategory = (data) => {
    data.forEach((sites) => {
      let tr = document.createElement("tr"); //Creamos una fila por cada 'Site'
      let td = document.createElement("td"); //y vamos creando las columnas...
      
      td.innerText = sites.name;
      tr.appendChild(td);

      //User
      td = document.createElement("td");
      
      td.innerText = sites.user;
      tr.appendChild(td);

      //Created At
      td = document.createElement("td");
      
      td.innerText = sites.createdAt;
      tr.appendChild(td);

      // Icons PENDING
      td = document.createElement("td");
      
      let boton = document.createElement("button");

      // abrir
      boton.onclick = function () {
        alert("1");
      };
      boton.innerHTML = '<i class="fa-solid fa-folder fa-beat"> </i>';
      td.appendChild(boton);

      // eliminar
      boton = document.createElement("button");
      boton.onclick = function () {
        alert("2"); 
      };
      boton.innerHTML = '<i class="fa-regular fa-trash-can fa-beat"></i>';
      td.appendChild(boton);

      // editar
      boton = document.createElement("button");
      boton.onclick = function () {
        alert("1");
      };
      boton.innerHTML = '<i class="fa-solid fa-pen-to-square fa-beat"></i>';
      td.appendChild(boton);

      tr.appendChild(td); //Insertamos columnas en la fila
      parent.appendChild(tr); //Añadimos la fila al tbody
    });
  };

  fetch("http://localhost:3000/categories/" + id) //nos devuelve los sitios de esa
    .then((res) => res.json())
    .then((data) => busquedaSitesByCategory(data));
}
