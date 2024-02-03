const mongoose = require('mongoose');

const db_link = "mongodb+srv://student:xtjjJJzFeehsYXtR@record.bpujkw6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected")
})
.catch(function(err){
    console.log(err)
})

const studentSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    age: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true
    }
}) 

const studentModel = mongoose.model('studentModel', studentSchema);

module.exports=studentModel