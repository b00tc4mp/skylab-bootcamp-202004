const o = { 
    name: 'Peter',

    toString() {
        return 'i am ' + this.name
    }
}


o.toString()
//"i am Peter"

window.name = 'Window'

const toString = o.toString

toString()
//"i am Window"