const mongoose = require('mongoose');

const db_link = "mongodb+srv://student:xtjjJJzFeehsYXtR@record.bpujkw6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(db_link)
.then(function(db){
    console.log("database connected")
})
.catch(function(err){
    console.log(err)
})

const subMarksSchema = new mongoose.Schema({

    id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'studentSchema'
    },

    subject : {
        type : String,
    },

    marks : {
        type : Number,
    }
})

const subMarksModel = mongoose.model('subMarksModel', subMarksSchema);

module.exports = subMarksModel;