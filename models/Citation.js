const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CitationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'citations',
  },
  metrics: [
    {
      title: {
        type: String,
      },
      creator: {
        type: String,
      },
      source: {
        type: String,
      },
      license: {
        type: String,
      },
      title2: {
        type: String,
      },
      creator2: {
        type: String,
      },
      source2: {
        type: String,
      },
      license2: {
        type: String,
      },
    },
  ],
});

module.exports = Citation = mongoose.model('citation', CitationSchema);
