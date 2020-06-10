function Popin(targetElt, triggerElt, bacgroundElt, contentTabElts) {
    this.targetElt = targetElt;
    this.triggerElt = triggerElt;
    this.backgroundElt = backgroundElt;
    this.contentTabElts = contentTabElts;
    this.popinTabElts = getTabElements(this.targetElt);
}

Popin.prototype.open = function() {
    if (!this.targetElt.classList.contains("opened")) {
        this.targetElt.classList.add("opened");
        this.targetElt.classList.remove("closed");
        this.triggerElt.classList.add("target-opened");
        this.triggerElt.classList.remove("target-closed");
        document.body.classList.add("popin-opened");
        removeTabNavigation(this.contentTabElts);
        giveTabNavigation(this.popinTabElts);
    }
}

Popin.prototype.close = function() {
    if (this.targetElt.classList.contains("opened")) {
        this.targetElt.classList.remove("opened");
        this.targetElt.classList.add("closed");
        this.triggerElt.classList.remove("target-opened");
        this.triggerElt.classList.add("target-closed");
        document.body.classList.remove("popin-opened");
        giveTabNavigation(this.contentTabElts);
        removeTabNavigation(this.popinTabElts);
    }
}

Popin.prototype.toggle = function() {
    if (this.targetElt.classList.contains("opened")) {
        this.close();
    } else {
        this.open();
    }
}

Popin.prototype.reset = function() {
    this.close();
    this.targetElt.classList.remove("closed");
    this.triggerElt.classList.remove("target-closed");
}
