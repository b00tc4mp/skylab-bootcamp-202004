module.exports = (value) => {
    if (value instanceof Array) {
        value.forEach(element => {
            debugger
            if (element._id) {
                element.id = element._id.toString()
                delete element._id
            }

            if (element.__v) delete element.__v
        });

        return value;
    } else if (value.constructor.name === 'Object') {
        debugger
        if (value._id) {
            value.id = value._id.toString()
            delete value._id
        }

        if (value.__v) delete value.__v

        return value
    } 
}
