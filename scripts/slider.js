var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("banner-slide");
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

// Expand Stories section when clicking Stories quick link
const storiesQuickLinks = document.querySelectorAll('a[href="#stories"]');

function expandStoriesSection() {
  // Check if the section is collapsed
  if (scienceContent && scienceContent.classList.contains("collapsed")) {
    scienceContent.classList.remove("collapsed");
    if (arrowIcon) {
      arrowIcon.classList.remove("rotated");
    }
  }
}

storiesQuickLinks.forEach(function(link) {
  link.addEventListener("click", function(e) {
    expandStoriesSection();
  });
});

// Hamburger Menu/ Overlay
const openBtn = document.getElementById("mobile-menu-button");
const openDesktopBtn = document.getElementById("desktop-menu-button");
const overlay = document.getElementById("nav-overlay");
const closeBtn = overlay.querySelector(".overlay-close");
const overlaySlot = document.getElementById("overlay-nav-slot");
const sourceList = document.querySelector(".nav-list");

function buildOverlayMenuOnce() {
  if (overlaySlot.childElementCount > 0) return;

  const clonedList = sourceList.cloneNode(true);
  clonedList.removeAttribute("id");
  overlaySlot.appendChild(clonedList);
}

function openMenu() {
  buildOverlayMenuOnce();

  overlay.classList.add("is-open");
  overlay.setAttribute("aria-hidden", "false");
  openBtn.setAttribute("aria-expanded", "true");
  openDesktopBtn.setAttribute("aria-expanded", "true");

  document.body.classList.add("menu-open");
  closeBtn.focus();
}

function closeMenu() {
  overlay.classList.remove("is-open");
  overlay.setAttribute("aria-hidden", "true");
  openBtn.setAttribute("aria-expanded", "false");
  openDesktopBtn.setAttribute("aria-expanded", "false");

  document.body.classList.remove("menu-open");
  openBtn.focus();
}

openBtn.addEventListener("click", openMenu);
openDesktopBtn.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("is-open")) {
    closeMenu();
  }
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeMenu();
});

// Close menu when clicking on any link in the overlay menu
overlaySlot.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    closeMenu();
  }
});