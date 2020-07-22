/*
 * Structure de l'objet contenant les urls: tableau d'objets:
 *  url
 *  texte alternatif
 *  lien vers lequel pointer
 */

function Carousel(carouselElt, imgUrlList = null) {
    this.carouselWrapper = carouselElt;
    this.imageUrlArray = imgUrlList;
    this.displayedImages = [];
    this.imageNumber = this.imageUrlArray.length;
    this.nextButton = null;
    this.previousButton = null;
    this.animationid = null;
    this.rotating = false;
    this.visibleImageNumber = 3;

    this.setup();
    this.setAutoRotation();
    this.createNavigation();
}

Carousel.prototype.toString = function() {

}

Carousel.prototype.rotate = function(forward = true) {
    this.rotating = true;

    if (forward) {
        let lastIndex = this.displayedImages.length - 1;
        this.displayedImages.push(this.displayedImages.shift());
        this.displayedImages.map(function (obj) {
            obj.setIndex(obj.getIndex() - 1);
        });
        this.displayedImages[lastIndex].setIndex(this.displayedImages[lastIndex - 1].getIndex() + 1);
    } else {
        this.displayedImages.unshift(this.displayedImages.pop());
        this.displayedImages.map(function(obj) {
            obj.setIndex(obj.getIndex() + 1);
        });
        this.displayedImages[0].setIndex(this.displayedImages[1].getIndex() - 1);
    }

    setTimeout((function() {
        this.rotating = false;
    }).bind(this), 350);
}

Carousel.prototype.addImage = function(imgObj) {

}

Carousel.prototype.setup = function() {
    let imgUrlArrayId = (this.imageUrlArray.length > 0) ? 0 : null;
    for (let i = 0 ; i < this.visibleImageNumber + 2 ; i++) {
        let newImageElement = new CarouselImage();
        this.carouselWrapper.appendChild(newImageElement.getDomNode());
        newImageElement.setIndex(this.calculateIndex(i));
        if (imgUrlArrayId !== null) {
            newImageElement.changeImage(this.imageUrlArray[imgUrlArrayId++], imgUrlArrayId);
            if (imgUrlArrayId >= this.imageUrlArray.length) {
                imgUrlArrayId = 0;
            }
        }
        this.displayedImages.push(newImageElement);
    }
}

Carousel.prototype.calculateIndex = function(intArrayIndex) {
    intArrayIndex = intArrayIndex % (this.visibleImageNumber + 2);
    return -(Math.floor((this.visibleImageNumber + 2) / 2)) + intArrayIndex;
}

Carousel.prototype.setAutoRotation = function() {
    this.animationId = setInterval(this.rotate.bind(this), 4000);
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
        if (!this.rotating) {
            clearInterval(this.animationId);
            this.rotate(true);
            this.setAutoRotation();
        }
    }).bind(this));
    this.previousButton.addEventListener("click", (function(e) {
        e.preventDefault();
        if (!this.rotating) {
            clearInterval(this.animationId);
            this.rotate(false);
            this.setAutoRotation();
        }
    }).bind(this));

    this.carouselWrapper.appendChild(this.previousButton);
    this.carouselWrapper.appendChild(this.nextButton);
}
