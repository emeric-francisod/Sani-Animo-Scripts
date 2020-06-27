function callback(jsonString) {
    let datas = JSON.parse(jsonString);

    let wrapperElt = document.getElementById("result");

    let pElt = document.createElement("p");
    pElt.innerText = datas.name;

    wrapperElt.appendChild(pElt);
}

let POSTurl = post.php;
let formElt = document.getElementById("form");

formElt.addEventListener("submit", function(e) {
    e.preventDefault();
    let formData = new formData(e.currentTarget);
    ajaxPost(POSTurl, formData, callback, false);
});
