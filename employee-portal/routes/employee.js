const express=require('express');
const router=express.Router();
const JobOpening=require('../models/JobOpenings');
const JobOpeningController=require('../controllers/jobOpening.controller');
const passport=require('passport');

router.get('/',passport.authenticate('jwt', {session: false}),
  async (req, res,next) => {
JobOpeningController.getAllOpenings().then(data=>{
    console.log(data);
    res.send(data);
}).catch(err=>{
    res.send(err);
});

  });
  
router.post('/apply/:id',async(req,res,next)=>{

    //Create a new employee
    console.log("welcome");
    const newJobOpening=new JobOpening({
        projectName:req.body.projectName,
        clientName:req.body.clientName,
        technologies:req.body.technologies,
        role:req.body.role,
        jobDescription:req.body.jobDescription,
        createdBy:req.body.createdBy
    });

    try{
        console.log("hello");
        const savedJobOpening = await newJobOpening.save();
        return res.send(`New job opening is created with open status!`);
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports=router;