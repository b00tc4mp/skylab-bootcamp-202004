function hello(name) {
    console.log('Hello, ' + name + '!')

    return true
}

var salutePeter = true


salutePeter && hello('Peter') || hello('Mary')

salutePeter? hello('Peter') : hello('Mary')

if (salutePeter) hello('Peter')
else hello('Mary')