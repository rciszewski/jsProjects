const menuBars = document.querySelector(".menu-bars");
const overlay = document.getElementById("overlay");
const nav1 = document.getElementById("nav-1");
const nav2 = document.getElementById("nav-2");
const nav3 = document.getElementById("nav-3");
const nav4 = document.getElementById("nav-4");
const nav5 = document.getElementById("nav-5");
const navList = [nav1, nav2, nav3, nav4, nav5];

const animateNavItems = (navList, action) => {
  if (action === "add") {
    navList.forEach((nav, idx) => {
      nav.classList.add(`slide-in-${idx + 1}`);
      nav.classList.remove(`slide-out-${idx + 1}`);
    });
  } else {
    navList.forEach((nav, idx) => {
      nav.classList.add(`slide-out-${idx + 1}`);
      nav.classList.remove(`slide-in-${idx + 1}`);
    });
  }
};

const toggleNav = () => {
  menuBars.classList.toggle("change");
  overlay.classList.toggle("overlay-active");

  if (overlay.classList.contains("overlay-active")) {
    overlay.classList.remove("overlay-slide-left");
    overlay.classList.add("overlay-slide-right");
    animateNavItems(navList, "add");
  } else {
    overlay.classList.remove("overlay-slide-right");
    overlay.classList.add("overlay-slide-left");
    animateNavItems(navList, "remove");
  }
};

menuBars.addEventListener("click", toggleNav);
