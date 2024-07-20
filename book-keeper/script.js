const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const saveBookmarkBtn = document.querySelector("button");

let bookmarks = [];

//show modal, focus input
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};
const closeModal = (e) => {
  e.target === modal || e.target === modalClose
    ? modal.classList.remove("show-modal")
    : false;
};

//Modal event listeners
modalShow.addEventListener("click", showModal);
window.addEventListener("click", closeModal);

//validate form
function validate(nameValue, urlValue) {
  const expression =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  const regex = new RegExp(expression);
  console.log(!nameValue);
  console.log(!urlValue);
  console.log(urlValue);

  if (!nameValue || !urlValue) {
    alert("please submit values for both fields");
    return false;
  }

  if (!urlValue.match(regex)) {
    alert("please provide a valid web address");
    return false;
  }
  return true;
}

//fetch bookmarks from localStroage
function fetchBookmarks() {
  // get bookmarks from local storage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // create bookmarks array in localStorage
    bookmarks = [
      {
        name: "Ron C",
        url: "https://ronciszewski.com",
      },
    ];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  console.log(bookmarks);
}

//Handle data from form
function storeBookmark(e) {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = `https://${urlValue}`;
  }

  if (!validate(nameValue, urlValue)) {
    return false;
  }
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  console.log(bookmarks);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks()
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// on load, fetch bookmarks
fetchBookmarks()
