const { Movie, Genre, Cast } = require('./index');

Movie.belongsToMany(Genre, { through: 'MovieGenres' });
Genre.belongsToMany(Movie, { through: 'MovieGenres' });

Movie.belongsToMany(Cast, { through: 'MovieCasts' });
Cast.belongsToMany(Movie, { through: 'MovieCasts' });
require('./associations');