
const d = document;
const $signUpSwitch = d.querySelector("#signup-switch");
const $loginSwitch = d.querySelector("#login-switch");
const loginForm = d.querySelector('.login-form')
const signupForm = d.querySelector('.signup-form')

function swapPos() {
    $signUpSwitch.addEventListener("click", function (e) {
        loginForm.classList.toggle('above')
        loginForm.classList.toggle('below')
        signupForm.classList.toggle('above')
        signupForm.classList.toggle('below')
    });
    $loginSwitch.addEventListener("click", function (e) {
        loginForm.classList.toggle('above')
        loginForm.classList.toggle('below')
        signupForm.classList.toggle('above')
        signupForm.classList.toggle('below')
    });
}

swapPos();