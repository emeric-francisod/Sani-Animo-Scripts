let carouselElt = document.getElementById("carousel");
let nextButtonElt = carouselElt.getElementsByClassName("sas-carousel-next-button")[0];
let prevButtonElt = carouselElt.getElementsByClassName("sas-carousel-prev-button")[0];

let carouselObj = new Carousel(carouselElt, nextButtonElt, prevButtonElt);
