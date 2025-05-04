module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // optional, but usually needed for ID fields
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false
    }
  });
};
