getCategories();

// $(document).ready(function() {
// document.querySelector("#categorias li").click(function(event) {
//   console.log(":D");
//     alert(event.target.id);
// });
// });

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
      let child = document.createElement("li");
      child.innerText = category.name;
      child.id = category.id;
      child.addEventListener("click", function (event) {
        getSitesByCategory(category.id);
      });
      parent.appendChild(child);
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
  let busquedaSitesByCategory = (data) => {
    data.forEach((category) => {
      let tablitaBonita = document.getElementById("tabla-sitios");

      // sitio
      let newRow = tablitaBonita.insertRow(-1); // Insert a row at the end of the table
      let newCell0 = newRow.insertCell(); // Insert a cell in the row at index 0
      let newText = document.createTextNode(category.name); // Append a text node to the cell
      newCell0.appendChild(newText);

      // usuario
      let newCell1 = newRow.insertCell();
      newCell1.classList.add("align-middle");
      let newText1 = document.createTextNode(category.user);
      newCell1.appendChild(newText1);

      // fecha
      let newCell2 = newRow.insertCell();
      newCell2.classList.add("align-middle");
      let newText2 = document.createTextNode(category.createdAt);
      newCell2.appendChild(newText2);

      // icons
      let newCell3 = newRow.insertCell();
      newCell3.classList.add("align-middle");

      //button open
      let rem = document.createElement("button");
      rem.onclick = function () {
        alert("1");
      };
      rem.innerHTML = '<i class="fa-solid fa-folder fa-beat"> </i>';
      newCell3.appendChild(rem);

      //button eliminar
      rem = document.createElement("button");
      rem.onclick = function () {
        alert("2");
      };
      rem.innerHTML = '<i class="fa-regular fa-trash-can fa-beat"></i>';
      newCell3.appendChild(rem);

      //button editar
      rem = document.createElement("button");
      rem.onclick = function () {
        alert("3");
      };
      rem.innerHTML = '<i class="fa-solid fa-pen-to-square fa-beat"></i>';
      newCell3.appendChild(rem);

      // category.name; category.user; category.createdAt;
      // let div = document.createElement("div");
      // div.innerHTML = category.name;
      // laOStia.appendChild(div);
    });
  };

  fetch("http://localhost:3000/categories/" + id)
    .then((res) => res.json())
    .then((data) => busquedaSitesByCategory(data));
}
