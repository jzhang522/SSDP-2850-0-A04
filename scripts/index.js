`use strict`

const year = document.getElementById("year");

year.textContent = new Date().getFullYear()

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("auto-slide");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 10000); 
}