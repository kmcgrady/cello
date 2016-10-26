'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { authorize, authorizeBoard } = require('../middleware/auth');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/columns', authorize, authorizeBoard, (req, res, next) => {
  const { boardId } = req.query;

  knex('columns')
    .where('board_id', boardId)
    .orderBy('id', 'ASC')
    .then((rows) => {
      const columns = camelizeKeys(rows);

      res.send(columns);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/columns', authorize, authorizeBoard, (req, res, next) => {
  const { boardId, name } = req.body;

  knex('columns')
    .insert(decamelizeKeys({ boardId, name }), '*')
    .then((columns) => {
      res.send(camelizeKeys(columns[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/columns/:id', authorize, authorizeBoard, (req, res, next) => {
  const { id } = req.params;
  const { boardId, name } = req.body;

  knex('columns')
    .where('id', id)
    .first()
    .then((board) => {
      if (!board) {
        throw boom.create(404, 'Board not found');
      }

      return knex('columns')
        .update(decamelizeKeys({ boardId, name }), '*')
        .where('id', id);
    })
    .then((columns) => {
      res.send(camelizeKeys(columns[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/columns/:id', authorize, authorizeBoard, (req, res, next) => {
  const { id } = req.params;
  let column;

  knex('columns')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Column not found');
      }

      column = camelizeKeys(row);

      return knex('columns')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete column.id;

      res.send(column);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
