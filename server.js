const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');
const metrics = require('./routes/api/metrics');
const citations = require('./routes/api/citations');
const pigs = require('./routes/api/pigs');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello'));

//Use Routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);
app.use('/api/metrics', metrics);
app.use('/api/citations', citations);
app.use('/api/pigs', pigs);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
