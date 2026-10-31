const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  try {
    const con = await mongoose.connect(process.env.DB_LOCAL_URI);

    console.log(`MongoDB connected to host: ${con.connection.host}`);
    console.log(`Database name: ${con.connection.name}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDatabase;
