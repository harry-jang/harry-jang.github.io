const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
    event.preventDefault();
    console.log(event);
    const username = loginInput.value;
    console.log(username);
}


loginForm.addEventListener("submit", onLoginSubmit);