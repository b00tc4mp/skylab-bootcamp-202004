const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const review = require('./review')

module.exports = new Schema({

    creator: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    score: {
        type: Number,
        default: 0,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    price: {
        type: {
            amount: {
                type: Number,
                required: true
            },
            term: {
                type: String,
                enum: ['day', 'week', 'month'],
                required: true
            },
        },
        required: true
    },

    category: {
        type: String,
        enum: ['cowork', 'coffee', 'library', 'shared space'],
        required: true
    },

    address: {
        type: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }

        },
        required: true,
    },
    geoLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    // timetable: { // TODO is this ok?
    //     type: String, // openig closing days
    //     required: true
    // },
    photos: [{
        type: String,
        // required: true
    }],
    phone: {
        type: String,
        unique: true
    },
    features: {
        wifi: {
            type: Boolean,
            // required: true
        },
        parking: {
            type: Boolean,
            // required: true
        },
        coffee: {
            type: Boolean,
            // required: true
        },
        meetingRooms: {
            type: Boolean,
            // required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    reviews: [review]
})