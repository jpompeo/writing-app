const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Update = require('./update')
const Chapter = require('./chapter')

const bookSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    wordCount: {
        type: Number,
        default: 0
    },
    updates: [{ type: Schema.Types.ObjectId, ref: 'update' }],
    completed: {
        type: Boolean,
        default: false
    },
    chapters: [{ type: Schema.Types.ObjectId, ref: 'chapter' }],
    timelineGoal: { type: Schema.Types.ObjectId, ref: 'goal' },
    dailyGoal: { type: Schema.Types.ObjectId, ref: 'goal' },
    lifetimeGoal: { type: Schema.Types.ObjectId, ref: 'goal' }
}, { timestamps: true });

module.exports = bookSchema;