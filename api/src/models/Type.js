const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  },
  { timestamps: false }
  );
};

