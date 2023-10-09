var express = require('express')
var userModel = require('../models/User')
var routes = express.Router()

// /user/signup
// Create User
routes.route("/signup")
    .post(async (req,res)=>{
        const user =  new userModel(req.body);

    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).json(err.message);
    }
    })


// /user/login
routes.route("/login")
    .post(async (req,res)=>{
        // get user from database
        const user = await userModel.findOne({ username: req.body.username });

        // check if user exist
        if(!user){
            response = {
                status: false,
                message: "Invalid Username and Password"
            };

            return res.status(401).json(response)
        }

        // Check if password is correct
        passwordMatch = req.body.password
        if(passwordMatch != user.password){
            response = {
                status: false,
                message: "Invalid Password"
            };

            return res.status(401).json(response)
        }
        
        // If everything fine do this
        response = {
            status: true,
            username: user.username,
            message: "User logged in successfully"
        };

        res.json(response)


    })
    

// Global error 
routes.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json('Something Broke On User Routes');
    });


module.exports = routes