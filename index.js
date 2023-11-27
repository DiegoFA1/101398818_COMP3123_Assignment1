var express = require('express')
var userRoutes = require('./routes/UserRoutes')
var employeeRoutes = require('./routes/EmployeeRoutes')
const mongoose = require('mongoose');



var app = express()
app.use(express.json());

app.use('/api/v1/user', userRoutes);
// http://localhost:8089/api/v1/user/signup
// http://localhost:8089/api/v1/user/login


app.use('/api/v1/employees', employeeRoutes);
// http://localhost:8089/api/v1/employees


mongoose.connect('mongodb+srv://diego:dvD48hSyLDBEsNxX@cluster0.ma52oy9.mongodb.net/comp3123_assignment1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

// Global error handler middleware (in index.js)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () => {
    console.log(``)
})