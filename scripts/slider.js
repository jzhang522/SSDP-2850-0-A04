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
  setTimeout(carousel, 5000); 
}

// Science Section Toggle
const scienceHeader = document.querySelector(".science-header");
const scienceContent = document.getElementById("science-content");
const arrowIcon = document.querySelector(".arrow-icon");

scienceHeader.addEventListener("click", function() {
  scienceContent.classList.toggle("collapsed");
  arrowIcon.classList.toggle("rotated");
});