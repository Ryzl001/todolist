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

// @route   GET api/todos/:todoId
// @desc    Show todo
// @access  Public
router.get('/:todoId', (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then(foundTodo => res.json(foundTodo))
    .catch(err => res.send(err))
});

// @route   PUT api/todos/:todoId
// @desc    UPDATE
// @access  Public
router.put('/:todoId', (req, res) => {
  db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })  // new: true zwraca nową wartość po update
    .then(todo => {
      res.json(todo)
    })
    .catch(err => res.send(err))
});

// @route   DELETE api/todos/:todoId
// @desc    Remove
// @access  Public
router.delete('/:todoId', (req, res) => {
  db.Todo.remove({ _id: req.params.todoId })
    .then(() => res.json({ message: 'We deleted it!' }))
    .catch(err => res.send(err))
});


module.exports = router;