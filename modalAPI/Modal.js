function Modal(targetElt, triggerElt, backgroundElt, contentTabElts) {
    this.targetElt = targetElt;
    this.triggerElt = triggerElt;
    this.backgroundElt = backgroundElt;
    this.contentTabElts = contentTabElts;
    this.modalTabElts = getTabElements(this.targetElt);
    this.opened = false;
}

Modal.prototype.open = function() {
    if (!this.opened) {
        this.targetElt.classList.add("opened");
        this.targetElt.classList.remove("closed");
        this.triggerElt.classList.add("target-opened");
        this.triggerElt.classList.remove("target-closed");
        document.body.classList.add("modal-opened");
        removeTabNavigation(this.contentTabElts);
        giveTabNavigation(this.modalTabElts);
        this.opened = true;
    }
}

Modal.prototype.close = function() {
    if (this.opened) {
        this.targetElt.classList.remove("opened");
        this.targetElt.classList.add("closed");
        this.triggerElt.classList.remove("target-opened");
        this.triggerElt.classList.add("target-closed");
        document.body.classList.remove("modal-opened");
        giveTabNavigation(this.contentTabElts);
        removeTabNavigation(this.modalTabElts);
        this.opened = false;
    }
}

Modal.prototype.toggle = function() {
    if (this.opened) {
        this.close();
    } else {
        this.open();
    }
}

Modal.prototype.reset = function() {
    this.close();
    this.targetElt.classList.remove("closed");
    this.triggerElt.classList.remove("target-closed");
}
