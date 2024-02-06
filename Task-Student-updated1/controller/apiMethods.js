const bcrypt = require('bcrypt')
const { studentModel } = require("../databases/db");
const subMarksModel = require('../databases/subMarksDB')
const {recordValidate, updateValidation, subMarksValidation } = require('../validation/validate')


module.exports.getDetails = async (req, res) => {  
  try{
    let allStudent = await studentModel.find({});

    return res.json({
    message: "Record of all students",
    data: allStudent,
  });
  }
  catch{
    return res.status(400).json({
      msg: "User not found"
    })
  }
  
};

module.exports.getOneStudent = async (req, res) => {   
  try{
    let oneStudent = await studentModel.findOne(req.params);

    return res.json({
    message: "Record of one student",
    data: oneStudent,
  });
  }
  catch{
    return res.status(400).json({
      msg: "User not found"
    })
  }
  
}

module.exports.postDetails = async (req, res) => {
  try {
    const value = await recordValidate.validateAsync(req.body);
    
    let password = req.body.password;
    let hashPassword = await bcrypt.hash(password,10)

    const record = await studentModel.create(
      {firstName :req.body.firstName,
      lastName :req.body.lastName,
      email : req.body.email,
      dialCode :req.body.dialCode,
      phoneNumber : req.body.phoneNumber,
      password : hashPassword}
    );

    return res.json({
      message: "Student Record Added",
      data: record,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports.updateDetails = async (req, res) => {
  //   const filter = { name: req.body.name };
  //   const update = { id: req.body.id };
  //  await studentModel.findOneAndUpdate(filter, update);
  // const id = {type: mongoose.Types.ObjectId}
  // const filter={_id:req.query.id}
  // const update={body:req.body}
  
  try{
    const value = await updateValidation.validateAsync(req.body);
    const existingRecord = await studentModel.updateOne(
      // filter,update);
      // return res.send(result);
      req.params,
      {
        $set: req.body,
      }
    );
    if(!existingRecord){
      return res.status(400).json({
        msg: 'User not found'
      })
    }
    //console.log(req.params);
    return res.json({
      msg: "updated",
    });
  }
  catch{
    return res.status(404).json({
      msg: "User not found"
    })
  }
  
};

module.exports.addSubMarks = async(req, res) => {
  try{
   
    const value =  await subMarksValidation.validateAsync(req.body);
    //console.log(value)
    
   const data = await subMarksModel.create({
      subject: req.body.subject,
      marks: req.body.marks   
      
  })
    return res.json({
      data
    });
  }
  catch{
    return res.status(404).json({
      msg: "User not found"
    })
  }
};

module.exports.deleteDetail = async (req, res) => {
  //const name = { name: req.body.name };
  try{
    const existingRecord = await studentModel.deleteOne(req.params);
    if(!existingRecord){
      return res.status(400).json({
        msg: 'User not found'
      })
    }
    return res.json({
    msg: "deleted",
  });
  }
  catch{
    console.error(error)
    return res.status(400).json({
      msg: "User not found"
    })
  }
};




