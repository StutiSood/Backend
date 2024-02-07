const jwt = require('jsonwebtoken')
const secretKey = "secretKey";
const {studentModel} = require('../databases/db');
const bcrypt = require('bcrypt')
const { v4 : uuidv4 } = require('uuid');
const { loginValidation } = require('../validation/validate');



module.exports.login = async(req, res) => {
    // id = req.params;
    console.log("hh")
    const value = await loginValidation.validateAsync(req.body)
    // console.log("hhhh")

    const email = req.body.email
    const password = req.body.password
    const dialCode = req.body.dialCode
    const phoneNumber = req.body.phoneNumber
    
    const existingUser = await studentModel.findOne(
        {
            $or : [{email : email},{ dialCode : dialCode, phoneNumber : phoneNumber}]
        }
    );

 
    
    if(!existingUser){
        res.status(500).json({
            Message: "User not found"
        })
    }

    const cmpPwd = existingUser.password;
    const comparePassword = bcrypt.compare(password, cmpPwd);
    const id = existingUser._id;

        // if(dialCode !== +91){
        //     res.send('Dial Code is wrong')
        // }

        if(comparePassword){
        const jti = uuidv4();

        const addJti = await studentModel.updateOne({_id : id}, {jti : jti});

        jwt.sign({ id:id , jti}, secretKey, { expiresIn: '24h'}, (err, token) => {
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
                result : "Token is invalid"
            })
        }
        else{ 
            let data = await studentModel.findOne({_id:authData.id}, {jti: authData.jti});
            res.json({
                message: "Loggedin Successfully",
                data
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