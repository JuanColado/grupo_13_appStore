const {check} = require('express-validator');
//este middleware seria para q si estoy logueado no pueda ir a la pag register ni devuelta al login

function  authMiddleware (req,res,next){
    if(req.session.userLogueado){
return res.redirect('/users/profile')
    }
next();
}

module.exports = authMiddleware;