module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    vote_average: DataTypes.FLOAT,
    vote_count: DataTypes.INTEGER,
    popularity: DataTypes.FLOAT,
    revenue: DataTypes.BIGINT,
    overview: DataTypes.TEXT,
    runtime: DataTypes.INTEGER,
    original_language: DataTypes.STRING,
    poster_path: DataTypes.STRING,
    backdrop_path: DataTypes.STRING
  });
  return Movie;
};
