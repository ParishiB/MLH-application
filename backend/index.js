var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const EmployeeModel = require('./models/Employee')
require('dotenv').config(); 

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(cors());
app.use(express.json());


app.post("/login", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI_EMPLOYEE);
    
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    mongoose.disconnect();
  }
});


app.post('/register', (req, res) => {
  mongoose.connect(process.env.MONGODB_URI_EMPLOYEE);
  
  EmployeeModel.create(req.body)
    .then(employees => {
      res.json(employees);
      mongoose.disconnect();
    })
    .catch(err => {
      res.json(err);
      mongoose.disconnect();
    });
});


// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT =  8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const add = (function () {
// let counter = 0;
// return function (){ countr += 1; return counter}
// })
// 
// 
// 