if (document.getElementById("marketing-page")) {
  document.getElementsByClassName("md-content")[0].className +=
    " marketing-page-main-content";

  var elems = document.querySelectorAll(".md-content__inner");
  elems.forEach(function(element) {
    var children = element.children;
    var i = 0;
    var nbrOfChildrens = element.childElementCount;
    while (nbrOfChildrens > 0) {
      if (children[i].id != "marketing-page") {
        children[i].remove();
      } else {
        i++;
      }
      nbrOfChildrens--;
    }
  });
}
