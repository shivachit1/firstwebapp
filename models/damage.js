const mongoose = require('mongoose');
const Schema =mongoose.Schema;


const damageSchema = new Schema({
    userID:{
        type:String,
       
    },
    damageTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    condition:{
        type:String,
        required:true
    }
});

module.exports =  mongoose.model('Damage', damageSchema)