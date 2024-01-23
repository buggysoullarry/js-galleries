// images spacing from center of orb
const GalleryMargins = 20;

// Function to calculate new positions for images
function NewXYPositions(imageHeight, imageWidth, containerWidth, containerHeight, angle) {
  const x = containerWidth / 2 + (containerWidth / 2 - GalleryMargins) * Math.cos(angle) - imageWidth / 2;
  const y = containerHeight / 2 + (containerHeight / 2 - GalleryMargins) * Math.sin(angle) - imageHeight / 2;
  return { x, y };
}

// Function to reset the active image
function resetActiveImage(containerDiv) {
  const images = $(containerDiv).children(".gallery_img");

  // Reset active image
  images.each(function () {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");

      // Animate the image back to its old position
      $(this).animate(
        {
          left: $(this).data("oldLeft"),
          top: $(this).data("oldTop"),
          height: $(this).data("oldHeight") + "px",
        },
        500
      );
    }
  });
}

// Function to set up image click event
function setupImageClick() {
  const images = $(".gallery").children(".gallery_img");
  const newSizePercent = 80;

  images.on("click", function () {
    if ($(this).hasClass("active")) return; // If active is clicked on return

    const container = $(this).parent(); // Get parent div (in case of multiple galleries)
    resetActiveImage(container); // Reset active image

    // Calculate the center of the container
    const containerCenterX = container.width() / 2;
    const containerCenterY = container.height() / 2;

    const newSizeHeight = container.height() * (newSizePercent / 100);
    const newSizeWidth = container.width() * (newSizePercent / 100);

    // Calculate the destination position for the image
    const destinationX = containerCenterX - newSizeWidth / 2;
    const destinationY = containerCenterY - newSizeHeight / 2;

    $(this).toggleClass("active"); // Toggle active class

    // Save old position to data
    if ($(this).hasClass("active")) {
      $(this).data("oldLeft", $(this).css("left"));
      $(this).data("oldTop", $(this).css("top"));
      $(this).data("oldHeight", $(this).height());
    }

    // Animate the image to the center of the container
    $(this).animate(
      {
        left: destinationX + "px",
        top: destinationY + "px",
        height: newSizePercent + "%",
      },
      600
    );
  });
}

// Function to position images in a circle
function positionImagesInCircle() {
  $(".gallery").each(function () {
    const container = $(this);
    const images = container.children(".gallery_img");

    const containerWidth = container.width();
    const containerHeight = container.height();
    let angle = 0;
    const step = (2 * Math.PI) / images.length;

    images.each(function () {
      $(this).css("background-image", "url(" + $(this).data("bg") + ")"); // Set background url to data-bg

      if ($(this).hasClass("active")) resetActiveImage(container); // Reset active image

      const { x, y } = NewXYPositions($(this).height(), $(this).width(), containerWidth, containerHeight, angle);
      $(this).css({ left: x + "px", top: y + "px" }); // Set new position
      angle += step;
    });
  });
}

$(document).ready(function () {
  let currentHoveredGallery = null;

  positionImagesInCircle(); // Position images in a circle
  $(window).resize(positionImagesInCircle); // Adjust position when window is resized
  setupImageClick(); // Set up image click event

  // Set up hover events for multiple galleries
  $(".gallery").hover(
    function () {
      currentHoveredGallery = this; // Mouse enters a modal
    },
    function () {
      currentHoveredGallery = null; // Mouse leaves the modal
    }
  );

  // Set up escape key event
  $(document).on("keydown", function (event) {
    if (event.key === "Escape" && currentHoveredGallery) {
      resetActiveImage($(currentHoveredGallery)); // Reset active image
    }
  });
});
