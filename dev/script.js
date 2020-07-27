let carouselElt = document.getElementById("carousel");

let imageUrlArray = [];
let i = 1;
let min = 15;

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
