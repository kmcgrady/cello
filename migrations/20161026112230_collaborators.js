'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('collaborators', (table) => {
    table.increments();
    table.integer('board_id')
      .notNullable()
      .references('id')
      .inTable('boards')
      .onDelete('CASCADE')
      .index();
      table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('collaborators');
};
