(function() {
    let popinObjects = new Popins();
    let backgroundElt = document.getElementById("background");
    let popinTriggerElts = document.getElementsByClassName("popin-trigger");
    let contentTabElts = getTabElements(document.getElementById("content"));

    for (let i = 0 ; i < popinTriggerElts.length ; i++) {
        let targetElt = document.getElementById(popinTriggerElts[i].dataset.popinTarget);
        let newPopin = new Popin(targetElt, popinTriggerElts[i], backgroundElt, contentTabElts);
        let triggerId = popinTriggerElts[i].id;
        popinObjects.push(newPopin, triggerId);
        popinTriggerElts[i].addEventListener("click", (function(id, e) {
            this.toggle(triggerId);
        }).bind(popinObjects, triggerId));
    }

    window.addEventListener("keyup", function(e) {
        if (e.key === "Escape") {
            popinObjects.close();
        }
    });

    window.addEventListener("resize", function(e) {
        popinObjects.reset();
    });

    backgroundElt.addEventListener("click", function() {
        popinObjects.close();
    });
})();
