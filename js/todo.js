const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
// == const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODOS_KEY = "todos";
let toDos = [];

function saveToDos() {
    const jsonToDos = JSON.stringify(toDos);
    localStorage.setItem(TODOS_KEY, jsonToDos);
}

function loadToDos() {

    toDos = parsedToDos;
}

function deleteToDo (event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((element) => element.id !== parseInt(li.id));
    saveToDos();
 }

function paintToDo(newToDoObj) {
    const li = document.createElement("li");
    li.id = newToDoObj.id;
    const span = document.createElement("span");
    span.innerText = newToDoObj.text;
    const button = document.createElement("button");
    button.style.backgroundColor = "unset";
    button.style.borderColor = "unset";
    button.style.marginLeft = "10px";
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button); 
    toDoList.appendChild(li);
}

function handleTodoSubmit(event) {
    event.preventDefault();
    
    const newToDo = toDoInput.value;
    const newToDoObj = {
        text: newToDo,
        id: Date.now()
    }
    toDoInput.value = "";
    
    toDos.push(newToDoObj);
    paintToDo(newToDoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleTodoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;

    parsedToDos.forEach((item) => {
        paintToDo(item);
    });
}