(function() {
    let modalObjects = new Modals();
    let backgroundElt = document.createElement("div");
    let modalTriggerElts = document.getElementsByClassName("modal-trigger");
    let modalCloseButtonElt = document.getElementsByClassName("modal-close-button");
    let contentTabElts = getTabElements(document.getElementById("content"));

    backgroundElt.id = "background";
    document.body.appendChild(backgroundElt);

    for (let i = 0 ; i < modalTriggerElts.length ; i++) {
        let targetElt = document.getElementById(modalTriggerElts[i].dataset.modalTarget);
        let newModal = new Modal(targetElt, modalTriggerElts[i], backgroundElt, contentTabElts);
        let triggerId = modalTriggerElts[i].id;
        modalObjects.push(newModal, triggerId);
        modalTriggerElts[i].addEventListener("click", (function(id, e) {
            this.toggle(triggerId);
        }).bind(modalObjects, triggerId));
    }

    window.addEventListener("keyup", function(e) {
        if (e.key === "Escape") {
            modalObjects.close();
        }
    });

    window.addEventListener("resize", function(e) {
        modalObjects.reset();
    });

    backgroundElt.addEventListener("click", function() {
        modalObjects.close();
    });

    for (let i = 0 ; i < modalCloseButtonElt.length ; i++) {
        modalCloseButtonElt[i].addEventListener("click", function(e) {
            modalObjects.close();
        });
    }
})();
