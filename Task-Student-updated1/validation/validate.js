const joi = require("joi");

const recordValidate = joi.object({
    firstName: joi.string().min(3).max(30).required(),
  
    lastName: joi.string().min(3).max(30).required(),
  
    email: joi.string().email().required(),
  
    dialCode: joi.string().required(),
  
    phoneNumber: joi.string().required().length(10).pattern(/^[0-9]+$/),

    password: joi.string().required()
});

const updateValidation = joi.object({
    firstName: joi.string().min(3).max(30).optional(),
  
    lastName: joi.string().min(3).max(30).optional(),
  
    email: joi.string().email().optional(),
  
    dialCode: joi.string().optional(),
  
    phoneNumber: joi.string().optional().length(10).pattern(/^[0-9]+$/),
})

const subMarksValidation = joi.object({
    subject: joi.string().required(),

     marks: joi.number().required()
})

  module.exports = {
    recordValidate,
    updateValidation,
    subMarksValidation
  };