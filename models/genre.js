module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING
  });
  return Genre;
};
