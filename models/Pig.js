const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PigSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  data: [
    {
      date: {
        type: String,
      },
      year: {
        type: String,
      },
      month: {
        type: String,
      },
      location: {
        type: String,
      },
      count: {
        type: Number,
      },
      notes: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Pig = mongoose.model('pig', PigSchema);
