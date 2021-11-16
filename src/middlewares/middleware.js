const {check} = require('express-validator');


const middlewares=[
check ('first_name')
.notEmpty()
.withMessage('This field must contains your first name'),

check ('last_name')
.notEmpty()
.withMessage('This field must contains your last name'),

check ('email')
.notEmpty().withMessage('This field must contains a valid email')
.isEmail()
,

check ('password')
.notEmpty().withMessage("This field can't be blank")
.isLength({min : 10, max: 100}).withMessage('The password must contains at least 10 caracters.'),



]

module.exports = middlewares;

