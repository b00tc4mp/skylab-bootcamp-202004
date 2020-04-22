const o = { 
    name: 'Peter',

    toString() {
        return 'i am ' + this.name
    }
}


o.toString()
//"i am Peter"

window.name = 'Window'

toString = o.toString

toString()
//"i am Window"