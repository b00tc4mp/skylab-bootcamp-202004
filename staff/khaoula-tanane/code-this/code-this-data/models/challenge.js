const { Schema } = require('mongoose')
const mongoose = require('mongoose')

const Challenge = new Schema({
    description: {
        type: String,
        required: true
    },
    solution: {
        type: [String], //push users solucion to our's so it turns into an arr of multilple answers
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Advanced'],
        required: true
    },
    tests: {
        type: String, 
        required: true
    },
    score: {
        type: Number,
        default: function() { // mongoose buit-in validators
            if (this.difficulty === 'Easy') return 5
            if (this.difficulty === 'Medium') return 10
            if (this.difficulty === 'Advanced') return 15
        }
    }
})
module.exports = mongoose.model('Challenge',  Challenge)
