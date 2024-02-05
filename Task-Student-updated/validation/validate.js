const joi = require("joi");

const recordValidate = joi.object({
    firstName: joi.string().min(3).max(30).required(),
  
    lastName: joi.string().min(3).max(30).required(),
  
    email: joi.string().email().required(),
  
    dialCode: joi.string().required(),
  
    phoneNumber: joi.number().required(),

    subject: joi.number().optional(),

    marks: joi.number().optional()
});

  module.exports = recordValidate;