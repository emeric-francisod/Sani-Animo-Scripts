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
    /* this.cycleListStart = null;
    this.currentElement = null;
    this.oppositeElement = null; */
    this.imageNumber = this.imageUrlArray.length;
    this.nextButton = null;
    this.previousButton = null;
    this.animationid = null;
    this.rotating = false;

    this.setImagesUp();
    this.setAutoRotation();
    this.createNavigation();
}

Carousel.prototype.toString = function() {
    
}

Carousel.prototype.rotate = function(forward = true) {
    this.rotating = true;



    setTimeout((function() {
        this.rotating = false;
    }).bind(this), 350);
}

Carousel.prototype.addImage = function(imgObj) {

}

Carousel.prototype.setup = function() {

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
