/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('tasks').del()
    .then(() => {
      return knex('tasks').insert([{
        id: 1,
        column_index: 1,
        short_description: 'Prepare Day 1 of Angular Curriculum',
        long_description: 'Focus on getting students with the purpose of ' +
        'frontend development in a goal to fully understand the importance ' +
        'of planning your UI before implementation.',
        column_id: 2,
        is_archived: false,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 2,
        column_index: 1,
        short_description: 'Prepare Day 2 of Angular Curriculum',
        long_description: 'Focus on taking students to understand and build ' +
        'the initial view based on the UI plan.',
        column_id: 1,
        is_archived: false,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tasks_id_seq', (SELECT MAX(id) FROM tasks));"
      );
    });
};
