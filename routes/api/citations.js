const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Citation model
const Citation = require('../../models/Citation');

// Validation
const validateCitationInput = require('../../validation/citation');

// @route  GET api/citations/test
// @desc   Tests citations route
// @access Public

router.get('/test', (req, res) => res.json({ msg: 'Citations Works' }));

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

module.exports = router;
