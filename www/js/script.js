getCategories();
 
$(document).ready(function() {
  $("#categorias button").on("click",function(){
    console.log("LOCOO");
  });
});

// document.querySelectorAll("#categorias li").forEach(x => x.addEventListener("click", hellou);

// function hellou(){
//   alert("XD");
// }

// document.querySelector("#categorias li").click(function(event) {
//   // .addEventListener("click", myFunction);

//   // console.log(":D");
//     // alert(event.target.id);
// });

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
      // button.id = category.id; //Añade el ID en cada elemento del LI.
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

// function addRow(tableID) {
//   // Get a reference to the table
//   let tableRef = document.getElementById(tableID);
//   // Insert a row at the end of the table
//   let newRow = tableRef.insertRow(-1);
//   // Insert a cell in the row at index 0
//   let newCell = newRow.insertCell(0);
//   // Append a text node to the cell
//   let newText = document.createTextNode('New bottom row');
//   newCell.appendChild(newText);
// }

function limpiarTabla() {
  document
    .querySelectorAll("#tabla-sitios tr:not(.rowthead)")
    .forEach((x) => x.remove());
}

function getSitesByCategory(id) {
  limpiarTabla();
  //devuelve los sitios de una categoria

  let parent = document.getElementsByTagName("tbody")[0];
  parent.innerHTML = "";

  let busquedaSitesByCategory = (data) => {
    data.forEach((sites) => {
      // let tablitaBonita = document.getElementById("tabla-sitios");

      // // sitio
      // let newRow = tablitaBonita.insertRow(-1); // Insert a row at the end of the table
      // let newCell = newRow.insertCell(); // Insert a cell in the row at index 0
      // let newText = document.createTextNode(sites.name); // Append a text node to the cell
      // newCell.appendChild(newText);

      // // usuario
      // newCell = newRow.insertCell();
      // newCell.classList.add("align-middle");
      // let newText1 = document.createTextNode(sites.user);
      // newCell.appendChild(newText1);

      // // fecha
      // newCell = newRow.insertCell();
      // newCell.classList.add("align-middle");
      // let newText2 = document.createTextNode(sites.createdAt);
      // newCell.appendChild(newText2);

      // // icons
      // newCell = newRow.insertCell();
      // newCell.classList.add("align-middle");

      let tr = document.createElement("tr");

      //Site
      let td = document.createElement("td");
      td.classList.add("align-middle");
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


      tr.appendChild(td);





      parent.appendChild(tr); //añade una columna

      // // icons
      // newCell = newRow.insertCell();
      // newCell.classList.add("align-middle");

      // //button open
      // let rem = document.createElement("button");
      // rem.onclick = function () {
      //   alert("1");
      // };
      // rem.innerHTML = '<i class="fa-solid fa-folder fa-beat"> </i>';
      // newCell.appendChild(rem);

      // //button eliminar
      // rem = document.createElement("button");
      // rem.onclick = function () {
      //   alert("2");
      // };
      // rem.innerHTML = '<i class="fa-regular fa-trash-can fa-beat"></i>';
      // newCell.appendChild(rem);

      // //button editar
      // rem = document.createElement("button");
      // rem.onclick = function () {
      //   alert("3");
      // };
      // rem.innerHTML = '<i class="fa-solid fa-pen-to-square fa-beat"></i>';
      // newCell.appendChild(rem);
    });
  };

  fetch("http://localhost:3000/categories/" + id) //nos devuelve los sitios de esa
    .then((res) => res.json())
    .then((data) => busquedaSitesByCategory(data));
}
