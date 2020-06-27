function Modals() {
    this.modals = [];
}

Modals.prototype.push = function(modal, id) {
    this.modals[id] = modal;
}

Modals.prototype.reset = function() {
    for (id in this.modals) {
        this.modals[id].reset();
    }
}

Modals.prototype.close = function() {
    for (id in this.modals) {
        this.modals[id].close();
    }
}

Modals.prototype.open = function(id) {
    this.close();
    this.modals[id].open();
}

Modals.prototype.toggle = function(id) {
    if (this.modals[id].opened) {
        this.close();
    } else {
        this.close();
        this.modals[id].open();
    }
}
