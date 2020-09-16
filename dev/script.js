function mapInterval (value, start1, stop1, start2, stop2) {
    if (stop1 - start1 === 0) {
        return false;
    }
    return (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
}



let carouselElt = document.getElementById("carousel");

let imageUrlArray = [];
let i = 1;
let min = 0;

for (i ; i <= min ; i++) {
    let imageUrlObject = {
        url: "img/" + i + ".jpg",
        alt: "Image " + i,
        redirection : "#"
    };
    imageUrlArray.push(imageUrlObject);
}


let carouselObj = new Carousel(carouselElt, imageUrlArray);

document.getElementById("add-image").addEventListener("click", function(e) {
    let newImage = {
        url: "img/" + i + ".jpg",
        alt: "Image " + i,
        redirection: "youtube.com"
    };
    i++;
    carouselObj.addImage(newImage);
});

window.addEventListener("resize", function(e) {
    carouselObj.resize();
});
