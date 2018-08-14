const express = require('express');
const router = express.Router();
const db = require('../../models');
const helpers = require('../../helpers/todos')

// @route   GET api/todos
// @desc    Show all todos
// @access  Public
// ****************************
// łączymy razem routes o takiej samej ścieżce
// ****************************
// @route   POST api/todos
// @desc    Create todo
// @access  Public
router.route('/')
  .get(helpers.getTodos)
  .post(helpers.createTodo)


// @route   GET api/todos/:todoId
// @desc    Show todo
// @access  Public
// ****************************
// @route   PUT api/todos/:todoId
// @desc    UPDATE
// @access  Public
// ****************************
// @route   DELETE api/todos/:todoId
// @desc    Remove
// @access  Public
router.route('/:todoId')
  .get(helpers.getTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)


module.exports = router;