window.addEventListener("load", function () {
    let formulario = document.querySelector("form");
  
    formulario.addEventListener("submit", function (event) {
      let errors = [];
      let campoNombreProducto = document.querySelector("#product_val");
      let campoImage = document.querySelector("#product_image_val");
      let campoDescripcion = document.querySelector("#description_val");
      let errores = document.querySelector(".errores");
      
      if (campoNombreProducto.value == "") {
        errors.push("Product name field cannot be empty");
      }else if(campoNombreProducto.value.length < 5){
        errors.push('Product name field must contain at least 5 characters.');
      };
      if (campoDescripcion.value == "") {
        errors.push("Product description field cannot be empty");
      }else if(campoDescripcion.value.length < 10){
        errors.push('Product description  must contain at least 20 characters')
    }
      if (campoImage.value == "") {
        errors.push("Image field cannot be empty");
      } else {
        function validateFile() {
          var allowedExtension = ["jpeg", "jpg"];
          var fileExtension = campoImage.value.split(".").pop().toLowerCase();
          var isValidFile = false;
  
          for (var index in allowedExtension) {
            if (fileExtension === allowedExtension[index]) {
              isValidFile = true;
              break;
            }
          }
  
          if (!isValidFile) {
            alert("Allowed Extensions are : *." + allowedExtension.join(", *."));
          }
  
          return isValidFile;
        }
      }
      if (errors.length > 0) {
        event.preventDefault();
        for (i = 0; i < errors.length; i++) {
          errores.innerHTML += "<li> " + errors[i] + alert (errors[i]) + "</li>";
        }
      }
    });
  });
  