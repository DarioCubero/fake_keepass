$(document).ready(function () {
  getParams();

  let valor = "";
  document.getElementById("pass").value = valor;

  function getParams() {
    if (hasQueryParams()) {
      let urlParams = new URLSearchParams(window.location.search);
      let idSite = urlParams.get("site");
      // alert("Parámetro recogido de la URL: " + idSite);
    }
  }

  function hasQueryParams(url) {
    return window.location.href.indexOf("?") > -1;
  }

  document.getElementById("keyrandom").addEventListener("click", function () {
    let long = 8;
    let caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    let contraseña = "";
    for (let i = 0; i < long; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    document.getElementById("pass").value = contraseña;
  });
  
  document.getElementById("botonGuardarSite").addEventListener("click", function () {
    let site = document.getElementById("sitio").value;
    let url = document.getElementById("url").value;
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;
    let desc = document.getElementById("desc").value;

    let sitio = new Object();
    sitio.name = site;
    sitio.url = url;
    sitio.user = user;
    sitio.password = pass;
    sitio.description = desc;

    let jsonString = JSON.stringify(sitio);
    console.log(jsonString);

    let url2 = "http://localhost:3000/categories/:id'";

    async function makePostRequest(url2, requestType) {
      await fetch(url2, {
        method: requestType,
        body: JSON.stringify(jsonString),
      }).then(async (rawResponse) => {
        let content = await rawResponse.json();
        console.log(content);
      });
    }
    makePostRequest(url2, "POST");
  });
});
