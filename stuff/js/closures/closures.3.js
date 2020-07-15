function person(name, hair) {
    return {
        hair: hair,

        answerName: function() {
            return name
        }
    }
}

var peter = person('Peter', 'brown')

console.log('public', peter.hair)
console.log('private', peter.name)
console.log('private', 'whats your name?',  peter.answerName())