function initializeCarousel(carouselElt, imagesArray) {
    let imagesElts = carouselElt.getElementsByTagName("img");
    let imagesNb = imagesElts.length;

    for (let i = 0 ; i < imagesNb ; i++) {
        imagesArray.push(imagesElts[i]);
    }

    updateIndex(imagesArray);
}

function updateIndex(imagesArray) {
    let imagesNb = imagesArray.length;

    for (let i = 0 ; i < imagesNb ; i++) {
        imagesArray[i].dataset.sasCarouselIndex = i - Math.floor(imagesNb / 2);
    }
}

function rotateCarousel(carouselImages, forward = true) {
    if (forward) {
        carouselImages.push(carouselImages.shift());
    } else {
        carouselImages.unshift(carouselImages.pop());
    }

    updateIndex(carouselImages);
}

let carouselElt = document.getElementById("carousel");
let nextButtonElt = carouselElt.getElementsByClassName("sas-carousel-next-button")[0];
let prevButtonElt = carouselElt.getElementsByClassName("sas-carousel-prev-button")[0];

let images = new Array();
initializeCarousel(carouselElt, images);

nextButtonElt.addEventListener("click", function(e) {
    rotateCarousel(images, true);
});

prevButtonElt.addEventListener("click", function(e) {
    rotateCarousel(images, false);
});
