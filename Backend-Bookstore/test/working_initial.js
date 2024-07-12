const {Sequelize, DataTypes} = require('sequelize');


// Create a sequelize instance
const sequelize = new Sequelize('bookstore', 'root', 'Mysql@287212', {
  host: 'localhost',
  dialect: 'mysql',
});

const Book = sequelize.define( 'Book', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2), // Adjust precision and scale as needed
    allowNull: false
  },
  publication_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, 
{tableName: 'books',
  timestamps:false

 }
);


 const Author = sequelize.define('Author', {
  author_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT
  }
},
{tableName: 'authors',
  timestamps:false

 });

const Genre = sequelize.define('Genre', {
  genre_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  genre_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{tableName: 'genres',
  timestamps:false

 });

// Define associations
Book.belongsTo(Author, { foreignKey: 'author_id' });

Book.belongsTo(Genre, { foreignKey: 'genre_id' });

// Synchronize models with database (create tables)
sequelize.sync({ force: true }) // Use { force: true } only for development
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error creating database and tables:', err);
  });

// Export models
module.exports = {
  Book,
  Author,
  Genre
};

