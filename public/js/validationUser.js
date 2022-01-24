window.addEventListener('load', function() {

    let formulario = document.querySelector("form")
    
formulario.addEventListener("submit", function(event){
    let errors = [];
    let campoNombre = document.querySelector("#first_name_val");
    let campoApellido = document.querySelector("#last_name_val");
    let campoMail = document.querySelector("#email_val");
    let campoImage= document.querySelector("#image_val");
let errores = document.querySelector(".errores")

    if(campoNombre.value == ""){
    errors.push("This field cannot be empty");
    }

    if(campoNombre.value == ""){
        errors.push("This field cannot be empty");
    }

    /* if(campoMail.value = document.getElementById("campo").value;
    if( !(/\w+([-+.']\w+)@\w+([-.]\w+).\w+([-.]\w+)/.test(valor)) ) {
        errors.push("This field must be an email");
    })
 */
 function checkEmail(campoMail) {
    var reg1 = /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;

    if (reg1.test(campoMail) == false) {
        errors.push("This field must be an email");
        }
  };

if(campoImage.value == ""){
        errors.push("This field cannot be empty");
    } else { function validateFile() 
        {
            var allowedExtension = ['jpeg', 'jpg'];
            var fileExtension = campoImage.value.split('.').pop().toLowerCase();
            var isValidFile = false;

                for(var index in allowedExtension) {

                    if(fileExtension === allowedExtension[index]) {
                        isValidFile = true; 
                        break;
                    }
                }

                if(!isValidFile) {
                    alert('Allowed Extensions are : *.' + allowedExtension.join(', *.'));
                }

                return isValidFile;
        }}
if (errores.length > 0){
    event.preventDefault();
    for(i=0; i<errores.length; i++){
errores.innerHTML += "<li> " + errores[i] + "</li>" 
    }
}

    });
})