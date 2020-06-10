(function() {
    let popinObjects = [];
    let backgroundElt = document.getElementById("background");
    let popinTriggerElts = document.getElementsByClassName("popin-trigger");
    let contentTabElts = getTabElements(document.getElementById("content"));

    for (let i = 0 ; i < popinTriggerElts.length ; i++) {
        let targetElt = document.getElementById(popinTriggerElts[i].dataset.popinTarget);
        popinObjects.push(new Popin(targetElt, popinTriggerElts[i], backgroundElt, contentTabElts));
    }

    console.log(popinObjects);
})();
