import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  
  export function authEmail(app) {
    /* Codigo Autenticación */
    const d = document;
    const auth = getAuth(app);
    let $appAuthEmail = d.getElementById("app-auth-email");
  
    onAuthStateChanged(auth, (user) => {
      console.log(user);
  
      if (user) {
        console.log("Usuario Autenticado");
        $appAuthEmail.innerHTML = `
          <p class="message" >Si ves este contenido es porque estás logueado</p>
          <button id="logout">Salir</button>
        `;
        
      } else {
        console.log("Usuario NO Autenticado");
        $appAuthEmail.innerHTML = `<p class="message">El contenido de esta sección es exclusivo para usuarios registrados</p>`;
      }
    });
  
    d.addEventListener("submit", (e) => {
      e.preventDefault();
      let $form = e.target;
  
      if ($form.matches("#form-signin")) {
        alert("Creando Cuenta");
        //console.log( form.email.value, form.pass.value);
  
        createUserWithEmailAndPassword(auth, $form.email.value, $form.pass.value)
          .then((res) => {
            console.log(res);
            $appAuthEmail.innerHTML = `<p class="message">Usuario creado con el correo <b>${$form.email.value}</b></p>`;
            $form.reset();
          })
          .catch((err) => {
            console.log(err);
            $appAuthEmail.innerHTML = `<p class="message">Ocurrio un error al crear la cuenta <b>${err.message}</b></p>`;
            $form.nombre.focus();
          });
      }
  
      if ($form.matches("#form-login")) {
        alert("Iniciando Sesión");
  
        signInWithEmailAndPassword(auth, $form.email.value, $form.pass.value)
          .then((res) => {
            console.log(res);
            console.log("logueoexistodo")
            $appAuthEmail.innerHTML = `<p class="message">Usuario logueado con el correo <b>${$form.email.value}</b></p>`;
            $form.reset();
            window.location.href = "juegolog.html";
          })
          .catch((err) => {
            console.log(err);
            $appAuthEmail.innerHTML = `<p class="message">Ocurrio un error al iniciar sesión <b>${err.message}</b></p>`;
            $form.pass.focus();
          });
      }
    });
  
    d.addEventListener("click", (e) => {
      if (e.target.matches("#logout")) {
        alert("Cerrando sesión");
        signOut(auth);
      }
    });
  }