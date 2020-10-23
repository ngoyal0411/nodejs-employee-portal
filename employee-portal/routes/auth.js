const router=require('express').Router();
const Employee=require('../models/Employee');
const passport=require('passport');
const Role=require('../enum/role');
const authController = require('../controllers/auth.contoller');

//Register

router.get('/register', function(req, res, next){    
    // render to views/user/add.ejs
    console.log("inside register page");
    res.render('pages/auth/register', {
    page: 'Registration',
    menuId:'login',
    email: '',
    password: ''    
    });
});

router.post('/register',authController.create);

//Display Login Page
router.get('/login', function(req, res, next){    
   
    res.render('pages/auth/login', {
    page: 'Login',
    menuId:'login',
    email: '',
    password: ''    
    });
});

//Login
router.post('/login', passport.authenticate('local',{session:false}),
 async function(req,res,next){
    /** assign our jwt to the cookie */
    try{
        console.log('login');
        if(req.user){

        
    const jwtPayload=await req.user.getAuthJson();
    const jwt=jwtPayload.authToken;
   
    console.log(jwt);
    res.cookie('jwt', jwtPayload, { maxAge: 3600000 });
    //res.setHeader('authorization',`Bearer ${jwtPayload.authToken}`)
    //res.header(Authorization,'Bearer fgfhgh');
    if(jwtPayload!=undefined && jwtPayload.role==Role.Employee){
       
        res.redirect('/jobOpenings');
        }
       else if(jwtPayload!=undefined && jwtPayload.role==Role.Manager){
        
        //res.redirect('/jobOpenings/openingsPosted');
        res.redirect('/employee');

       }
    }
    else{
        return res.status(400).send("Email or password is invalid!");  
    }
}
    catch(err){
        return res.status(400).send("Something went wrong, please try again!");
    }

});

router.get('/logout', async function(req, res, next){    
    // render to views/user/add.ejs
    console.log("inside logout request");
    req.logOut();
    console.log(req.user);
    res.redirect('/');
});


// router.post('/login',async(req,res)=>{

//     //Checking if employee exist in the database
//     const employee=await Employee.findOne({email:req.body.email});

//     //Checking Password
//     var passwordIsValid=false;
//     if(employee)
//         passwordIsValid=await bcrypt.compare(req.body.password,employee.password);
    
        
//     if(employee && passwordIsValid)
//         return res.send(`Logged in successfully!`);
//     return res.status(400).send("Email or password is invalid!");    
// });
module.exports = router;