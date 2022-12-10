$(document).ready(function () {
  let inputSite = document.getElementById("sitio");
  let inputUrl = document.getElementById("url");
  let inputUser = document.getElementById("user");
  let inputPass = document.getElementById("pass");
  let inputDesc = document.getElementById("desc");
  let urlParams = new URLSearchParams(window.location.search);
  let idSite = urlParams.get("site");
  let idCategory = urlParams.get("category");
  console.log(idSite, idCategory);
  if (idSite != null && idCategory != null) {
    document.getElementById("titleSite").innerText = "Edición de sitio";
        // Cargamos los datos en el Formulario
        let filterSites = (data) => {
          data.forEach((siteData) => {
            if ((siteData.id == idSite)) {
              inputSite.value = siteData.name;
              inputUrl.value = siteData.url;
              inputUser.value = siteData.user;
              inputPass.value = siteData.password;
              inputDesc.value = siteData.description;
            }
          });
        };
        fetch("http://localhost:3000/sites") // Sitios de una categoría
          .then((arraySites) => arraySites.json())
          .then((data) => filterSites(data));
  } else {
    document.getElementById("titleSite").innerText = "Creación de sitio";
  }

  // function hasQueryParams(url) {
  //   return window.location.href.indexOf("?") > -1;
  // }

  // Generador de contraseña aleatoria
  document.getElementById("keyrandom").addEventListener("click", function () {
    let long = 8;
    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    let contraseña = "";
    for (let i = 0; i < long; i++)
      contraseña += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    document.getElementById("pass").value = contraseña;
  });

  // CREAR SITIO
  async function postCreateSite(data) {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    };

    // Default options are marked with *
    const response = await fetch("http://localhost:3000/categories/" + idCategory, settings);
    if (response.ok) {
      let json = await response.json();
      console.log("postCreateSite/Response: ", json);
      swal(
        "Creación de Sitio: " + json.name.toUpperCase(),
        "OK!",
        "success"
      ).then((foo) => {
        window.location = "index.html";
      });
    } else {
      swal(
        "Creación de categoría: FALLIDA",
        "Status: " + response.status.toString(),
        "error"
      );
    }
    return response;
  }

  // Control del submit
  document.getElementById("form").addEventListener("submit", function (event) {
    // Recogemos los valores
    let sitio = new Object();
    sitio.name = inputSite.value;
    sitio.url = inputUrl.value;
    sitio.user = inputUser.value;
    sitio.password = inputPass.value;
    sitio.description = inputDesc.value;

    postCreateSite(sitio).then((data) => {
      console.log("postCreateSite/Data: ", data);
    });

    event.preventDefault(); // Previene que al realizar el submit, se refresque la página
  });
});
