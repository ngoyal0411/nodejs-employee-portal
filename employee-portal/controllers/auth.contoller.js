const Employee = require('../models/Employee');


// Create and Save a new Employee
exports.create = async (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}
//Checking if employee already exist in the database
const employee=await Employee.findOne({email:req.body.email});
if(employee)
    return res.status(400).send({message:"Employee already exists with this email, please try with different one!"});

//Create a new employee
const newEmployee=new Employee({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email,
    isEmployee:req.body.isEmployee
});
await newEmployee.setHashedPassword();
// Save user in the database
newEmployee.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new user."
});
});
};


// Find a single User with a id
exports.findOne = (req, res) => {
    Employee.findById(req.params.id)
  .then(user => {
  if(!user) {
   return res.status(404).send({
   message: "User not found with id " + req.params.id
 });
}
 res.send(user);
}).catch(err => {
  if(err.kind === 'ObjectId') {
    return res.status(404).send({
    message: "User not found with id " + req.params.id
  });
}
return res.status(500).send({
  message: "Error getting user with id " + req.params.id
});
});
};

