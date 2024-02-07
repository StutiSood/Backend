const mongoose = require('mongoose');


const subMarksSchema = new mongoose.Schema({

    id: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'studentModel'
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