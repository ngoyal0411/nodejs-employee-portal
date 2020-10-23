const jwt=require('express-jwt');
require('dotenv').config();

function isAuthenticated() {
    return jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] });
  }


  function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.Employee or 'Employee') 
    // or an array of roles (e.g. [Role.Manager, Role.Employee] or ['Manager', 'Employee'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }2
            // authentication and authorization successful
            next();
        }
    ];
}
  
  module.exports = {
    isAuthenticated,
    authorize
  };
  