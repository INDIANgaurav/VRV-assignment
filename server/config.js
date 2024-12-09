const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    if (connection.STATES.connected) {
      console.log("Connected to MongoDB");
    }
    if(connection.STATES.disconnected) return console.log("MongoDB Disconnected");
  
  } catch (error) {
    console.error("error in connectDb" ,error);    process.exit(1);
  }
};

module.exports = connectDb; 