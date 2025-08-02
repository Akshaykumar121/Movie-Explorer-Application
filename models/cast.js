module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define('Cast', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    character: DataTypes.STRING,
    profile_path: DataTypes.STRING
  });
  return Cast;
};
