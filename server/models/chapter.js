const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Chapter = mongoose.model('chapter', chapterSchema)
module.exports = Chapter;