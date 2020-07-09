function rotateCarousel(carouselElt, forward = true) {
    let currentImageElt = carouselElt.getElementsByClassName("sas-carousel-current-image");
    for (let i = 0 ; i < currentImageElt.length ; i++) {
        element = currentImageElt[i];
        if (forward) {
            currentImageElt[i].classList.add("sas-carousel-prev-image");
            currentImageElt[i].classList.remove("sas-carousel-current-image");
            if (currentImageElt[i].previousElementSibling !== null) {
                currentImageElt[i].previousElementSibling.classList.add("sas-carousel-prev-hidden");
                currentImageElt[i].previousElementSibling.classList.remove("sas-carousel-prev-image");
            }
            if (currentImageElt[i].nextSibling !== null) {
                currentImageElt[i].nextSibling.classList.add("sas-carousel-current-image");
                currentImageElt[i].nextSibling.classList.remove("sas-carousel-next-image");
                if (currentImageElt[i].nextSibling.nextSibling !== null) {
                    currentImageElt[i].nextSibling.nextSibling.classList.add("sas-carousel-next-image");
                    currentImageElt[i].nextSibling.nextSibling.classList.remove("sas-carousel-next-hidden");
                }
            }
        }
    }
}

let carouselElt = document.getElementById("carousel");
let element;
