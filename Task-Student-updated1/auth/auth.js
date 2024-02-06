const express = require('express')
const jwt = require('jsonwebtoken')
const secretKey = "secretKey";
const {studentModel} = require('../databases/db');
const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid');


module.exports.login = async(req, res) => {
    // id = req.params;

    const email = req.body.email
    const password = req.body.password
    //const phoneNo = req.body.phoneNumber
    //console.log(phoneNo)

    const existingUser = await studentModel.findOne({email : email});
    // console.log(existingUser.phoneNumber)
    if(!existingUser){
        res.status(500).json({
            Message: "User not found"
        })
    }


    const cmpPwd = existingUser.password;

    const comparePassword = bcrypt.compare(password, cmpPwd);
    
    const id = existingUser._id;
    if(comparePassword){
        const jti = uuidv4();
        jwt.sign({ id , jti}, secretKey, { expiresIn: '1h'}, (err, token) => {
            res.json({
                token
            })
        })
    }
}

module.exports.verifyToken = (req,res) => {
    // const token = req.token;
    // console.log(token);
    jwt.verify(req.token, secretKey, async(err, authData) => {
        if(err){
            res.send({
                result : "invalid token"
            })
        }
        else{ 
            let data = await studentModel.findOne({id:authData.id});
            res.json({
                message: "profile accessed",
                authData
            })
            res.send(data);
        }
    })
}

module.exports.verify = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];  //also access req.headers.authorization
    //console.log(bearerHeader)
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        
        req.token = token;
        //console.log(token)
        next();
    }
    else{
        res.send({
            result: 'Token is not valid'
        })
    }
}