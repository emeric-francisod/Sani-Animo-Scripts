function CarouselImage() {
    this.domNode = null;
    this.imageNode = null;
    this.index = null;
}

CarouselImage.prototype.setIndex = (id) {
    this.index = id;
    this.domNode.dataSet.sasCarouselIndex = this.index;
}

CarouselImage.prototype.changeImage = (imgObj) {

}
