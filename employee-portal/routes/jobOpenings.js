const express=require('express');
const router=express.Router();
const jobOpeningController=require('../controllers/jobOpening.controller');
const passport=require('passport');


router.get('/',
  passport.authenticate('jwt', {session: false}),
  (req, res,next) => {
    jobOpeningController.getOpeningsCreatedByManager(req.cookies.jwt.email).then(data=>{
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
        
  });

  router.get('/openingsPosted',
  passport.authenticate('jwt', {session: false}),
  (req, res,next) => {
    console.log(req.user);
    jobOpeningController.getOpeningsCreatedByManager(req.cookies.jwt.email).then(data=>{
        req.header('Authorization',`Bearer hkjkjj`);
        res.send(data);
    }).catch(err=>{
        res.send(err);
    })
        
  });
// router.post('/createOpening',async(req,res,next)=>{

//     //Create a new employee
//     console.log(req.cookies.jwt);
//     const newJobOpening=new JobOpening({
//         projectName:req.body.projectName,
//         clientName:req.body.clientName,
//         technologies:req.body.technologies,
//         role:req.body.role,
//         jobDescription:req.body.jobDescription,
//         createdBy:req.body.createdBy
//     });

//     try{
//         const savedJobOpening = await newJobOpening.save();
//         return res.send(`New job opening is created with open status!`);
//     }catch(err){
//         res.status(400).send(err);
//     }
// });


router.post('/createOpening',jobOpeningController.create);




module.exports=router;