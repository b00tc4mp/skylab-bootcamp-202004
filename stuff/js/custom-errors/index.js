class NotFoundError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber)
    }

    //get name() { return NotFoundError.name }
    get name() { return this.constructor.name }
}

error = new NotFoundError('WTF')

console.log(error.name)

throw error

// 2

class NotFoundError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber)
    }

    get name() { return this.constructor.name }
}

class ConflictError extends Error {
    constructor(message, fileName, lineNumber) {
        super(message, fileName, lineNumber)
    }

    get name() { return this.constructor.name }
}


function whatever() { 
    const value = 0.8// Math.random()
    
    if (value < 0.33) throw new ConflictError(value)
    else if (value < 0.66) throw new NotFoundError(value)    

    throw Error(value)
}

try {
    whatever()
} catch(error) {
    console.log(error.message)

    if (error instanceof ConflictError) alert('hey, there was a conflict, sorry :(')
    else if (error instanceof NotFoundError) alert('sorry, i couldnt find what you looking for :/')
    else alert('i dunno whats going on!')
}