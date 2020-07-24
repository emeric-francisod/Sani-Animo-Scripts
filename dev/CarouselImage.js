function CarouselImage(linkNode) {
    this.domNode = null;
    this.imageNode = null;
    this.index = null;
    this.imageid = null;


    if (linkNode instanceof HTMLAnchorElement) {
        this.domNode = linkNode;
        this.imageNode = this.domNode.getElementsByTagName("img")[0];
        if (this.imageNode === undefined) {
            this.imageNode = document.createElement("img");
            this.domNode.appendChild(this.imageNode);
        }
    } else {
        this.domNode = document.createElement("a");
        this.imageNode = document.createElement("img");
        this.domNode.appendChild(this.imageNode);
    }

    this.domNode.classList.add("sas-carousel-image-link");
}

CarouselImage.prototype.setIndex = function (id) {
    this.index = id;
    this.domNode.dataset.sasCarouselIndex = this.index;
}

CarouselImage.prototype.getIndex = function () {
    return this.index;
}

CarouselImage.prototype.getImageIndex = function () {
    return this.imageid;
}

CarouselImage.prototype.changeImage = function (imgObj, imgObjId) {
    this.imageNode.src = imgObj.url;
    this.imageNode.alt = imgObj.alt;
    if (imgObj.hasOwnProperty("redirection")) {
        this.domNode.href = imgObj.redirection;
    } else {
        this.domNode.href = "";
    }
    this.imageid = imgObjId;
}

CarouselImage.prototype.getDomNode = function () {
    return this.domNode;
}
