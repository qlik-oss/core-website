function cookiePopup() {
  if (document.getElementById("cookieModal")){
    document.getElementsByClassName("accept-cookies")[0].className +=
    " hidden";}
  }

  
(function() { 
  var imgCount = 5;
  var dir = '/images/';
  var randomCount = Math.round(Math.random() * (imgCount - 1)) + 1;
  var images = new Array
          images[1] = "bg-1.jpg",
          images[2] = "bg-2.jpg",
          images[3] = "bg-3.jpg",
          images[4] = "bg-4.jpg",
          images[5] = "bg-5.jpg"
  document.getElementById("header-id").style.backgroundImage = "url(" + dir + images[randomCount] + ")"; 
})();

(function() { 
  var h1 = document.getElementsByTagName("h1");
  var node = document.createElement("SPAN");                 // Create a <li> node
  var textnode = document.createTextNode("/ "); 
  node.appendChild(textnode);
  for (i = 0; i < h1.length; i++) {
    h1[i].insertAdjacentHTML('afterbegin', '<span>/ </span>');
    //console.log(h1[i]); //.parentNode.insertBefore(node, h1[i]);
  }
})();