/*
 * Structure de l'objet contenant les urls: tableau d'objets:
 *  url
 *  texte alternatif
 *  lien vers lequel pointer
 */

function Carousel(carouselElt, imgUrlList = null) {
    this.carouselWrapper = carouselElt;
    this.imageUrlArray = imgUrlList;
    this.cycleListStart = null;
    this.currentElement = null;
    this.imageNumber = 0;
    this.nextButton = null;
    this.previousButton = null;
    this.animationid = null;

    this.setImagesUp();
    this.setAutoRotation();
    this.createNavigation();
}

Carousel.prototype.toString = function() {
    if (this.cycleListStart === null) {
        return;
    }
    console.log("Affichage du cycle:");
    let currentLoopElement = this.cycleListStart;
    do {
        console.log(currentLoopElement);
        currentLoopElement = currentLoopElement.next;
    } while (currentLoopElement !== this.cycleListStart);
    console.log("Fin du cycle.");
}

Carousel.prototype.rotate = function(forward = true) {
    this.addOpposite();
    let loopCurrentElt = this.cycleListStart;
    let indexReminder = (forward) ? loopCurrentElt.previous.index : loopCurrentElt.next.index;

    do {
        let currentIndex = loopCurrentElt.index;
        loopCurrentElt.index = indexReminder;
        indexReminder = currentIndex;
        loopCurrentElt.node.dataset.sasCarouselIndex = loopCurrentElt.index;
        if (loopCurrentElt.index === 0) {
            this.currentElement = loopCurrentElt;
        }
        if (forward) {
            loopCurrentElt = loopCurrentElt.next;
        } else {
            loopCurrentElt = loopCurrentElt.previous;
        }
    } while (loopCurrentElt !== this.cycleListStart);
}

Carousel.prototype.fetchImage = function() {
    let imageLinkElt = document.createElement("a");
    imageLinkElt.classList.add("sas-carousel-image-link");
    let newImageElt = document.createElement("img");
    let imageObject = this.imageUrlArray.shift();

    if (imageObject !== undefined && imageObject.hasOwnProperty("url") && imageObject.url !== null && imageObject.hasOwnProperty("alt")) {
        newImageElt.src = imageObject.url;
        newImageElt.alt = imageObject.alt;
        if (imageObject.hasOwnProperty("redirection") && imageObject.redirection !== null) {
            imageLinkElt.href = imageObject.redirection;
        }
        imageLinkElt.appendChild(newImageElt);
        return imageLinkElt;
    } else {
        return false;
    }

}

Carousel.prototype.addOpposite = function() {
    let newImageElt = this.fetchImage();

    if (newImageElt !== false) {
        this.carouselWrapper.appendChild(newImageElt);

        let newImageObject = {
            node: newImageElt,
            previous: null,
            next: null,
            index: null
        }

        newImageObject.next = newImageObject;
        newImageObject.previous = newImageObject;

        if (this.cycleListStart === null) {
            this.cycleListStart = newImageObject;
            newImageObject.index = 0;
            this.currentElement = this.cycleListStart;
        } else {
            let loopCurrentElt = this.currentElement;
            while (loopCurrentElt.next.index % 2 !== 0) {
                loopCurrentElt = loopCurrentElt.next;
            }
            newImageObject.previous = loopCurrentElt;
            newImageObject.next = loopCurrentElt.next;
            loopCurrentElt.next.previous = newImageObject;
            loopCurrentElt.next = newImageObject;

            newImageObject.index = (newImageObject.next.index < newImageObject.previous.index) ? newImageObject.previous.index + 1 : newImageObject.next.index + 1;
        }

        newImageObject.node.dataset.sasCarouselIndex = newImageObject.index;

        this.imageNumber++;
        return true;
    } else {
        return false;
    }

}

Carousel.prototype.setImagesUp = function() {
    if (this.imageUrlArray !== null) {
        let maxNumber = (10 <= this.imageUrlArray.length) ? 10 : this.imageUrlArray.length;

        for (let i = 0 ; i < maxNumber ; i++) {
            this.addOpposite();
        }
    } else {
        let imageElts = this.carouselWrapper.getElementsByTagName("img");
        let number = imageElts.length;

        for (let i = 0 ; i < number ; i++) {
            this.addOpposite(imageElts[i]);
        }
    }
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
        clearInterval(this.animationId);
        this.rotate(true);
        this.setAutoRotation();
    }).bind(this));
    this.previousButton.addEventListener("click", (function(e) {
        e.preventDefault();
        clearInterval(this.animationId);
        this.rotate(false);
        this.setAutoRotation();
    }).bind(this));

    this.carouselWrapper.appendChild(this.previousButton);
    this.carouselWrapper.appendChild(this.nextButton);
}
