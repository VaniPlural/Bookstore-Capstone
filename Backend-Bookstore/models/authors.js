'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authors.init({
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Author Must have a Name'},
        notEmpty: {msg: 'Author Name Must not be Empty'},
      }
    },
    biography: {
      type: DataTypes.TEXT
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Author Must have a Image'},
        notEmpty: {msg: 'Author Image Must not be Empty'},
      }
    }
  }, {
    sequelize,
    modelName: 'authors',
    imestamps:false,
    tableName:'authors'
  });
  return authors;
};