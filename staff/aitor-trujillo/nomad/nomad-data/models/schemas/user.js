const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')
const { utils: { Email } } = require('nomad-commons')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [Email.validate, 'invalid email']
    },
    password: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    photo: {
        type: String // TODO review this check npm
    },
    activeBookingsCount: {
        type: Number,
        default: 0
    },
    workspacesVisitedCount: {
        type: Number,
        default: 0
    },
    workspacesPublishedCount: {
        type: Number,
        default: 0
    },
    favorites: [{
        type: ObjectId,
        ref: 'Workspace'
    }],
    userWorkspaces: [{
        type: ObjectId,
        ref: 'Workspace'
    }],
    bookings: [{ // TODO Review this
        id: {
            type: ObjectId,
            ref: 'Workspace'
        },
        expiry: Date
    }],
})