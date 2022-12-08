/*
{
  "name": "test2",
  "url": "sample",
  "user": "test",
  "password": "test",
  "description": "test"
}
*/
window.onload = function(e) {
    console.log('documento cargado');

    let valor = "";
    document.getElementById("pass").value=valor;
   
}

function generar() {
    long = 8;
    var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
    var contraseña = "";
    for (i = 0; i < long; i++) contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    document.getElementById("pass").value = contraseña;
  }
function guardarSite(){
    let site = document.getElementById('sitio').value;
    let url = document.getElementById('url').value;
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let desc = document.getElementById('desc').value;

    var sitio = new Object();
   sitio.name = site;
   sitio.url  = url;
   sitio.user  = user;
   sitio.password  = pass;
   sitio.description  = desc;
   
   var jsonString= JSON.stringify(sitio);
   console.log(jsonString);
}