const { Sequelize, DataTypes } = require('sequelize');
// Create a sequelize instance
const sequelize = new Sequelize('northwind', 'root', 'Oktaplural@123', {
    host: 'localhost',
    dialect: 'mysql',
});
  async function testConnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();
// Define the model for 'Shippers'
const Shippers = sequelize.define('Shippers', {
    ShipperID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    CompanyName: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    Phone: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true
      }
  }, {
    tableName: 'Shippers', // Specify the table name explicitly
    timestamps: false // Disable timestamps (createdAt and updatedAt)
  });
  // Querying the database and displaying results
  async function displayShippers() {
    try {
      // Fetch all records from the Shippers table
      const shippers = await Shippers.findAll();
      // Display records to the console
      console.log('Shippers:');
      shippers.forEach(shippers => {
        console.log(`${shippers.ShipperID} | ${shippers.CompanyName} | ${shippers.Phone}`);
      });
    } catch (error) {
      console.error('Here in error');
    } finally {
      // Always close the connection when done
      await sequelize.close();
      console.log('Connection closed.');
    }
  }
  // Call the function to display shippers
  displayShippers();