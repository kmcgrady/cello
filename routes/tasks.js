'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { authorize, authorizeBoard } = require('../middleware/auth');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/tasks', authorize, authorizeBoard, (req, res, next) => {
  const { columnId } = req.query;

  knex('tasks')
    .where('column_id', columnId)
    .orderBy('column_index', 'ASC')
    .orderBy('id', 'ASC')
    .then((rows) => {
      const tasks = camelizeKeys(rows);

      res.send(tasks);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/tasks', authorize, authorizeBoard, (req, res, next) => {
  const {
    columnId,
    columnIndex,
    longDescription,
    isArchived,
    shortDescription,
  } = req.body;

  knex('tasks')
    .insert(decamelizeKeys({
      columnId,
      columnIndex,
      longDescription,
      isArchived,
      shortDescription,
    }), '*')
    .then((tasks) => {
      res.send(camelizeKeys(tasks[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/tasks/:id', authorize, authorizeBoard, (req, res, next) => {
  const { id } = req.params;
  const {
    columnId,
    columnIndex,
    longDescription,
    isArchived,
    shortDescription,
  } = req.body;

  knex('tasks')
    .where('id', id)
    .first()
    .then((board) => {
      if (!board) {
        throw boom.create(404, 'Board not found');
      }

      return knex('tasks')
        .update(decamelizeKeys({
          columnId,
          columnIndex,
          longDescription,
          isArchived,
          shortDescription,
        }), '*')
        .where('id', id);
    })
    .then((tasks) => {
      res.send(camelizeKeys(tasks[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/tasks/:id', authorize, authorizeBoard, (req, res, next) => {
  const { id } = req.params;
  let task;

  knex('tasks')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Board not found');
      }

      task = camelizeKeys(row);

      return knex('tasks')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete task.id;

      res.send(task);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
