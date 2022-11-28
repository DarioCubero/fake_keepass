getCategories();

$(document).ready(function() {
    $("#categorias li").click(function(event) {
        alert(event.target.id);
    });
});

// START
function getCategories() {
  // GET categorias
  let busquedaCategorias = (data) => {
    data.forEach((category) => {
      let parent = document.getElementById("categorias");
      let child = document.createElement("li");
      child.innerText = category.name;
      child.id = category.id;
    //   child.setAttribute("onclick", `clickCategory(${category.id})`);
      parent.appendChild(child);
    });
  };
  fetch("http://localhost:3000/categories")
    .then((res) => res.json())
    .then((data) => busquedaCategorias(data));
}

function getSitesByCategory(id) {
    alert(id + "hola");
//   let busquedaSites = (data) => {
//     data.forEach((category) => {
//       let parent = document.getElementsByTagName("p")[0];
//       let child = document.createElement("li");
//       child.innerText = category.name;
//       parent.appendChild(child);
//     });
//   };

//   fetch("http://localhost:3000/categories/"+ id)
//     .then((res) => res.json())
//     .then((data) => busquedaSites(data));
}
