const { Schema } = require('mongoose')

module.exports = new Schema({
    HPO_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    def: String,
    comment: String,
    alt_id: [String],
    is_a: [String],
    synonim: [String],
    xref: [String],
    is_obsolete: String,
    replaced_by: String
})