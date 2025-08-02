const { sequelize, Movie, Genre, Cast } = require('../models');
const api = require('../utils/tmdbClient');

(async () => {
  try {
    await sequelize.sync({ force: true }); // Recreate tables

    console.log('Starting data fetch from TMDB...');
    const genreMap = {};

    for (let page = 1; page <= 25; page++) { // fetch 500 movies: 25 pages x ~20 movies
      console.log(`Fetching page ${page}...`);
      const { data } = await api.get(`/discover/movie?page=${page}`);
      for (const movie of data.results) {
        const [details, credits] = await Promise.all([
          api.get(`/movie/${movie.id}`).catch(() => null),
          api.get(`/movie/${movie.id}/credits`).catch(() => null),
        ]);

        if (!details || !details.data) continue;

        const m = await Movie.create({
          id: details.data.id,
          title: details.data.title,
          release_date: details.data.release_date,
          vote_average: details.data.vote_average,
          vote_count: details.data.vote_count,
          popularity: details.data.popularity,
          revenue: details.data.revenue,
          overview: details.data.overview,
          runtime: details.data.runtime,
          original_language: details.data.original_language,
          poster_path: details.data.poster_path,
          backdrop_path: details.data.backdrop_path
        });

        for (const genre of details.data.genres) {
          let g = genreMap[genre.id];
          if (!g) {
            [g] = await Genre.findOrCreate({ where: { id: genre.id }, defaults: { name: genre.name } });
            genreMap[genre.id] = g;
          }
          await m.addGenre(g);
        }

        if (credits && credits.data && credits.data.cast) {
          for (const c of credits.data.cast.slice(0, 5)) { // limit to 5 top cast
            const [cast] = await Cast.findOrCreate({ where: { id: c.id }, defaults: {
              name: c.name,
              character: c.character,
              profile_path: c.profile_path
            }});
            await m.addCast(cast);
          }
        }
      }
    }

    console.log('Data fetch and seed completed!');
    process.exit();
  } catch (error) {
    console.error('Error during fetch and seed:', error.message);
    process.exit(1);
  }
})();
