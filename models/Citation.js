const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CitationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  citation: [
    {
      title: {
        type: String,
        required: true,
      },
      creator: {
        type: String,
        required: true,
      },
      source: {
        type: String,
        required: true,
      },
      license: {
        type: String,
        enum: [
          'CCby',
          'CCby-nc',
          'CCby-nc-nd',
          'CCby-nc-sa',
          'CCby-nd',
          'CCby-sa',
          'Other license (specified below)',
        ],
        message: 'Choose an option from the list',
        required: true,
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
  text: {
    type: String,
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Citation = mongoose.model('citation', CitationSchema);
