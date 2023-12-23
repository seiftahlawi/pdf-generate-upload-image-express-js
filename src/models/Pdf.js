// models/PDF.js
module.exports = (sequelize, DataTypes) => {
    const PDF = sequelize.define('pdf', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return PDF;
  };
  