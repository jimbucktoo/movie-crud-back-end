exports.seed = function(knex, Promise) {
  return knex('movies').del()
    .then(function () {
      return knex('movies').insert([
        {title: 'Spirited Away', directors: 'Hayao Miyazaki', year: 2002, rating: 5, poster_url: 'https://m.media-amazon.com/images/M/MV5BMjlmZmI5MDctNDE2YS00YWE0LWE5ZWItZDBhYWQ0NTcxNWRhXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'},
        {title: 'John Wick: Chapter 4', directors: 'Chad Stahelski', year: 2023, rating: 3, poster_url: 'https://assets-prd.ignimgs.com/2023/02/08/jw4-2025x3000-online-character-1sht-keanu-v187-1675886090936.jpg'},
        {title: 'Godzilla vs. Kong', directors: 'Adam Wingard', year: 2021, rating: 3, poster_url: 'https://m.media-amazon.com/images/M/MV5BMzk2ZmYxNTUtODlhMi00NzE2LTkwMTctYjg0ODQ1ZjkyNzJmXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg'}
      ]);
    });
};
