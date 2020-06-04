class Prosille { // Promise => "mesa", Prosille => "silla" (copyright "Alberto Sergi")
    constructor(callback) {
        const resolve = value => {
            if (this.__callback__) 
                this.__callback__(value)
        }

        callback(resolve/*, reject*/)
    }

    then(callback) {
        this.__callback__ = callback
    }
}

// oldies

new Prosille((resolve, reject) => {
    setTimeout(() => resolve(10), 2000)
})
    .then(value => console.log(value))

// now

; (async () => {
    const value = await new Prosille((resolve, reject) => {
       setTimeout(() => resolve(10), 2000)
   })  

   console.log(value) 
})()