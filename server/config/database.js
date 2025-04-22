const mongoose = require("mongoose");

require("dotenv").config();

const dbconnect = ()=> {
    mongoose.connect(process.env.MONGO_URL,{
        // useNewUrlParser : true,
        // useUnifiedTopology : true,
    })
    .then(() =>console.log("DB ka connection successfully"))
    .catch((error)=>{
        console.log("issue in DB");
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = dbconnect;