function project(animation) {
    var projector = setInterval(function() {
        var view = animation.render()

        console.clear()
        console.log(view)
    }, 1000 / animation.fps);
    
    document.addEventListener('click', function() {
        clearInterval(projector)
    })
}

var clock = {
    render: function() {
        return new Date
    },
    fps: 1
}

//project(clock)

var spinner = (function() {
    var blades = ['|', '/', '-', '\\']
    var i = 0

    return {
        render: function() {
            i > 3 && (i = 0)

            return blades[i++]
        },
        fps: 3
    }  
})()

//project(spinner)

function Vector() {
    Array.apply(this, arguments)
}

Vector.prototype = Object.create(Array.prototype)
Vector.prototype.constructor = Vector

Vector.prototype.set = function(i, value) {
    if (typeof i !== 'number') throw new TypeError(i + ' is not a number')

    i >= this.length && (this.length = i + 1)

    this[i] = value
};

/*var v = new Vector

v.push(1)
v.push(2)
v.push(3)
v.push('a')
v.set(10, 's')*/

function Matrix() {
}

Matrix.prototype = Object.create(Vector.prototype)
Matrix.prototype.constructor = Matrix

Matrix.prototype.set = function(i, j, value) {
    if (typeof i !== 'number') throw new TypeError(i + ' is not a number')
    if (typeof j !== 'number') throw new TypeError(j + ' is not a number')

    var v = this[j]
    
    !v && (v = new Vector) && (Vector.prototype.set.call(this, j, v))

    v.set(i, value)
};

Matrix.prototype.toString = function() {
    var string = ''

    for (var i = 0; i < this.length; i++) {
        var v = this[i]

        for (var j = 0; j < v.length; j++) {
            string += v[j]

            j < v.length - 1 && (string += '\t')
        }

        i < this.length - 1 && (string += '\n\n')
    }

    return string    
};

/*
var m = new Matrix

m.set(0, 0, '*'), m.set(1, 0, ''), m.set(2, 0, '')
m.set(0, 1, ''), m.set(1, 1, '*'), m.set(2, 1, '')
m.set(0, 2, ''), m.set(1, 2, ''), m.set(2, 2, '*')

console.log(m.toString())
*/

var fan = (function() {
    var m = new Matrix

    var i = 0;

    return {
        render: function() {
            switch(i) {
                case 0:
                    m.set(0, 0, '*'), m.set(1, 0, ''), m.set(2, 0, '')
                    m.set(0, 1, ''), m.set(1, 1, '*'), m.set(2, 1, '')
                    m.set(0, 2, ''), m.set(1, 2, ''), m.set(2, 2, '*')
                break
                case 1:
                    m.set(0, 0, ''), m.set(1, 0, '*'), m.set(2, 0, '')
                    m.set(0, 1, ''), m.set(1, 1, '*'), m.set(2, 1, '')
                    m.set(0, 2, ''), m.set(1, 2, '*'), m.set(2, 2, '')
                break
                case 2:
                    m.set(0, 0, ''), m.set(1, 0, ''), m.set(2, 0, '*')
                    m.set(0, 1, ''), m.set(1, 1, '*'), m.set(2, 1, '')
                    m.set(0, 2, '*'), m.set(1, 2, ''), m.set(2, 2, '')
                break
                case 3:
                    m.set(0, 0, ''), m.set(1, 0, ''), m.set(2, 0, '')
                    m.set(0, 1, '*'), m.set(1, 1, '*'), m.set(2, 1, '*')
                    m.set(0, 2, ''), m.set(1, 2, ''), m.set(2, 2, '')
            }
            
            i == 3? i = 0 : i++

            return m.toString()    
        },
        fps: 1
    }
})()

project(fan)