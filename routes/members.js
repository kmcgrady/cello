'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { authorize } = require('../middleware/auth');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

// Gets members for a specific task
router.get('/members', authorize, (req, res, next) => {
  const { taskId } = req.body;

  knex('members')
    .innerJoin('users', 'users.id', 'members.user_id')
    .where('members.task_id', taskId)
    .orderBy('users.name', 'ASC')
    .then((rows) => {
      const members = camelizeKeys(rows);

      res.send(members);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/members', authorize, (req, res, next) => {
  const { taskId, userId } = req.body;

  knex('tasks')
    .where('id', taskId)
    .first()
    .then((task) => {
      if (!task) {
        throw boom.create(404, 'Task not found');
      }

      const insertMember = { taskId, userId };

      return knex('members')
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

router.delete('/members', authorize, (req, res, next) => {
  const { taskId, userId } = req.body;
  const clause = decamelizeKeys({ taskId, userId });
  let member;

  knex('members')
    .where(clause)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Member not found');
      }

      member = camelizeKeys(row);

      return knex('members')
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
