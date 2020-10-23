const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
require('dotenv').config();
const Employee = require('../models/Employee');

passport.use(
    new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
	}, function (email, password, done) {
   
    Employee.findOne(
      {
        email,
      },
      async (err, emp) => {
        if (err) {
          console.log(err)
         return done(err);
        }

        if (!emp || !(await emp.validatePassword(password))) {
          return done(null,false,'Invalid emailid or password');
        }
        return done(null, emp);
      }
    );
  })
);

passport.use(new JWTStrategy({
  jwtFromRequest: req => req.cookies.jwt.authToken,
  secretOrKey: process.env.JWT_SECRET,
},
(jwtPayload, done) => {
  console.log("hello");
  if (Date.now() > jwtPayload.expires) {
    return done('jwt expired');
  }

  return done(null, jwtPayload);
}
));