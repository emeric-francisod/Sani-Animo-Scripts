function rotateCarousel(carouselElt, forward = true) {
    let currentImageElts = carouselElt.getElementsByClassName("sas-carousel-current-image");
    for (let i = 0 ; i < currentImageElts.length ; i++) {
        let currentImage = currentImageElts[i];
        if (forward) {
            currentImage.classList.remove("sas-carousel-current-image");
            currentImage.classList.add("sas-carousel-prev-image");
            if (currentImage.previousElementSibling !== null) {
                currentImage.previousElementSibling.classList.remove("sas-carousel-prev-image");
                currentImage.previousElementSibling.classList.add("sas-carousel-prev-hidden");
            }
            if (currentImage.nextElementSibling !== null) {
                currentImage.nextElementSibling.classList.remove("sas-carousel-next-image");
                currentImage.nextElementSibling.classList.add("sas-carousel-current-image");
                if (currentImage.nextElementSibling.nextElementSibling !== null) {
                    currentImage.nextElementSibling.nextElementSibling.classList.remove("sas-carousel-next-hidden");
                    currentImage.nextElementSibling.nextElementSibling.classList.add("sas-carousel-next-image");
                }
            }
        } else {
            currentImage.classList.remove("sas-carousel-current-image");
            currentImage.classList.add("sas-carousel-next-image");
            if (currentImage.nextElementSibling !== null) {
                currentImage.nextElementSibling.classList.remove("sas-carousel-next-image");
                currentImage.nextElementSibling.classList.add("sas-carousel-next-hidden");
            }
            if (currentImage.previousElementSibling !== null) {
                currentImage.previousElementSibling.classList.remove("sas-carousel-prev-image");
                currentImage.previousElementSibling.classList.add("sas-carousel-current-image");
                if (currentImage.previousElementSibling.previousElementSibling !== null) {
                    currentImage.previousElementSibling.previousElementSibling.classList.remove("sas-carousel-prev-hidden");
                    currentImage.previousElementSibling.previousElementSibling.classList.add("sas-carousel-prev-image");
                }
            }
        }
    }
}

let carouselElt = document.getElementById("carousel");
