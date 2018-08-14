const express = require('express');
const router = express.Router();
const db = require('../../models');

// @route   GET api/todos
// @desc    Show all todos
// @access  Public
router.get('/', (req, res) => {
  db.Todo.find()
    .then(todos => res.json(todos))
    .catch(err => res.send(err))
});

// @route   POST api/todos
// @desc    Create todo
// @access  Public
router.post('/', (req, res) => {
  db.Todo.create(req.body)
    .then(newTodo => {
      res.status(201).json(newTodo)
    })
    .catch(err => res.send(err))
});


module.exports = router;