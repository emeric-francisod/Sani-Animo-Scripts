function Popins() {
    this.popins = [];
}

Popins.prototype.push = function(popin) {
    this.popins.push(popin);
}

Popins.prototype.reset = function() {
    for (popin in this.popins) {
        popin.reset();
    }
}

Popins.prototype.close = function() {
    for (popin in this.popins) {
        popin.close();
    }
}
