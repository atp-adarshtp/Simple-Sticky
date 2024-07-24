const express = require('express');
const Collection = require('../models/Collection');
const Note = require('../models/Note');
const router = express.Router();
const authenticateApiKey = require('./auth').authenticateApiKey;

// Create a new collection
router.post('/collections', authenticateApiKey, async (req, res) => {
  const { userId, title } = req.body;
  try {
    const collection = new Collection({ userId, title });
    await collection.save();
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get collections for a user
router.get('/collections/:userId', authenticateApiKey, async (req, res) => {
  try {
    const collections = await Collection.find({ userId: req.params.userId });
    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new note in a collection
router.post('/collections/:collectionId/notes', authenticateApiKey, async (req, res) => {
  const { collectionId } = req.params;
  const { content } = req.body;
  try {
    const note = new Note({ collectionId, content });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notes in a collection
router.get('/collections/:collectionId/notes', authenticateApiKey, async (req, res) => {
  try {
    const notes = await Note.find({ collectionId: req.params.collectionId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
