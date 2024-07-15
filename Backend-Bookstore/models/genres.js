'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class genres extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.books, {foreignKey: 'genre_id'});
    }
  }
  genres.init({
    genre_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    genre_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Genre Name Must have a Name'},
        notEmpty: {msg: 'Genre  Name Must not be Empty'},
      }
    }
  }, {
    sequelize,
    modelName: 'genres',
    tableName: 'genres',
    timestamps: false
  });
  return genres;
};