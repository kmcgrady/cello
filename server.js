'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

app.disable('x-powered-by');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

// Expose public directory to client
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.json());

const boards = require('./routes/boards');
const columns = require('./routes/columns');
const tasks = require('./routes/tasks');
const members = require('./routes/members');
const collaborators = require('./routes/collaborators');
const users = require('./routes/users');
const token = require('./routes/token');

app.use('/api', boards);
app.use('/api', columns);
app.use('/api', tasks);
app.use('/api', members);
app.use('/api', collaborators);
app.use('/api', users);
app.use('/api', token);

// Any other pages refer to index.html
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port); // eslint-disable-line no-console
});

module.exports = app;
