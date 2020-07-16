const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Update = require('./update')
const chapterSchema = require('./chapter')

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    expectedLength: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true
    },
    chapters: [chapterSchema],
}, { timestamps: true });

module.exports = bookSchema;