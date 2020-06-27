function callback(jsonString) {
    let datas = JSON.parse(jsonString);

    let wrapperElt = document.getElementById("result");

    let pElt = document.createElement("p");
    pElt.innerText = datas.name;

    wrapperElt.appendChild(pElt);
}

let POSTurl = "post.php";
let GETurl = "get.php";
let buttonElt = document.getElementById("button");
let formElt = document.getElementById("form");

formElt.addEventListener("submit", function(e) {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    ajaxPost(POSTurl, data, callback, false);
});

buttonElt.addEventListener("click", function() {
    ajaxGet(GETurl, callback);
});
