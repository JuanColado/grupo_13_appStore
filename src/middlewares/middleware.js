const {check} = require('express-validator');


const middlewares=[
check ('first_name')
.notEmpty()
.withMessage('Debes completar este campo con tu nombre.'),

check ('last_name')
.notEmpty()
.withMessage('Debes completar este campo con tu apellido.'),

check ('email')
.notEmpty().withMessage('Debes completar este campo con un E-mail valido.')
.isEmail()
,

check ('password')
.notEmpty().withMessage('Este campo no puede estar vacio')
.isLength({min : 10, max: 100}).withMessage('Debes completar este campo con una contraseña de minimo 10 carateres.'),



]

module.exports = middlewares;

