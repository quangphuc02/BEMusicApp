import Joi from 'joi';


export const validation = (data, schema, res) => {
    const joiSchema = Joi.object(schema).messages({
        'string.base': `Giá trị của {#label} phải là một chuỗi`,
        'number.base': `Giá trị của {#label} phải là một số`,
        'date.base': `Giá trị của {#label} phải là một ngày`,
        'any.required': `Bạn không truyền {#label}`,
        'string.pattern.base': `Giá trị của {#label} phải là 1 ObjectId `,
        'array.base': 'Giá trị của {#label} phải là 1 mảng'
    });
    const { error } = joiSchema.validate(data, { errors: { label: 'key' } });
    if (error) {
        res.status(400).json({
            status: false,
            mess: error.details[0].message
        });
        return true;
    }
    return false;
}



const ObjectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/)
const ArrayObjectId = Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
const String = Joi.string()
const Date = Joi.date()
const Number = Joi.number()


export {
    ObjectId,
    ArrayObjectId,
    String,
    Date,
    Number,
}