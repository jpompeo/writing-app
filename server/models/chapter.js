const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    description: String,
    deadline: {
        type: Date
    },
    expectedLength: {
        type: Number,
        default: 3000
    },
    progress: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = chapterSchema;