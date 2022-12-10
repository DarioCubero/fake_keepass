$(document).ready(function () {
  //cuando se cierra el modal limpia el input
  document
    .getElementById("modalNewCategory")
    .addEventListener("hidden.bs.modal", () => {
      document.getElementById("name-text").value = "";
    });

  // MODAL
  $("#modalNewCategory").on("click", "#paramsOkay", function () {
    //Le pasamos una lista con los valores del objeto
    let nombre = document.getElementById("name-text").value;
    //Comprobamos campo vacio
    if (nombre == ""){
      document.getElementById("alerta-txt-vacio").style.display = "block";
    }else{
      let valuesList = [nombre];

    postCreateCategory(valuesList).then((data) => {
      console.log("postCreateCategory/Data: ", data);
    });

    $("#modalNewCategory").modal("toggle");
    }
    
  });
  //Ocultamos aviso
  $("#modalNewCategory").on("click", "#paramsCancel", function () {
    document.getElementById("alerta-txt-vacio").style.display = "none";
  });

  // CREAR CATEGORÍA
  let postCreateCategory = async (valuesList) => {
    let objectCategory = {
      name: valuesList[0].toLowerCase(),
    }; //creamos el objeto

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
      swal(
        "Creación de categoría: " + valuesList[0].toUpperCase(),
        "OK!",
        "success"
      ).then((foo) => {
        location.reload();
      });
    } else {
      swal(
        "Creación de categoría: FALLIDA",
        "Status: " + response.status.toString(),
        "error"
      );
    }
    return response;
  };

});
