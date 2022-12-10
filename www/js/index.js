// Cargamos las categorías
$(document).ready(function () {
  getCategories();

  function limpiarTabla() {
    $("#tbodyid").empty();
  }

  // START
  function getCategories() {
    // GET categorias
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => busquedaCategorias(data));
  }

  let busquedaCategorias = (data) => {
    data.forEach((category) => {
      let parent = document.getElementById("categorias");
      let button = document.createElement("button");
      button.classList.add("list-group-item", "list-group-item-action");
      button.innerText = category.name;
      // button.data-bs-toggle="list";
      button.setAttribute("data-bs-toggle", "list");
      button.type = "button";
      button.id = category.id; //Añade el ID en cada elemento del LI.
      button.addEventListener("click", function (event) {
        crearTablaIndex(category.id);
      });
      parent.appendChild(button);
    });
  };

  function crearTablaIndex(id) {
    limpiarTabla();
    //devuelve los sitios de una categoria
    let parent = document.getElementsByTagName("tbody")[0];
    parent.innerHTML = "";

    // Creamos la tabla de sitios
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
        let ahref = document.createElement("a");

        // abrir
        ahref.href = sites.url;
        ahref.setAttribute("target", "_blank");
        ahref.innerHTML = '<i class="site-icon fa-regular fa-folder"> </i>';
        td.appendChild(ahref);

        // eliminar
        ahref = document.createElement("a");
        ahref.onclick = function () {
          // BORRAR CATEGORÍA
          console.log('ICON BORRAR CATEGORIA');
          fetch("http://localhost:3000/sites/" + sites.id, {
            method: "DELETE",
          });
          location.reload();
        };
        ahref.innerHTML = '<i class="site-icon fa-regular fa-trash-can"></i>';
        td.appendChild(ahref);

        // editar
        ahref = document.createElement("a");
        ahref.onclick = function () {
          window.location = "site.html?site=" + sites.id + "&category=" + sites.categoryId;
        };
        ahref.innerHTML = '<i class="site-icon fa-solid fa-pen-to-square"></i>';
        td.appendChild(ahref);

        tr.appendChild(td); //Insertamos columnas en la fila
        parent.appendChild(tr); //Añadimos la fila al tbody
      });
    };

    fetch("http://localhost:3000/categories/" + id) // Sitios de una categoría
      .then((res) => res.json())
      .then((data) => busquedaSitesByCategory(data));
  }

  function isCategorySelected() {
    let catSelectedId = $("#categorias button.active").attr("id"); //ID DE LA CATEGORÍA SELECCIONADA
    let catSelectedText = $("#categorias button.active").html(); //NOMBRE DE LA CATEGORÍA SELECCIONADA
    let values;
    if (typeof catSelectedId !== "undefined") {
      values = [true, catSelectedId, catSelectedText];
    } else {
      values = [false];
    }
    return values;
  }

  // AÑADIR SITIO
  $("#botonCrearSite").on("click", function () {
    let [selected, id] = isCategorySelected();

    if (selected) {
      window.location = "site.html?category=" + id;
    } else {
      swal(
        "¿Dónde añadimos?",
        "Prueba a seleccionar una categoría...",
        "warning"
      );
    }
  });

  $("#botonBorrarCategoria").on("click", function () {
    let [selected, categoryId, catSelectedText] = isCategorySelected();
    if (selected) {
      swal({
        title: "Borrar categoría: " + catSelectedText.toUpperCase(),
        text: "Estás segur@? No podrás recuperarla!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          console.log("Borrado de Categoría: " + catSelectedText);
          borrarCategoria(categoryId); 
          swal(catSelectedText.toUpperCase() + " ha sido borrada!", {
            icon: "success",
          }).then((foo) => {
            location.reload();
          });
        } else {
          swal("Borrado de categoría cancelado.");
          $("#" + categoryId).removeClass("active");
        }
      });
    } else {
      swal(
        "¿Cual borramos?",
        "Prueba a seleccionar una categoría...",
        "warning"
      );
    }
  });

  //Borrado Async de Categoría
  async function borrarCategoria(categoryId) {
    //Delete Category
    await fetch("http://localhost:3000/categories/" + categoryId, {
      method: "DELETE",
    })
  }

});
