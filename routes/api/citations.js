const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Citation model
const Citation = require('../../models/Citation');

//Profile model
const Profile = require('../../models/Profile');

// Validation
const validateCitationInput = require('../../validation/citation');

// @route  GET api/citations/test
// @desc   Tests citations route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Citations Works' }));

// @route  GET api/citations
// @desc   get citations
// @access Public- anyone can see citations
router.get('/', (req, res) => {
  Citation.find()
    .sort({ date: -1 })
    .then((citations) => res.json(citations))
    .catch((err) =>
      res.status(404).json({ nocitationsfound: 'No citations found' })
    );
});

// @route  GET api/citations/:id
// @desc   get citations by id
// @access Public- anyone can see citations
router.get('/:id', (req, res) => {
  Citation.findById(req.params.id)
    .sort({ date: -1 })
    .then((citation) => res.json(citation))
    .catch((err) =>
      res
        .status(404)
        .json({ nocitationfound: 'No citation found with that ID' })
    );
});

// @route  POST api/citations
// @desc   create citation
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCitationInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    const newCitation = new Citation({
      citation: req.body.citation,
      name: req.body.name,
      avatar: req.body.name,
      text: req.body.text,
      image: req.body.image,
      user: req.user.id,
    });

    newCitation.save().then((citation) => res.json(citation));
  }
);

// @route  DELETE api/citations/:id
// @desc   Delete citation
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Citation.findById(req.params.id)
        .then((citation) => {
          // Check for citation owner
          if (citation.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          //Delete
          citation.remove().then(() => res.json({ success: true }));
        })
        .catch((err) =>
          res.status(404).json({ citationnotfound: 'citation not found' })
        );
    });
  }
);

module.exports = router;
