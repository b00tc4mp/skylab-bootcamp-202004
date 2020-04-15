delete Array.prototype.forEach

//[1, 2, 3].forEach(console.log) // ERROR

Array.prototype.forEach = function forEach(expression) {
    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};

[1, 2, 3].forEach(console.log)