let carouselElt = document.getElementById("carousel");

let imageUrlArray = [];
let i = 1;

for (i ; i <= 15 ; i++) {
    let imageUrlObject = {
        url: "img/" + i + ".jpg",
        alt: "Image " + i,
        redirection : "#"
    };
    if (i % 4 === 0) {
        imageUrlObject.url = null;
    }
    imageUrlArray.push(imageUrlObject);
}


let carouselObj = new Carousel(carouselElt, imageUrlArray);

document.getElementById("add-image").addEventListener("click", function(e) {
    let newImage = {
        url: "img/" + i + ".jpg",
        alt: "Image " + i,
        redirection: "youtube.com"
    };
    if (i % 4 === 0) {
        newImage.url = "";
    }
    i++;
    carouselObj.addImage(newImage);
});

/*
let carousel2Elt = document.getElementById("carousel2");
let carousel2Obj = new Carousel(carousel2Elt);

 */
