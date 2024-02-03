const express = require('express');
const studentModel = require('./db');
const joi = require('joi');
const router=express.Router()

router.get('/get',async (req,res)=>{
    let allStudent = await studentModel.find({});
    
    return res.json({
        message: 'Record of all students',
        data : allStudent
    })
})

const recordValidate = joi.object({
    id: joi.string(),

    name : joi.string()
        .min(3)
        .max(30)
        .required(),

    age: joi.number()
        .required(),

    gender: joi.string(),

    email : joi.string()
           .email()
})

router.post('/post', async(req,res)=>{
    
    try {
        const value = await recordValidate.validateAsync(req.body);
        const record = req.body;
        await studentModel.create(record);
        return res.json({
            message: 'Student Record Added',
            data : record
    })
    }
    catch (err) { 
        console.log(err)
        return res.json({
            msg:"error"
        })
    }
    
})

router.put('/put', async(req, res)=>{
    const filter={name:req.body.name}
    const update={id:req.body.id}
    await studentModel.findOneAndUpdate(filter , update)
    return res.json({
        msg:"updated"
    })
})

router.delete('/delete',async(req, res) => {
    const name = {name: req.body.name}
    await studentModel.deleteOne(name);
    return res.json({
        msg:"deleted"
    })
})

module.exports=router
