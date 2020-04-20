Array.prototype.half = (function() {
    function leftSide() {
        var left = []

        var end = Math.ceil(this.length / 2)

        for (var i = 0; i < end; i++)
            left[i] = this[i]

        return left
    }

    function rightSide() {
        var right = []

        var start = Math.floor(this.length / 2)

        for (var i = start; i < this.length; i++)
            right[i - start] = this[i]

        return right
    }

    return function(side) {
        switch(side) {
            case 'left': return leftSide.call(this)
            case 'right': return rightSide.call(this)
        }
    }
})()

var a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var b = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

console.log(a.half('left'))
console.log(a.half('right'))

console.log(b.half('left'))
console.log(b.half('right'))