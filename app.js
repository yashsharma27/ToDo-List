//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filteroption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deletecheck);
filteroption.addEventListener("click", filterTodo);

//Functions

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    // ToDo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todoInput.value;
    newToDo.classList.add('todo-item');
    todoDiv.appendChild(newToDo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value)
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value = "";
}
function deletecheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
    });
}
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

