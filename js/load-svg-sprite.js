(function() {
  var ajax = new XMLHttpRequest();
  ajax.open("GET", "img/icons.svg", true);
  ajax.send();
  ajax.onload = function(e) {
    var div = document.createElement("div");
    div.innerHTML = ajax.responseText;
    div.className += "svg-sprite";
    document.body.insertBefore(div, document.body.childNodes[0]);
  };
})();