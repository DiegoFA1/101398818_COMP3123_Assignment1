const mongoose = require('mongoose');

const EmployeeCollection = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  salary: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (value < 0.0) throw new Error("Negative Salary aren't real.");
    }
  },
});

const Employee = mongoose.model("Employee", EmployeeCollection);
module.exports = Employee;