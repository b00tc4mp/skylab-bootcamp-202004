function person(name, hair) {
    return {
        hair: hair,

        answerName: function(disrespectfullyAsked) {
            return disrespectfullyAsked? 'go 💩!': name
        }
    }
}

var peter = person('Peter', 'brown')

console.log('public', peter.hair)
console.log('private', peter.name)
console.log('private', 'whats your name, modafoca!?',  peter.answerName(true))
console.log('private', 'whats your name, handsome?',  peter.answerName(false))