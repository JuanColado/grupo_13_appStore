function userLogueado(req, res, next) {
  res.locals.userLogueado = false; 

  if(req.session.userLogueado){
    res.locals.userLogueado = true;
   res.locals.userLogueado = req.session.userLogueado;
  }
  next();
};
module.exports = userLogueado;
