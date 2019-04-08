function cookiePopup() {
  if (document.getElementById("cookieModal")){
    document.getElementsByClassName("accept-cookies")[0].className +=
    " hidden";}
  }

(function() { 
  var h1 = document.getElementsByTagName("h1");
  for (i = 0; i < h1.length; i++) {
    h1[i].insertAdjacentHTML('afterbegin', '<span>/ </span>');
  }
})(); 

window.onload = function(){
  var anchors = document.querySelectorAll('a.md-footer-social__link');
  for (var i=0; i<anchors.length; i++){
    anchors[i].setAttribute('target', '_blank');
  }
}