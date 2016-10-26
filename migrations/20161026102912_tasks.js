'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.integer('column_id')
      .notNullable()
      .references('id')
      .inTable('columns')
      .onDelete('CASCADE')
      .index();
    table.integer('column_index').notNullable().defaultTo(1);
    table.string('short_description').notNullable().defaultTo('');
    table.string('long_description').notNullable().defaultTo('');
    table.boolean('is_archived').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
