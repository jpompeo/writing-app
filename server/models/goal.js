const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const goalSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    goalStartDate: {
        type: Date,
        default: new Date()
    },
    goalEndDate: {
        type: Date,
    },
    goalItem: {
        type: String, 
        required: true,
        enum: ['words', 'chapters', 'pages', 'day']
    },
    goalType: {
        type: String, 
        required: true,
        enum: ['timeline', 'daily', 'lifetime']
    },
    notes: String,
}, { timestamps: true });

const Goal = mongoose.model('goal', updateSchema)
module.exports = Update;