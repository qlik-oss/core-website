function cookiePopup() {
  if (document.getElementById("cookieModal")){
    document.getElementsByClassName("accept-cookies")[0].className +=
    " hidden";}
  }

  
(function() { 
  var imgCount = 5;
  var dir = document.location + 'images/';
  var randomCount = Math.round(Math.random() * (imgCount - 1)) + 1;
  var images = new Array
          images[1] = "bg-1.jpg",
          images[2] = "bg-2.jpg",
          images[3] = "bg-3.jpg",
          images[4] = "bg-4.jpg",
          images[5] = "bg-5.jpg"
  document.getElementById("header-id").style.backgroundImage = "url(" + dir + images[randomCount] + ")"; 
})();