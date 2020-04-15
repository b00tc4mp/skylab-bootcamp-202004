function A() { }

A.prototype.toString = function () {
    //return 'i am an instance of A, a grandchild of ' + this.__proto__.__proto__.toString.call(this) // NOT recommended
    return 'i am an instance of A, a grandchild of ' + Object.prototype.toString.call(this)
}

a = new A

a.toString()