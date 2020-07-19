function CarouselImage(linkNode) {
    this.domNode = linkNode;
    this.imageNode = this.domNode.getElementsByTagName("img")[0];
    this.index = null;
}

CarouselImage.prototype.setIndex = function (id) {
    this.index = id;
    this.domNode.dataSet.sasCarouselIndex = this.index;
}

CarouselImage.prototype.changeImage = function (imgObj) {

}
