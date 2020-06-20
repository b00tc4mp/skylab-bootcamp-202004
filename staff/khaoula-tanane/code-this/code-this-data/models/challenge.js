const { Schema } = require('mongoose')
const mongoose = require('mongoose')
const { ObjectId } = require('../mongoose')

const Challenge = new Schema({
    description: {
        type: String,
        required: true
    },
    solutions: {
        type: [Object],
        default: []
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Advanced'],
        default: 'Easy'
    },
    tests: {
        type: String, 
        required: true
    },
    initialCode: {
        type: String,
        default: ''
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
