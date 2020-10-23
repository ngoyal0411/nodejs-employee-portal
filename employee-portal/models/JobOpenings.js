const mongoose=require('mongoose');
const jobStatus=require('../enum/jobOpeningStatus');

const Schema = mongoose.Schema;

const JobOpeningSchema= new Schema({
    projectName:
    { 
        type: String, 
        required: 'Project name is required.' 
    },
    clientName:
    { 
        type: String,  
        required: 'Client name is required.',
        minlength:6
    },
    technologies: 
    { 
        type: String,  
        required: 'Atleast one technology is required.' 
    },
    role:
    { 
        type: String,
        required:'Role is required.'
    },
    jobDescription:{
        type:String,
    },
    status:{
        type:String,
        default:jobStatus.Open
    },
    createdBy:{
        type:String,
        required:'This field is required.'
    }
});

  

module.exports=mongoose.model('JobOpenings',JobOpeningSchema);