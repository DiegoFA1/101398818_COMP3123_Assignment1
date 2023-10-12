var express = require('express')
var employeeModel = require('../models/Employee')
var routes = express.Router()


// http://localhost:8089/api/v1/employees
routes.route("/")
    // get all employees
    .get(async (req,res)=>{
        try{
            const employees = await employeeModel.find()
            res.status(200).json(employees)
        }catch{
            res.status(500).json({ message: 'Error Finding Employees' });
        }
    })

    // Create Employee
    .post(async (req,res)=>{
        const employee =  new employeeModel(req.body);
        try {
            await employee.save();
            res.status(201).json(employee);
        } catch (err) {
        res.status(500).json(err.message);
        }
        
    })


// /api/v1/emp/employees/{eid}
routes.route("/:eid")
    // Get employee
    .get(async (req,res)=>{
        try {
            const givenId = req.params.eid;
            const emp = await employeeModel.findOne({ _id: givenId });
      
            if (!emp) {
              return res.status(404).json({ message: `There is no Employee with that ID ${givenId}` });
            }
      
            res.status(200).json(emp);
          } catch (error) {
            res.status(500).json({ message: "The Id is invalid." });
          }
    })

    // Update Employee
    .put(async (req,res)=>{
        try {
            const givenId = req.params.eid;
            const emp = await employeeModel.findByIdAndUpdate(givenId, req.body);
            
            if (!emp) {
                return res.status(404).json({ message: `There is no Employee with that ID ${givenId}` });
            }
            await emp.save();
            res.status(200).json(emp);
        } catch (error) {
            res.status(500).json({ message: "The Id is invalid." });
        }
    })

// /api/v1/emp/employees?eid=xxx
routes.route("/")
    // Delete
    .delete(async (req,res)=>{
        try {
            const emp = await employeeModel.findByIdAndDelete(req.query.eid);
            if (!emp) {
                return res.status(404).json({ message: `There is no Employee with that ID ${req.query.eid}` });
            }
    
            res.status(204).json("Employee Deleted");
        } catch (error) {
            res.status(500).json({ message: "The Id is invalid." });
        }
    })









routes.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something Broke On Employee Routes');
});

module.exports = routes