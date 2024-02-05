const mongoose = require('mongoose');

const db_link = "mongodb+srv://student:xtjjJJzFeehsYXtR@record.bpujkw6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected")
})
.catch(function(err){
    console.log(err)
})

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    dialCode: {
        type: String,
        required: true,
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    // subject : {
    //     type : String,
    //     required: true,
    // },

    // marks : {
    //     type : Number,
    //     required : true,
    // }
}) 

const studentModel = mongoose.model('studentModel', studentSchema);


module.exports= studentModel;