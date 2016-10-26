'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { authorize } = require('../middleware/auth');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/boards', authorize, (req, res, next) => {
  const { userId } = req.token;
  const collaboratedBoards = knex('collaborators')
    .select('board_id')
    .where('user_id', userId);

  // User may be the owner of a board or a collaborator of a board
  knex('boards')
    .whereIn('id', collaboratedBoards)
    .orWhere('owner_id', Number.parseInt(userId))
    .orderBy('name', 'ASC')
    .then((rows) => {
      const boards = camelizeKeys(rows);

      res.send(boards);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/boards/:id', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { id } = req.params;
  const collaboratedBoards = knex('collaborators')
    .select('board_id')
    .where('user_id', userId);

  // User may be the owner of a board or a collaborator of a board
  knex('boards')
    .whereIn('id', collaboratedBoards)
    .orWhere('owner_id', Number.parseInt(userId))
    .where('id' , id)
    .orderBy('name', 'ASC')
    .then((rows) => {
      const board = camelizeKeys(rows[0]);

      res.send(board);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/boards', authorize, (req, res, next) => {
  const { name } = req.body;
  const { userId } = req.token;

  knex('boards')
    .insert(decamelizeKeys({ name, ownerId: userId }), '*')
    .then((boards) => {
      res.send(camelizeKeys(boards[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/boards/:id', authorize, (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { userId } = req.token;

  knex('boards')
    .where('id', id)
    .where('owner_id', userId)
    .first()
    .then((board) => {
      if (!board) {
        throw boom.create(404, 'Board not found');
      }

      return knex('boards')
        .update(decamelizeKeys({ name, ownerId: userId }), '*')
        .where('id', id);
    })
    .then((boards) => {
      res.send(camelizeKeys(boards[0]));
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/boards/:id', authorize, (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.token;
  let board;

  knex('boards')
    .where('id', id)
    .where('owner_id', userId)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Board not found');
      }

      board = camelizeKeys(row);

      return knex('boards')
        .del()
        .where('id', id);
    })
    .then(() => {
      delete board.id;

      res.send(board);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
