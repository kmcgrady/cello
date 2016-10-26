/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('members').del()
    .then(() => {
      return knex('members').insert([{
        id: 1,
        user_id: 1,
        task_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 2,
        user_id: 1,
        task_id: 2,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('members_id_seq', (SELECT MAX(id) FROM members));"
      );
    });
};
