const modal = document.querySelector("#modal");
const modalShow = document.querySelector("#show-modal");
const modalClose = document.querySelector("#close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.querySelector("#website-name");
const websiteUrlEl = document.querySelector("#website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");
const saveBookmarkBtn = document.querySelector("button");
const deleteBookmarkEl = document.querySelector("#delete-bookmark");

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

//Build bookmarks dom
function buildBookmarks() {
  bookmarksContainer.textContent = "";
  //build items
  bookmarks.forEach((bookmark) => {
    const { name, url } = bookmark;
    // item
    const item = document.createElement("div");
    item.classList.add("item");
    //close icon
    const closeIcon = document.createElement("i");
    closeIcon.classList.add("fas", "fa-times");
    closeIcon.setAttribute("title", "Delete Bookmark");
    closeIcon.setAttribute("onclick", `deleteBookmark('${url}')`);
    //Favicon / Link Container
    const linkInfo = document.createElement("div");
    linkInfo.classList.add("name");
    //Favicon
    const favicon = document.createElement("img");
    favicon.setAttribute(
      "src",
      `https://www.google.com/s2/favicons?domain=${url}&sz=${256}`
    );
    favicon.setAttribute("alt", "Favicon");
    //Link
    const link = document.createElement("a");
    link.setAttribute("href", `${url}`);
    link.setAttribute("target", "_blank");
    link.textContent = name;
    //append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

//fetch bookmarks from localStroage
function fetchBookmarks() {
  // get bookmarks from local storage if available
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  } else {
    // create bookmarks array in localStorage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  buildBookmarks();
}

//Delete bookmark
function deleteBookmark(url) {
  console.log(bookmarks);
  bookmarks.forEach((bookmark, idx) => {
    if (bookmark.url === url) {
      bookmarks.splice(idx, 1);
    }
  });
  console.log(bookmarks);

  // Update bookmarks array in local Storage, re-populate DOM
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
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
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
}

// Event listener
bookmarkForm.addEventListener("submit", storeBookmark);

// on load, fetch bookmarks
fetchBookmarks();
