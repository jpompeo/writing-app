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
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = chapterSchema;