'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  books.init({
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Book Must have a Title'},
        notEmpty: {msg: 'Book Title Must not be Empty'},
      }
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
      allowNull: false,
      validate:{
        notNull:{msg: 'Book Must have a Price'},
        notEmpty: {msg: 'Book Price Must not be Empty'},
      }
    },
    publication_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate:{
        notNull:{msg: 'Book Must have a Publication Date'},
        notEmpty: {msg: 'Book Publication Date Must not be Empty'},
        isDate:{msg: 'Please enter proper Date'},
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{msg: 'Book Must have a Image'},
        notEmpty: {msg: 'Book Image Must not be Empty'},
      }
    }
  }, {
    sequelize,
    modelName: 'books',
    timestamps:false,
    tableName: 'books'
  });
  return books;
};