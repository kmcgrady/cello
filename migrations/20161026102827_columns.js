'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('columns', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.integer('board_id')
      .notNullable()
      .references('id')
      .inTable('boards')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('columns');
};
