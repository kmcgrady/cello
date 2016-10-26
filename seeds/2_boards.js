/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('boards').del()
    .then(() => {
      return knex('boards').insert([{
        id: 1,
        name: 'Angular Curriculum',
        owner_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 2,
        name: 'React Curriculum',
        owner_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('boards_id_seq', (SELECT MAX(id) FROM boards));"
      );
    });
};
