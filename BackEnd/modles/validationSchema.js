const Joi=require("joi");

const joiUserSchema=Joi.object({
    name:Joi.string(),
    username:Joi.string().alphanum().min(3).max(30),
    email:Joi.string().email().required(),
    password:Joi.string().required()
})

const joiPoductSchema=Joi.object({
    id:Joi.string(), 
    title:Joi.string().required(),
    description:Joi.string(),
    price:Joi.number().positive(),
    image:Joi.string(),
    gender:Joi.string(),
    category:Joi.string(), 
})


module.exports={joiUserSchema,joiPoductSchema}