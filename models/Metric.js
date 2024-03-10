const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MetricSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'metrics',
  },
  metrics: [
    {
      date: {
        type: Date,
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
});

module.exports = Metric = mongoose.model('metric', MetricSchema);
