module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING},
    category: { type: DataTypes.STRING },
    writer: { type: DataTypes.STRING }, 
    imagelink: { type: DataTypes.STRING },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  }, {
    tableName: "posts",
    timestamps: true,
    createdAt: "created_at",
  });
};