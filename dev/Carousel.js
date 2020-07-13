function Carousel(carouselElt, nextButton, previousButton) {
    this.carouselElt = carouselElt;
    this.nextButton = nextButton;
    this.previousButton = previousButton;
    this.imagesArray = [];
    this.imageNumber = 0;

    let imageElts = this.carouselElt.getElementsByTagName("img");
    this.imageNumber = imageElts.length;

    for (let i = 0 ; i < this.imageNumber ; i++) {
        this.imagesArray.push(imageElts[i]);
    }

    this.updateIndex();

    this.nextButton.addEventListener("click", (function() {
        this.rotateCarousel(true);
    }).bind(this));
    this.previousButton.addEventListener("click", (function() {
        this.rotateCarousel(false);
    }).bind(this));
}

Carousel.prototype.updateIndex = function() {
    for (let i = 0 ; i < this.imageNumber ; i++) {
        this.imagesArray[i].dataset.sasCarouselIndex = i - Math.floor(this.imageNumber / 2);
    }
}

Carousel.prototype.rotateCarousel = function (forward = true) {
    if (forward) {
        this.imagesArray.push(this.imagesArray.shift());
    } else {
        this.imagesArray.unshift(this.imagesArray.pop());
    }

    this.updateIndex();
}
