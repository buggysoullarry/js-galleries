
function next() {
  //get last gallery item copy it and move to the first position
  //get  item with animation
  removeAnimation();
  var gallery = document.querySelector(".gallery");
  var last = document.querySelector(".gallery .gallery_item:last-child");
  last.classList.add("animatedout");
  gallery.insertBefore(last, gallery.firstChild);
}

// function to remove animations of both animatedup and animatedout
function removeAnimation() {
  const animatedup = document.querySelectorAll(".gallery .gallery_item.animatedup");
  //remove animation
  animatedup.forEach(function (item) {
    item.classList.remove("animatedup");
  });
  const animatedout = document.querySelectorAll(".gallery .gallery_item.animatedout");
  //remove animation
  animatedout.forEach(function (item) {
    item.classList.remove("animatedout");
  });
}

function prev() {
  removeAnimation();
  //get first gallery item copy it and move to the last position
  var gallery = document.querySelector(".gallery");

  var first = document.querySelector(".gallery .gallery_item:first-child");
  first.classList.add("animatedup");
  gallery.appendChild(first);
}

//on body load rotate images
function rotateImages() {
  var initialrotation = -30;
  var initialpostion = 30;
  document.querySelectorAll(".gallery .gallery_item").forEach(function (item, index) {
    item.style.transform = "rotate(" + initialrotation + "deg)";
    item.style.setProperty("--rotation", initialrotation + "deg");
    item.style.marginLeft = initialpostion + "px";
    initialrotation += 5;
    initialpostion += 30;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  rotateImages();

  //set on click event for all gallery items
  document.querySelectorAll(".gallery .gallery_item").forEach(function (item, index) {
    item.addEventListener("click", function () {
      //if on top do nothing
      if (item.nextElementSibling == null) {
        return;
      }

      //move the clicked item to the last position
      removeAnimation();
      item.classList.add("animatedup");
      document.querySelector(".gallery").appendChild(item);
    });
  });
});
