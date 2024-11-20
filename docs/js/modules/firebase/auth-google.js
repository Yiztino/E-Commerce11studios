import {
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
  
  export function authGoogle(app) {
    const d = document,
      auth = getAuth(app),
      provider = new GoogleAuthProvider(),
      $appAuthGoogle = d.getElementById("app-auth-google");
  
    onAuthStateChanged(auth, (user) => {
      console.log(user);
  
      if (user) {
        console.log("Usuario Autenticado");
        $appAuthGoogle.innerHTML = `
          <p>Si ves este contenido es porque estas logueado</p>
          <button id="google-logout">Salir</button>
          <p>Bienvenido ${user.displayName}</p>
          <img src="${user.photoURL}" alt="${user.displayName}">
        `;
      } else {
        console.log("Usuario NO Autenticado");
        $appAuthGoogle.innerHTML = `<p class="message">El contenido de esta sección es exclusivo para usuarios registrados</p>`;
        
      }
    });
  
    d.addEventListener("click", (e) => {
      console.log("Haz hecho click")
      if (e.target.matches("#google-login")) {
        alert("Ingresando con Google");
        console.log('Presionaste ingresar con google')
        signInWithPopup(auth, provider)
          .then((res) => {
            console.log(res);

            //aqui nos debería mandar al juego
           $appAuthGoogle.innerHTML = `<p class="message">Bienvenido ${res.user.displayName}</p>`;
          })
          .catch((err) => {
            console.log(err);
            //aqui nos aleja del jeugo
            $appAuthGoogle.innerHTML = `<p class="message" >Error: <i>${err.code}</i> - <b>${err.message}</b></p>`;
          });
      }
  
      if (e.target.matches("#google-logout")) {
        alert("Cerrando sesión");
        signOut(auth);
      }
    });
  }