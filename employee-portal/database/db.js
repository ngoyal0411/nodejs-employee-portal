const mongoose = require('mongoose');

function connectToDB(dbURL){
    mongoose.connect(dbURL, { useNewUrlParser: true,useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
}
module.exports=
{
    connectToDB,
}
