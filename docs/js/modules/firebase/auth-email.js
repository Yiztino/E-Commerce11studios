import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithRedirect
  } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
  //"https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  //
  //
  
  export function authEmail(app) {
    /* Codigo Autenticación */
    const d = document;
    const auth = getAuth(app);

    let $appAuthEmail = d.getElementById("app-auth-email");
    let $btnLogout = d.getElementById("btnLogout")
    onAuthStateChanged(auth, (user) => {
      console.log(user);
  
      if (user) {
        console.log("Usuario Autenticado");
        $appAuthEmail.innerHTML = `
          <p class="message authenticated text-align-right " >Si ves este contenido es porque estás logueado</p>
           
          <button id="login" class="text-align-right btnContinuar" >Continuar</button>
         
        `;
        $btnLogout.innerHTML = `
          <div>
          
            <button id="logout" class="btnLogout">Logout from account</button>
          </div>
          
        `;
        //window.location.href = "/docs/html/cart/cartView.html";
        
      } else {
        console.log("Usuario NO Autenticado");
        $appAuthEmail.innerHTML = `<p class="message non-autheticated">El contenido de esta sección es exclusivo para usuarios registrados</p>`;
        $btnLogout.innerHTML = `
        <div>
        
          <button id="logout btnLogout disabled"> Es necesario que te logees para checar tu carrito</button>
        </div>
        
      `;
      }
    });
    //SI SE LLEnó el formulario
    d.addEventListener("submit", (e) => {
      e.preventDefault();
      let $form = e.target;
      //SI ESTÁ CREANDO UNA CUENTA SESIÓN
      if ($form.matches("#form-signin")) {
        alert("Creando Cuenta");
        //
        //console.log( form.email.value, form.pass.value);
  
        createUserWithEmailAndPassword(auth, $form.email.value, $form.pass.value)
          .then((res) => {
            console.log(res);
            $appAuthEmail.innerHTML = `<p class="message">Usuario creado con el correo <b>${$form.email.value}</b></p>`;
            const user = res.user;
            $form.reset();
          })
          .catch((err) => {
            console.log(err);
            $appAuthEmail.innerHTML = `<p class="message">Ocurrio un error al crear la cuenta <b>${err.message}</b></p>`;
            const errorCode = err.code;
            const errorMessage = err.message;
            $form.nombre.focus();
          });
      }
      //SI INICIA SESION 
      if ($form.matches("#form-login")) {
        alert("Iniciando Sesión");
  
        signInWithEmailAndPassword(auth, $form.email.value, $form.pass.value)
          .then((res) => {
            console.log(res);
            console.log("logueoexistodo")
            $appAuthEmail.innerHTML = `<p class="message">Usuario logueado con el correo <b>${$form.email.value}</b></p>`;
            const user = res.user;
            $form.reset();

            window.location.href = "cartView.html";

          })
          .catch((err) => {
            console.log(err);
            $appAuthEmail.innerHTML = `<p class="message">Ocurrio un error al iniciar sesión <b>${err.message}</b></p>`;
            $form.pass.focus();
            const errorCode = err.code;
            const errorMessage = err.message;
          });
      }
    });
    //SI SE SALE (logout)
    d.addEventListener("click", (e) => {
      if (e.target.matches("#logout")) {
        alert("Cerrando sesión");
        signOut(auth).then(() => {
            console.log("Succesfull logout");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
      }
      if (e.target.matches("#login")) {
        alert("Continuando, sesión ya iniciada");
        window.location.href = "cartView.html";
      }
    });
  }