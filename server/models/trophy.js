const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trophySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = trophySchema;