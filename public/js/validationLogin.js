window.addEventListener("load", function () {
    let formulario = document.querySelector("form");
  
    formulario.addEventListener("submit", function (event) {
      let errors = [];
      let campoMail = document.querySelector("#email_val");
      let campoPassword = document.querySelector("#password_val");
      let errores = document.querySelector(".errores");
  
      
      if (campoMail.value == "") {
        errors.push("Email field cannot be empty");
      } else {
        function checkEmail(campoMail) {
          var reg1 = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
  
          if (reg1.test(campoMail) == false) {
            errors.push("Email is not valid");
          }
        }
      }
      if (campoPassword.value == "") {
        errors.push("Passowrd field cannot be empty");
      }else if(campoPassword.value.length < 10){
        errors.push('Password field must contain at least 10 characters')
    }
      
      if (errors.length > 0) {
        event.preventDefault();
        for (i = 0; i < errors.length; i++) {
          errores.innerHTML += "<li> " + errors[i] + alert(errors[i]) + "</li>";
        }
      }
    });
  });
  