let carouselElt = document.getElementById("carousel");

let imageUrlArray = [];

for (let i = 1 ; i <= 15 ; i++) {
    let imageUrlObject = {
        url: "img/" + i + ".jpg",
        alt: "Image " + i,
        redirection : "#"
    };
    imageUrlArray.push(imageUrlObject);
}


let carouselObj = new Carousel(carouselElt, imageUrlArray);

/*
let carousel2Elt = document.getElementById("carousel2");
let carousel2Obj = new Carousel(carousel2Elt);

 */
