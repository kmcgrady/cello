'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { authorize, authorizeBoard } = require('../middleware/auth');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// Gets collaborators for a specific board
router.get('/collaborators', authorize, authorizeBoard, (req, res, next) => {
  const { boardId } = req.body;

  knex('collaborators')
    .innerJoin('users', 'users.id', 'collaborators.user_id')
    .where('collaborators.board_id', boardId)
    .orderBy('users.name', 'ASC')
    .then((rows) => {
      const collaborators = camelizeKeys(rows);

      res.send(collaborators);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/collaborators', authorize, authorizeBoard, (req, res, next) => {
  const { boardId, userId } = req.body;

  knex('boards')
    .where('id', boardId)
    .first()
    .then((board) => {
      if (!board) {
        throw boom.create(404, 'Task not found');
      }

      const insertMember = { boardId, userId };

      return knex('collaborators')
        .insert(decamelizeKeys(insertMember), '*');
    })
    .then((rows) => {
      const member = camelizeKeys(rows[0]);

      res.send(member);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/collaborators', authorize, authorizeBoard, (req, res, next) => {
  const { boardId, userId } = req.body;
  const clause = decamelizeKeys({ boardId, userId });
  let member;

  knex('collaborators')
    .where(clause)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Member not found');
      }

      member = camelizeKeys(row);

      return knex('collaborators')
        .del()
        .where('id', member.id);
    })
    .then(() => {
      delete member.id;

      res.send(member);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
