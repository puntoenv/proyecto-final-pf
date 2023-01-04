const Joi = require("joi");

const schemaUserRegister = Joi.object({
  username: Joi.string().required(),
  bio: Joi.string(),
  age: Joi.number().required(),
  image: Joi.string(),
  mail: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string().min(8).required(),
});

module.exports = {
  schemaUserRegister,
};
