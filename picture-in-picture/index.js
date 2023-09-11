const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play

const selectMediaStream = async () => {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    }
  } catch (error) {
    console.log('selectMediaStream function error: ', error);
  }
}

button.addEventListener('click', async () => {
  // disable button
  button.disabled = true;
  
  // start picture in picture
  await videoElement.requestPictureInPicture();
  // reset button
  button.disabled = false;
});

// On load
 selectMediaStream();