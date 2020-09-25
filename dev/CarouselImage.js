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

CarouselImage.prototype.incrementImageIndex = function() {
    this.imageid++;
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

CarouselImage.prototype.draw = function (minId, maxId, nbElements, containerWidth) {
    let elementLevel = 0;
    let absoluteIndex = 0;
    let focusAbsoluteIndex = 0
    let virtualCircleAngle = 0;
    let focusVirtualCircleAngle = 0;
    let focusCos = 1;
    let minDepth = -1000;
    let absoluteMaxTranslation = containerWidth * 0.6 / 2;
    let zIndexValue = 5;
    let zTranslation = 0;
    let xTranslation = 0;
    let opacityLevel = 1;

    if (nbElements > 1) {
        elementLevel = Math.abs(this.index);
        if (Math.abs(minId) === maxId && this.index > 0) {
            elementLevel--;
        }

        zIndexValue = Math.abs(minId) - elementLevel + zIndexValue;


        absoluteIndex = mapInterval(this.index, minId, maxId, 0, nbElements - 1);
        focusAbsoluteIndex = mapInterval(0, minId, maxId, 0, nbElements - 1);
        virtualCircleAngle = (Math.PI * 2 / (nbElements) * absoluteIndex + Math.PI) % (2 * Math.PI);
        focusVirtualCircleAngle = (Math.PI * 2 / (nbElements) * focusAbsoluteIndex + Math.PI) % (2 * Math.PI);
        focusCos = Math.cos(focusVirtualCircleAngle);

        minDepth = - Math.max(Math.ceil(nbElements * 100), minDepth);
        zTranslation = Math.round((mapInterval(Math.cos(virtualCircleAngle), -1, focusCos, minDepth, 0) + Number.EPSILON) * 100) / 100;
        xTranslation = Math.round((mapInterval(Math.sin(virtualCircleAngle), -1, 1, -absoluteMaxTranslation, absoluteMaxTranslation) + Number.EPSILON) * 100) / 100;

        if (elementLevel === 0 && Math.abs(minId) === maxId) {
            xTranslation = xTranslation / Math.abs(xTranslation) * Math.max(Math.abs(xTranslation), this.imageNode.clientWidth / 2 + 16);
        }

        opacityLevel = mapInterval(Math.cos(virtualCircleAngle), -1, focusCos, 0, 1);
    }

    this.domNode.style.zIndex = zIndexValue;
    this.domNode.style.opacity = opacityLevel;
    this.domNode.style.transform = "translate3d(calc(-50% + " + xTranslation + "px), -50%, " + zTranslation + "px)";
}
