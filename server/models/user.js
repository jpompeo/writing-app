const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const documentSchema = require('./document');
const trophySchema = require('./trophy');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String,
  docs: [documentSchema],
  totalWordCount: {
    type: Number,
    default: 0
  },
  streakDays: {
    type: Number,
    default: 0
  },
  level: {
    type: String
  },
  trophies: [trophySchema]
})

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
}

// Create the model class
const ModelClass = mongoose.model('user', UserSchema)

// Export the model
module.exports = ModelClass
