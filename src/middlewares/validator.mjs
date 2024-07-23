import Joi from 'joi';

export default (schema) => {
    return (req, res, next) => {
        const object = {};
        if (Object.keys(req.body).length) {
            console.log(req.body);
            object.body = req.body;
        }
        if (Object.keys(req.params).length) {
            object.params = req.params;
        }
        if (Object.keys(req.query).length) {
            object.query = req.query;
        }
        const { value, error } = Joi.compile(schema)
            .prefs({ errors: { label: 'key' }, abortEarly: false })
            .validate(object);
        // const { error } = schema.validate(req.body).validate(req.params).validate(req.query);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        Object.assign(req, value);
        return next();
    };
};
