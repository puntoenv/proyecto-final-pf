const Joi = require("joi");

const schemaUserRegister = Joi.object({
  name: Joi.string().required(),
  bio: Joi.string(),
  age: Joi.number().required(),
  image: Joi.string(),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});
module.exports = {
  schemaUserRegister,
  schemaUserLogin,
};
