const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const projectsTextBox = document.getElementById("text-box");

const DARK_THEME = "dark";
const LIGHT_THEME = "light";

// dark or light images
const imageMode = (color) => {
  image1.src = `img/undraw_proud_coder_${color}.svg`;
  image2.src = `img/undraw_feeling_proud_${color}.svg`;
  image3.src = `img/undraw_conceptual_idea_${color}.svg`;
};

const toggleTheme = (theme) => {
  nav.style.backgroundColor =
    theme === DARK_THEME ? "rgb(0 0 0 / 50%)" : "rgb(255 255 255 / 50%)";

  projectsTextBox.style.backgroundColor =
    theme === DARK_THEME ? "rgb(255 255 255 / 50%)" : "rgb(0 0 0 / 50%)";
  ("rgb(255 255 255 / 50%)");

  toggleIcon.children[0].textContent =
    theme === DARK_THEME ? `Dark Mode` : `Light Mode`;

  theme === DARK_THEME
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");

  imageMode(theme);
};

//Switch theme dynamically
const switchTheme = (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", DARK_THEME);
    localStorage.setItem("theme", DARK_THEME);
    toggleTheme(DARK_THEME);
  } else {
    document.documentElement.setAttribute("data-theme", LIGHT_THEME);
    localStorage.setItem("theme", LIGHT_THEME);
    toggleTheme(LIGHT_THEME);
  }
};

//Eventer listener
toggleSwitch.addEventListener("change", switchTheme);

// check local storage for theme
const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
  if (currentTheme === DARK_THEME) {
    toggleSwitch.checked = true;
    toggleTheme(DARK_THEME);
  }
}
