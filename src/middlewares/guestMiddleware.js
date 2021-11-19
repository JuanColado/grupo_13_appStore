const {check} = require('express-validator');
//este middleware seria para q si no estoy logueado no pueda ir a la pag profile

function  guestMiddleware (req,res,next){
    if(!req.session.userLogueado){
return res.redirect('/users/login')
    }
next();
}

module.exports = guestMiddleware;