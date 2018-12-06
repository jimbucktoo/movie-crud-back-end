exports.seed = function(knex, Promise) {
    return knex('movies').del()
        .then(function () {
            return knex('movies').insert([
                {title: 'This Is The End', directors: "Seth Rogen, Evan Goldberg", year: 2013, my_rating: 5, poster_url: "https://m.media-amazon.com/images/M/MV5BMTQxODE3NjM1Ml5BMl5BanBnXkFtZTcwMzkzNjc4OA@@._V1_.jpg"}
            ]);
            });
};
