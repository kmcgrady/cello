const boom = require('boom');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const authorize = function(req, res, next) {
  const token = req.cookies.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;

    next();
  });
};

const authorizeBoard = function(req, res, next) {
  const { userId } = req.token;
  const { boardId } = req.body;

  const collaboratedBoards = knex('collaborators')
    .select('board_id')
    .where('user_id', userId)
    .where('board_id', boardId);

  // User may be the owner of a board or a collaborator of a board
  knex('boards')
    .whereIn('id', collaboratedBoards)
    .orWhere(decamelizeKeys({
      id: boardId,
      ownerId: userId
    }))
    .orderBy('name', 'ASC')
    .first()
    .then((board) => {
      if (!board) {
        return next(boom.create(401, 'Unauthorized'));
      }

      req.board = camelizeKeys(board);
      next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { authorize, authorizeBoard };
