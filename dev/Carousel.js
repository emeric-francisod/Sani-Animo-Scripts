function Carousel(carouselElt, imgUrlList = null) {
    this.carouselWrapper = carouselElt;
    this.imageUrlArray = imgUrlList;
    this.cycleListStart = null;
    this.currentElement = null;
    this.imageNumber = 0;
    this.nextButton = null;
    this.previousButton = null;
    this.animationid = null;
    this.lastInsertedIndex = 0;

    this.setImagesUp();
    //this.setAutoRotation();
    this.createNavigation();
}

Carousel.prototype.toString = function() {
    console.log("Affichage du cycle:");
    if (this.cycleListStart === null) {
        return;
    }
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
        if (forward) {
            let currentIndex = loopCurrentElt.index;
            loopCurrentElt.index = indexReminder;
            indexReminder = currentIndex;
            loopCurrentElt.node.dataset.sasCarouselIndex = loopCurrentElt.index;
            loopCurrentElt = loopCurrentElt.next;
        } else {
            let currentIndex = loopCurrentElt.index;
            loopCurrentElt.index = indexReminder;
            indexReminder = currentIndex;
            loopCurrentElt.node.dataset.sasCarouselIndex = loopCurrentElt.index;
            loopCurrentElt = loopCurrentElt.previous;
        }
    } while (loopCurrentElt !== this.cycleListStart);
}

Carousel.prototype.addOpposite = function(imageElement = null) {
    this.toString();
    let newImageElt = null;

    if (imageElement !== null) {
        newImageElt = imageElement;
    } else if (this.imageUrlArray === null || this.imageUrlArray.length === 0) {
        return false;
    } else {
        newImageElt = document.createElement("img");
        newImageElt.setAttribute("src", this.imageUrlArray[0]);
        newImageElt.setAttribute("alt", "Texte");
        this.imageUrlArray.shift();
        this.carouselWrapper.appendChild(newImageElt);
    }


    let newImageObject = {
        node: newImageElt,
        previous: null,
        next: null,
        index: 0
    }

    newImageObject.next = newImageObject;
    newImageObject.previous = newImageObject;

    if (this.cycleListStart === null) {
        this.cycleListStart = newImageObject;
    } else {
        let loopCurrentElt = this.cycleListStart;
        while (loopCurrentElt.next.index % 2 !== 0) {
            loopCurrentElt = loopCurrentElt.next;
        }
        newImageObject.index = this.lastInsertedIndex + 1;
        this.lastInsertedIndex++;
        newImageObject.previous = loopCurrentElt;
        newImageObject.next = loopCurrentElt.next;
        loopCurrentElt.next.previous = newImageObject;
        loopCurrentElt.next = newImageObject;
    }

    newImageObject.node.dataset.sasCarouselIndex = newImageObject.index;

    this.imageNumber++;
    this.toString();
    return true;
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
        //this.setAutoRotation();
    }).bind(this));
    this.previousButton.addEventListener("click", (function(e) {
        e.preventDefault();
        clearInterval(this.animationId);
        this.rotate(false);
        //this.setAutoRotation();
    }).bind(this));

    this.carouselWrapper.appendChild(this.previousButton);
    this.carouselWrapper.appendChild(this.nextButton);
}
