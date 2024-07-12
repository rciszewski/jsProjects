const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const saveBookmarkBtn = document.querySelector("button");

//show modal, focus input
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus()
};
const closeModal = (e) => {
  console.log(e)
  // modal.classList.remove("show-modal");
};

const saveBookmark = (e) => {
  e.preventDefault();
  console.log(websiteNameEl.value);
  console.log(websiteUrlEl.value);
  console.log("bookmark saved");
};



modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", closeModal);
saveBookmarkBtn.addEventListener("click", saveBookmark);
window.addEventListener('click', closeModal)
