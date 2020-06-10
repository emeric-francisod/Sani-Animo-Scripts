function Popins() {
    this.popins = [];
}

Popins.prototype.push = function(popin, id) {
    this.popins[id] = popin;
}

Popins.prototype.reset = function() {
    for (id in this.popins) {
        this.popins[id].reset();
    }
}

Popins.prototype.close = function() {
    for (id in this.popins) {
        this.popins[id].close();
    }
}

Popins.prototype.open = function(id) {
    this.close();
    this.popins[id].open();
}

Popins.prototype.toggle = function(id) {
    if (this.popins[id].opened) {
        this.close();
    } else {
        this.close();
        this.popins[id].open();
    }
}
