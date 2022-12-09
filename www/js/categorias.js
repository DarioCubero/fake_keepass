$(document).ready(function () {
  //cuando se cierra el modal limpia el input
  document.getElementById("modalNewCategory").addEventListener("hidden.bs.modal", () => {
    document.getElementById("name-text").value = "";
  });
});

// MODAL
$("#modalNewCategory").on("click", "#paramsOkay", function () {
  //Le pasamos una lista con los valores del objeto
  let nombre = document.getElementById("name-text").value;
  let valuesList = [nombre];

  postCreateCategory(valuesList).then((data) => {
    console.log("postCreateCategory/Data: ", data);
  });

  $("#modalNewCategory").modal("toggle");
});

// CREAR CATEGORÍA
let postCreateCategory = async (valuesList) => {
  let objectCategory = { name: valuesList[0].toLowerCase() }; //creamos el objeto

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(objectCategory), //lo convertimos a json
  };

  const response = await fetch("http://localhost:3000/categories/", settings);
  if (response.ok) {
    // si el HTTP-status es 200-299
    // obtener cuerpo de la respuesta (método debajo)
    let json = await response.json();
    console.log("postCreateCategory/Response: ", json);
    swal("Creación de categoría: " + valuesList[0].toUpperCase(), "OK!", "success").then((foo) => {
      location.reload();
    });
  } else {
    swal("Creación de categoría: FALLIDA", "Status: " + response.status.toString(), "error");
  }
  return response;
};

// BORRAR CATEGORÍA
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

$("#botonBorrarCategoria").on("click", function () {
  let [selected, id, catSelectedText] = isCategorySelected();
  if (selected) {
    // BORRAR CATEGORIA
    swal({
      title: "Borrar categoría: " + catSelectedText.toUpperCase(),
      text: "Estás segur@? No podrás recuperarla!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:3000/categories/" + id, {
          method: "DELETE",
        })
          .then((res) => res.text()) // or res.json()
          .then((res) => console.log(res));
        swal(catSelectedText.toUpperCase() + " ha sido borrada!", {
          icon: "success",
        }).then((foo) => {
          location.reload();
        });
      } else {
        swal("Borrado de categoría cancelado.");
        $("#" + id).removeClass("active");
      }
    });
  } else {
    swal("¿Cual borramos?", "Prueba a seleccionar una categoría...", "warning");
  }
});

$("#botonCrearSite").on("click", function () {
  let [selected, id] = isCategorySelected();

  if (selected) {
    window.location = "createSite.html?site=" + id;
  } else {
    swal("¿Dónde añadimos?", "Prueba a seleccionar una categoría...", "warning");
  }
});
