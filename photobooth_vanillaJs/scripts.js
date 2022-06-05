const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");
let filter = "none";

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((localMediaStream) => {
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("frustrating", err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
  }, 16);
}

function takePhoto() {
  // playing capturing sound
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  canvas.style.filter = filter;
  link.href = data;
  let s = "download" + Math.random() * 1000;
  link.setAttribute("download", s);
  link.innerHTML = `<img src="${data}" style="filter:${filter}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

getVideo();
photoFilter.addEventListener("change", function (e) {
  filter = e.target.value;
  video.style.filter = filter;
  canvas.style.filter = filter;

  e.preventDefault();
});
clearButton.addEventListener("click", function (e) {
  strip.innerHTML = "";
  filter = "none";
  video.style.filter = filter;
  canvas.style.filter = filter;
  photoFilter.selectedIndex = 0;
});

video.addEventListener("canplay", paintToCanvas);
