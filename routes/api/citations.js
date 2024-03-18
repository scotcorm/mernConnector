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

// @route  Post api/citations/like/:id
// @desc   Like citation
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Citation.findById(req.params.id)
        .then((citation) => {
          if (
            citation.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this citation' });
          }

          // add user id to likes array
          citation.likes.unshift({ user: req.user.id });

          citation.save().then((citation) => res.json(citation));
        })
        .catch((err) =>
          res.status(404).json({ citationnotfound: 'Citation not found' })
        );
    });
  }
);

// @route  Post api/posts/unlike/:id
// @desc   Unlike post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
      Citation.findById(req.params.id)
        .then((citation) => {
          if (
            citation.likes.filter(
              (like) => like.user.toString() === req.user.id
            ).length > 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not liked this citation' });
          }

          // Get remove index
          const removeIndex = citation.likes
            .map((item) => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          citation.likes.splice(removeIndex, 1);

          // Save
          citation.save().then((citation) => res.json(citation));
        })
        .catch((err) =>
          res.status(404).json({ citationnotfound: 'Citation not found' })
        );
    });
  }
);

// @route  Citation api/citations/comment/:id
// @desc   Add comment to citation
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCitationInput(req.body);

    //Check Validation
    if (!isValid) {
      // If any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Citation.findById(req.params.id)
      .then((citation) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        citation.comments.unshift(newComment);

        //Save
        citation.save().then((citation) => res.json(citation));
      })
      .catch((err) =>
        res.status(404).json({ citationnotfound: 'No citation found' })
      );
  }
);

// @route  Delete api/citations/comment/:id/:comment_id
// @desc   Remove comment from citation
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Citation.findById(req.params.id)
      .then((citation) => {
        // Check to see if the comment exists
        if (
          citation.comments.filter(
            (comment) => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentdoesnotexist: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = citation.comments
          .map((item) => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of the array
        citation.comments.splice(removeIndex, 1);

        citation.save().then((citation) => res.json(citation));
      })
      .catch((err) =>
        res.status(404).json({ citationnotfound: 'No citation found' })
      );
  }
);

module.exports = router;
