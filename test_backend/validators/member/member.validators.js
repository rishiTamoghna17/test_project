const Joi = require('joi');

const addMemberValidator = () => {
    return (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            phone: Joi.string().required(),
            gender: Joi.string().valid("male", "female", "other").required(),
            age: Joi.number().required(),
            blood_group: Joi.string().optional(),
            type: Joi.string().valid("child", "mother", "father", "teacher").required()
        });

        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

const getMembersValidator = () => {
    return (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string().optional(),
            type: Joi.string().valid("child", "mother", "father", "teacher").optional()
        });

        const { error } = schema.validate(req.query);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

module.exports = {
    addMemberValidator,
    getMembersValidator
};