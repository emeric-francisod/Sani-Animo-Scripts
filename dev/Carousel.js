function Carousel(carouselElt, imgUrlList = null) {
    this.carouselElt = carouselElt;
    this.nextButton = null;
    this.previousButton = null;
    this.imagesArray = [];
    this.imagesUrls = imgUrlList;
    this.imageNumber = 0;
    this.animationId = null;

    this.setImagesUp();

    this.updateIndex();

    if (this.imageNumber > 1) {
        this.createNavigation();
    }

    if (this.imageNumber > 4) {
        //this.setAutoRotation();
    }
}

Carousel.prototype.updateIndex = function() {
    for (let i = 0 ; i < this.imageNumber ; i++) {
        this.imagesArray[i].dataset.sasCarouselIndex = i - Math.floor(this.imageNumber / 2);
    }
}

Carousel.prototype.rotateCarousel = function (forward = true) {
    if (this.addImage(forward)) {
        this.updateIndex();
    } else if (this.imageNumber > 4) {
        clearInterval(this.animationId);

        if (forward) {
            this.imagesArray.push(this.imagesArray.shift());
        } else {
            this.imagesArray.unshift(this.imagesArray.pop());
        }

        this.updateIndex();
        //this.setAutoRotation();

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

Carousel.prototype.setImagesUp = function() {
    if (this.imagesUrls !== null) {
        this.imageNumber = (10 <= this.imagesUrls.length) ? 10 : this.imagesUrls.length;

        for (let i = 0 ; i < this.imageNumber ; i++) {
            let imageElt = document.createElement("img");
            imageElt.setAttribute("src", this.imagesUrls[0]);
            imageElt.setAttribute("alt", "du texte");
            this.carouselElt.appendChild(imageElt);
            this.imagesArray.push(imageElt);
            this.imagesUrls.shift();
        }
    } else {
        let imageElts = this.carouselElt.getElementsByTagName("img");
        this.imageNumber = imageElts.length;

        for (let i = 0 ; i < this.imageNumber ; i++) {
            this.imagesArray.push(imageElts[i]);
        }
    }
}

Carousel.prototype.addImage = function(forward = true, imageElt = null) {
    let newImageElt = null;

    if (imageElt !== null) {
        newImageElt = imageElt;
    } else if (this.imagesUrls === null || this.imagesUrls.length === 0) {
        return false;
    } else {
        newImageElt = document.createElement("img");
        newImageElt.setAttribute("src", this.imagesUrls[0]);
        newImageElt.setAttribute("alt", "du texte");
        this.imagesUrls.shift();
    }
    this.carouselElt.appendChild(newImageElt);

    if (forward) {
        this.imagesArray.push(newImageElt);
    } else {
        this.imagesArray.unshift(newImageElt);
    }

    this.imageNumber++;
    return true;
}
