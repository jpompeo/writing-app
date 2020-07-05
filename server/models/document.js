const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const documentSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    wordCount: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date,
        default: new Date()
    }
});

module.exports = documentSchema;