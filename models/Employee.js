const mongoose = require('mongoose');

const EmployeeCollection = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 50
  }, 
  email: {
    type: String,
    unique: true, 
    maxlength: 50
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  salary: {
    type: Number,
    required: true,
    default: 0.0,
    min: 0,
    max: 1000000
  },
});

const Employee = mongoose.model("Employee", EmployeeCollection);
module.exports = Employee;