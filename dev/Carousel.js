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

Carousel.prototype.toString = function(extended = true) {
    console.log("Images affichées: ");
    if (extended) {
        for (let i = 0 ; i < this.displayedImages.length ; i++) {
            console.log("Image " + this.displayedImages[i].getIndex());
            console.log("Elément du DOM:");
            console.log(this.displayedImages[i].domNode);
            console.log("Elément image (n°" + this.displayedImages[i].getImageIndex() + "):");
            console.log(this.imageUrlArray[this.displayedImages[i].getImageIndex()]);
        }
    } else {
        for (let i = 0 ; i < this.displayedImages.length ; i++) {
            let str = "Image carousel n°" + this.displayedImages[i].getIndex() + " : ";
            str += "image d'id " + this.displayedImages[i].getImageIndex() + ".";
            console.log(str);
        }
    }
    console.log("");
    console.log("---------------------------------");
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
        let newImageIndex = this.displayedImages[lastIndex - 1].getImageIndex() + 1;
        if (newImageIndex >= this.imageUrlArray.length) {
            newImageIndex = 0;
        }
        this.displayedImages[lastIndex].changeImage(this.imageUrlArray[newImageIndex], newImageIndex);
    } else {
        this.displayedImages.unshift(this.displayedImages.pop());
        this.displayedImages.map(function(obj) {
            obj.setIndex(obj.getIndex() + 1);
        });
        this.displayedImages[0].setIndex(this.displayedImages[1].getIndex() - 1);
        let newImageIndex = this.displayedImages[1].getImageIndex() - 1;
        if (newImageIndex < 0) {
            newImageIndex = this.imageUrlArray.length - 1;
        }
        this.displayedImages[0].changeImage(this.imageUrlArray[newImageIndex], newImageIndex);
    }

    setTimeout((function() {
        this.rotating = false;
    }).bind(this), 350);
}

Carousel.prototype.addImage = function(imgObj) {
    if (this.testImageObject(imgObj)) {
        if (this.displayedImages[0].getImageIndex() > this.displayedImages[this.displayedImages.length - 1].getImageIndex()) {
            this.imageUrlArray.splice(this.displayedImages[this.displayedImages.length - 1].getImageIndex() + 1, 0, imgObj);
        } else {
            this.imageUrlArray.push(imgObj);
        }
        console.log(this.imageUrlArray);
        return true;
    } else {
        console.error("L'objet image à ajouter ne possède pas la bonne structure.");
        return false;
    }
}

Carousel.prototype.testImageObject = function (imgObj) {
    if (
        imgObj !== undefined
        && imgObj.hasOwnProperty("url") && imgObj.url != "" && imgObj.url != null
        && imgObj.hasOwnProperty("alt")
    ) {
        return true;
    } else {
        return false;
    }
}

Carousel.prototype.testImageUrlObject = function() {
    for (let i = 0 ; i < this.imageUrlArray.length ; i++) {
        if (!this.testImageObject(this.imageUrlArray[i])) {
            this.imageUrlArray.splice(i, 1);
            i--;
        }
    }
    if (this.imageUrlArray.length === 0) {
        console.error("L'array des objets image ne contient aucun objet valide.")
        return false;
    } else {
        return true;
    }
}

Carousel.prototype.setup = function() {
    console.log(this.imageUrlArray);
    let imgUrlArrayId = (this.testImageUrlObject()) ? 0 : null;
    for (let i = 0 ; i < this.visibleImageNumber + 2 ; i++) {
        let newImageElement = new CarouselImage();
        this.carouselWrapper.appendChild(newImageElement.getDomNode());
        newImageElement.setIndex(this.calculateIndex(i));
        if (imgUrlArrayId !== null) {
            newImageElement.changeImage(this.imageUrlArray[imgUrlArrayId], imgUrlArrayId);
            imgUrlArrayId++;
            if (imgUrlArrayId >= this.imageUrlArray.length) {
                imgUrlArrayId = 0;
            }
        }
        this.displayedImages.push(newImageElement);
    }
    console.log(this.imageUrlArray);
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
