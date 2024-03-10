const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  handle: {
    type: String,
    required: true,
    max: 40,
  },
  company: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  skills: {
    type: [String],
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
  },
  experience: {
    company: {
      type: String,
    },
    titles: {
      type: String,
    },
    projects: {
      type: String,
    },
  },

  education: {
    school: {
      type: String,
    },
    degrees: {
      type: String,
    },
    certificates: {
      type: String,
    },
  },

  social: {
    youtube: {
      type: String,
    },
    linkedin: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
  // description: {
  //   type: [String],
  // },
  // description should be Researcher, Landowner, Other
  // it would be entering a list of csv (a,b,c) and using logic to parse them into the database
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
