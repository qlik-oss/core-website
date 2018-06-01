// The start page is shown in full page
(function() {
  if (document.getElementById("marketing-page")) {
    document.getElementsByClassName("md-content")[0].className +=
      " marketing-page-main-content";
  }
})();

function hello() {
  if (document.getElementById("myModal")){
    document.getElementsByClassName("ca-accept-cookies")[0].className +=
    " hidden";}
  }