function Carousel(carouselElt) {
    this.carouselElt = carouselElt;
    this.nextButton = null;
    this.previousButton = null;
    this.imagesArray = [];
    this.imageNumber = 0;
    this.animationId = null;

    let imageElts = this.carouselElt.getElementsByTagName("img");
    this.imageNumber = imageElts.length;

    for (let i = 0 ; i < this.imageNumber ; i++) {
        this.imagesArray.push(imageElts[i]);
    }

    this.updateIndex();

    if (this.imageNumber > 1) {
        this.createNavigation();
    }

    if (this.imageNumber > 3) {
        this.setAutoRotation();
    }
}

Carousel.prototype.updateIndex = function() {
    for (let i = 0 ; i < this.imageNumber ; i++) {
        this.imagesArray[i].dataset.sasCarouselIndex = i - Math.floor(this.imageNumber / 2);
    }
}

Carousel.prototype.rotateCarousel = function (forward = true) {
    if (this.imageNumber > 3) {
        clearInterval(this.animationId);

        if (forward) {
            this.imagesArray.push(this.imagesArray.shift());
        } else {
            this.imagesArray.unshift(this.imagesArray.pop());
        }

        this.updateIndex();
        this.setAutoRotation();
    } else {
        if (forward && this.imagesArray[this.imageNumber - 1].dataset.sasCarouselIndex !== "0") {
            for (let i = 0 ; i < this.imageNumber ; i++) {
                this.imagesArray[i].dataset.sasCarouselIndex = parseInt(this.imagesArray[i].dataset.sasCarouselIndex) - 1;
            }
        } else if (!forward && this.imagesArray[0].dataset.sasCarouselIndex !== "0") {
            for (let i = 0 ; i < this.imageNumber ; i++) {
                this.imagesArray[i].dataset.sasCarouselIndex = parseInt(this.imagesArray[i].dataset.sasCarouselIndex) + 1;
            }
        }
    }
}

Carousel.prototype.setAutoRotation = function() {
    this.animationId = setInterval(this.rotateCarousel.bind(this), 4000);
}

Carousel.prototype.createNavigation = function() {
    this.nextButton = document.createElement("a");
    this.previousButton = document.createElement("a");

    this.nextButton.setAttribute("href", "#");
    this.previousButton.setAttribute("href", "#");

    this.nextButton.setAttribute("title", "Image Suivante");
    this.previousButton.setAttribute("title", "Image précédente");

    this.nextButton.classList.add("sas-carousel-next-button");
    this.previousButton.classList.add("sas-carousel-prev-button");

    this.nextButton.addEventListener("click", (function(e) {
        e.preventDefault();
        this.rotateCarousel(true);
    }).bind(this));
    this.previousButton.addEventListener("click", (function(e) {
        e.preventDefault();
        this.rotateCarousel(false);
    }).bind(this));

    this.carouselElt.appendChild(this.previousButton);
    this.carouselElt.appendChild(this.nextButton);
}
