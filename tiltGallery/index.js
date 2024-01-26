// make sure the gallery isn't too wide for amount of images
document.addEventListener("DOMContentLoaded", function () {
  //count the number of images in the gallery
  var count = document.getElementsByClassName("tilt-gallery-item").length;
  // tilt-gallery-container max width is count /2 * 200px

  //set the width of the container
  var container = document.getElementsByClassName("tilt-gallery-container")[0];
  if (container) container.style.maxWidth = (count / 2) * 200 + "px";

  // setup some common lightbox options
  lightbox.option({
    resizeDuration: 300,
    wrapAround: true,
    fadeDuration: 200,
    imageFadeDuration: 200,
    positionFromTop: 100,
    disableScrolling: true,
    alwaysShowNavOnTouchDevices: true,
    disableScrolling: true,
    fitImagesInViewport: true,
    maxWidth: 1000,
    maxHeight: 1000,
    showImageNumberLabel: false,
  });
});
