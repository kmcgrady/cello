/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('columns').del()
    .then(() => {
      return knex('columns').insert([{
        id: 1,
        name: 'To Do',
        board_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 2,
        name: 'Doing',
        board_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 3,
        name: 'Done',
        board_id: 1,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 4,
        name: 'To Do',
        board_id: 2,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 5,
        name: 'Doing',
        board_id: 2,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 6,
        name: 'In Review',
        board_id: 2,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }, {
        id: 7,
        name: 'Done',
        board_id: 2,
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('columns_id_seq', (SELECT MAX(id) FROM columns));"
      );
    });
};
