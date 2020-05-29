// logic

false && function whatever(callback) {
    setTimeout(() =>
            callback(null, 'good')
            //callback(new Error('not good'))
        , 1000)
}

function whatever() {
    //return new Promise((resolve, reject) => resolve(100))
    //return Promise.resolve(100)
    //return Promise.reject(100)

    return new Promise((resolve, reject) => {
        setTimeout(() =>
            resolve('good')
            //reject('not good')
        , 1000)
    })
}

// test runner

function it(description, test) {
    function done(error) {
        if (error) return console.error(description, error)
    
        console.log(`%c ${description}`, 'color: green')
    }    

    const result = test(done)

    if (result instanceof Promise) {
        result
            .then(() => console.log(`%c ${description}`, 'color: green'))
            .catch(error => console.error(description, error))
    }
}

// tests

false && it('should do whatever', done => { 
    whatever(error => {
        if (error) return done(error)

        done() 
    })
 })

it('should do whatever', () => whatever())