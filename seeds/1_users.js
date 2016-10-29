/* eslint-disable max-len, camelcase */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        name: 'Ken McGrady',
        email: 'ken.mcgrady@gmail.com',
        hashed_password: '$2a$12$yLj8aKyJuMdaRtyTN2a0ceZeLJX6svrrkAZhueYD1NUSPTVbjUgem',
        created_at: new Date('2016-10-25 14:26:16 UTC'),
        updated_at: new Date('2016-10-25 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
