const JobOpening = require('../models/JobOpenings');


// Create and Save a new Employee
exports.create = async (req, res) => {
// Validate request
if(!req.body) {
  return res.status(400).send({
  message: "Please fill all required field"
});
}

//Create a new Job Opening
const newJobOpening=new JobOpening({
    projectName:req.body.projectName,
    clientName:req.body.clientName,
    technologies:req.body.technologies,
    role:req.body.role,
    jobDescription:req.body.jobDescription,
    createdBy:req.cookies.jwt.email
});

// Save user in the database
newJobOpening.save()
  .then(data => {
  res.send(data);
}).catch(err => {
  res.status(500).send({
  message: err.message || "Something went wrong while creating new job opening."
});
});
};

exports.getAllOpenings = async () => {
    try{
const jobOpenings=await JobOpening.find({});
return jobOpenings;
}
catch(err){
 return {message:err};
}
}

exports.getOpeningsCreatedByManager = async (email) => {
    try{
        const jobOpenings=await JobOpening.find({createdBy:email});
        return jobOpenings;
    }catch(err){
    return {message:err};
    }
}

