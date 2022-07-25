const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const link = document.querySelector("a");

const HIDDEN_CLASSNAME = "hidden";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    greeting.innerText = `Hello ${username}!`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

function onClickLink(event) {
    event.preventDefault();
    console.log("clicked!");
    console.dir(event);
}


loginForm.addEventListener("submit", onLoginSubmit);
link.addEventListener("click", onClickLink);