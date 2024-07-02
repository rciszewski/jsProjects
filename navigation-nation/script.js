const menuBars = document.querySelector(".menu-bars");
const overlay = document.getElementById("overlay");
const navOptions = document.querySelectorAll(".nav-option");

const toggleNav = () => {
  menuBars.classList.toggle("change");
  const isOverlayDisplayed = overlay.classList.contains("overlay-slide-right");
  isOverlayDisplayed
    ? overlay.classList.replace("overlay-slide-right", "overlay-slide-left")
    : overlay.classList.add("overlay-slide-right");
};

menuBars.addEventListener("click", toggleNav);
