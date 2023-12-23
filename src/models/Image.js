// models/Image.js
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
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
  
    return Image;
  };
  