// The start page is shown in full page
(function() {
  if (document.getElementById("marketing-page")) {
    document.getElementsByClassName("md-content")[0].className +=
      " marketing-page-main-content";
    document.getElementsByClassName("md-icon md-content__icon")[0].className +=
      " hidden";
  }
})();
