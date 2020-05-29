const o = {
    set name(name) { this.__name__ = name.toUpperCase() },

    get name() { return `>>${this.__name__}<<` }
}

o.name = 'pepito'

console.log(o.name)