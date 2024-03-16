const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MetricSchema = new Schema({
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
  metrics: [
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
      completed: {
        type: Number,
      },
      cohort: {
        type: Number,
      },
      overlaps: {
        type: Number,
      },
      qa: {
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

module.exports = Metric = mongoose.model('metric', MetricSchema);
