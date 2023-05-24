exports.seed = async function(knex) {
    await knex('users').del();

    await knex('users').insert([
        { id: 1, username: 'user1', email: 'user1@example.com', password: 'password1' },
        { id: 2, username: 'user2', email: 'user2@example.com', password: 'password2' },
    ]);
};
