module.exports = (sequelize, DataTypes) => {
  return sequelize.define("ErrorLog", {
    message: { type: DataTypes.TEXT, allowNull: false },
    statusCode: { type: DataTypes.INTEGER, defaultValue: 500 },
    stack: { type: DataTypes.TEXT },
    path: { type: DataTypes.STRING, allowNull: true },
    method: { type: DataTypes.STRING, allowNull: true },
    resolved: {type: DataTypes.BOOLEAN, defaultValue: false}
  }, {
    timestamps: true,
  });
};