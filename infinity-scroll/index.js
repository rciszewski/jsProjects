const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// check if all images were loaded
const imageLoaded = () => {
  console.log('image loaded')
  imagesLoaded++;
  if(imagesLoaded === totalImages) ready = true;
  console.log('ready = ', ready)
}


// Helper function to set attributes on DOM elements
const setAttributes = (element, attributes) => {
  for (const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links & photos, Add to DOM
const displayPhotos = () => {
  totalImages = photosArray.length;
  console.log('total images: ', totalImages)
  // Run function for each object in photosArray
  photosArray.forEach(photo => {
    // Create <a> to link to unsplash
    const anchor = document.createElement('a');
    setAttributes(anchor,{
      href: photo.links.html,
      target: '_blank',
    });
    // create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Eventer Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded)
    // put <img> inside <a>, then put both inside imageContainer element
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}


// Unsplash API
const count = 30;
const apiKey = 'Ggay3N2XL7G1axR3DLciEFxzO2khQpkvtri1A98N0q0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash api
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    console.log('error: ', error)
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000){
    getPhotos()
    console.log('load more');
  }
})

// onLoad
// getPhotos();


