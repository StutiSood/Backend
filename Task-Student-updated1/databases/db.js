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

    password: {
        type: String,
        required: true
    }
}) 

// studentSchema.pre('save', async function() {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password, salt);
//     //console.log(hashedString);
//     this.password = hashedString;
// })

//saltroundes = 10;
// const hashPassword = await bcrypt.hash(password, saltroundes)

const studentModel = mongoose.model('studentModel', studentSchema);


module.exports= {studentModel}