const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chapterUpdateSchema = new Schema({
    bookTitle: {
        type: String,
        required: true
    },
    chapterTitle: {
        type: String
    },
    chapterNumber: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        required: true
    },
    expectedLength: {
        type: Number
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const updateSchema = new Schema({
    progress: {
        type: Number,
        default: 0
    },
    bookTitle: {
        type: String,
        required: true
    },
    expectedLength: String,
    date: Date,
    chapterUpdates: [chapterUpdateSchema],
    notes: String,
}, { timestamps: true });

module.exports = updateSchema;