const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterUpdateSchema = new Schema({
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
    }
}, { timestamps: true });

const updateSchema = new Schema({
    dailyWordCount: {
        type: Number,
        default: 0
    },
    chapterUpdates: [chapterUpdateSchema],
    notes: String,
}, { timestamps: true });

module.exports = updateSchema;