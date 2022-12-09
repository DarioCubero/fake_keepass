function getParams() {
  if (hasQueryParams()) {
    let urlParams = new URLSearchParams(window.location.search);
    let idSite = urlParams.get("site");
    alert("Parámetro recogido de la URL: " + idSite);
  }
}

function hasQueryParams(url) {
  return window.location.href.indexOf("?") > -1;
}

$(document).ready(function () {
  getParams();
});
