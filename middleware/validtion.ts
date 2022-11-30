import { string } from "joi";

const Joi = require('joi');
// register validation
const registerValidation = (data: any) => {
    const schema = Joi.object({
        name: [{
            firstName: Joi.string().min(3).required(),
            middleName: Joi.string().min(3).required(),
            surName: Joi.string().min(3).required(),

        }

        ],
        date: Joi.date().required(),
        NumberCard: Joi.string().min(1).max(20).required(),
        bloodGroup: Joi.string().min(3).required(),


     
        




        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required(),
        mobile: Joi.string().min(1).max(10).required(),
    

      

        contactPerson: [{
            name: [{
                firstName: Joi.string().min(3).required(),
             

                surName: Joi.string().min(3).required(),
            }],
            mobile: Joi.string().min(1).max(10).required(),
            email: Joi.string().min(5).required().email(),
            address: [{
                building: Joi.string().min(1).required(),
                city: Joi.string().min(1).required(),
                taluk: Joi.string().min(1).required(),
                district: Joi.string().min(1).required(),
                state: Joi.string().min(1).required(),
                pinched: Joi.number().min(10).max(999999).required(),

            }]


        }], 
     
        address: [{
            building: Joi.string().min(3).required(),   
            city: Joi.string().min(3).required(),
            taluk: Joi.string().min(3).required(),
            district: Joi.string().min(3).required(),
            state: Joi.string().min(3).required(),
            pinched: Joi.number().min(1).max(999999).required(),   
        }],








      
  
        






    });
    return schema.validate(data);
};
// login validation
const loginValidation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().min(5).required().email(),
        password: Joi.string().min(5).required()
    });
    return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;   
