const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "buyer",
    enum: ["buyer", "admin" , "editor"]
  },
  status: { type: String, default: 'Active' },
  
});

module.exports = mongoose.model("User", userSchema);
