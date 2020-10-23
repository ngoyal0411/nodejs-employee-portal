const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require("dotenv").config();
const jwtSecret=process.env.JWT_SECRET;
const Role=require('../enum/role');


const Schema = mongoose.Schema;
const saltRounds = process.env.SALT_ROUNDS || 10;

const EmployeeSchema= new Schema({
    name:
    { 
        type: String, 
        required: 'Employee name is required.' 
    },
    password:
    { 
        type: String,  
        required: 'Password is required.',
        minlength:6
    },
    email: 
    { 
        type: String,  
        required: 'Email id is required.' 
    },
    isEmployee:
    { 
        type: Boolean,
        default:true 
    },
})

EmployeeSchema.methods.getRole = async function () {
  const role=await this.isEmployee?Role.Employee:Role.Manager;
    return role;
};

EmployeeSchema.methods.setHashedPassword = async function () {
    const hashedPassword = await bcrypt.hash(this.password, +saltRounds);
    this.password = hashedPassword;
  };
  
  EmployeeSchema.methods.validatePassword = async function (password) {
    const isValidPassword = await bcrypt.compare(password, this.password);
    return isValidPassword;
  };

  EmployeeSchema.methods.generateJWTToken = async function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 1);
    
    return jwt.sign(
      {
        id: this._id,
        username: this.email,
        role:await this.getRole(),
        exp: parseInt(expirationDate.getTime() / 1000, 10),
      },
      jwtSecret
    );
  };
  

  EmployeeSchema.methods.getAuthJson=async function(){
      return {
          email:this.email,
          employeeId:this._id,
          role:await this.getRole(),
          authToken:await this.generateJWTToken(),
      };
  };

module.exports=mongoose.model('Employee',EmployeeSchema);