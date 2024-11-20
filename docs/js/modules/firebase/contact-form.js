export function contactForm() {
    let d = document,
      $form = d.getElementById("contact-form"),
      $inputs = d.querySelectorAll("#contact-form [required]");
  
    console.log($inputs);
  
    $inputs.forEach((el) => {
      let $span = d.createElement("span");
      $span.id = `${el.name}-error`;
      $span.innerText = el.title;
      $span.classList.add("bg-danger", "text-white", "p-2", "d-none", "fs-6");
      el.insertAdjacentElement("afterend", $span);
    });
  
    $form.addEventListener("input", (e) => {
      if (!e.target.matches("#contact-form [required]")) {
        return false;
      }
  
      let $input = e.target,
        pattern = $input.pattern,
        $msgError = d.getElementById(`${$input.name}-error`),
        condition;
  
      console.log($input, pattern);
  
      if (pattern) {
        let regex = new RegExp(pattern);
        condition = !regex.exec($input.value);
        console.log("El input tiene expreg", $input.value);
      } else {
        condition = $input.value === "";
        console.log("El input no tiene expreg");
      }
  
      if (condition) {
        $msgError.classList.add("d-block");
        $msgError.classList.remove("d-none");
      } else {
        $msgError.classList.remove("d-block");
        $msgError.classList.add("d-none");
      }
    });
  
    $form.addEventListener("submit", (e) => {
      //cancela el comportamiento por defecto que tenga el evento
      e.preventDefault();
      alert("Enviando Formulario");
  
      let $loader = d.getElementById("contact-loader"),
        $response = d.getElementById("contact-response");
  
      $loader.classList.remove("d-none");
      $loader.classList.add("d-block");
  
      setTimeout(() => {
        $loader.classList.add("d-none");
        $loader.classList.remove("d-block");
  
        $response.classList.remove("d-none");
        $response.classList.add("d-block");
  
        setTimeout(() => {
          $response.classList.add("d-none");
          $response.classList.remove("d-block");
        }, 5000);
      }, 5000);
    });
  }
  