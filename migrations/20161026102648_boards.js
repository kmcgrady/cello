'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('boards', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.integer('owner_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('boards');
};
