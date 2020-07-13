const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'book',
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    dailyWordCount: {
        type: Number,
        default: 0
    },
    notes: String,
}, { timestamps: true });

const Update = mongoose.model('update', updateSchema)
module.exports = Update;