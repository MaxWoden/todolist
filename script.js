const form = document.querySelector(".app_form");
const input = document.querySelector(".app_form__input")
const tasks = document.querySelector(".app_tasks");
const ObjLocalStorage = Object.entries(localStorage);

function saveTodo(value, event = null){
    let task = value;

    const taskEdit = document.createElement("button");
    taskEdit.innerText = "Edit";
    taskEdit.classList.add("actions__edit");

    const taskDelete = document.createElement("button");
    taskDelete.classList.add("actions__delete");
    taskDelete.innerText = "Delete";

    const taskActions = document.createElement("div");
    taskActions.classList.add("actions");
    taskActions.appendChild(taskEdit)
    taskActions.appendChild(taskDelete);

    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.classList.add("app_tasks__input");
    taskInput.value = task;
    taskInput.setAttribute("readonly", "readonly");
    
    const taskContent = document.createElement("div");
    taskContent.classList.add("app_tasks__content");
    taskContent.appendChild(taskInput);

    const taskElement = document.createElement("li");
    taskElement.classList.add("app_tasks__item");
    taskElement.appendChild(taskContent);
    taskElement.appendChild(taskActions);
    tasks.appendChild(taskElement);

    if(event){
        event.preventDefault();
        form.reset();
        for(let i = 0; i < localStorage.length + 1; i ++){
            if(!localStorage.getItem(i)){
                localStorage.setItem(i, task);
                break;
            }
        }
    }

    taskEdit.addEventListener("click", () =>{
        if(taskEdit.innerText.toLowerCase() === "edit"){
            taskInput.removeAttribute("readonly");
            taskInput.focus();
            taskEdit.innerText = "Save";
            taskInput.style.cursor = "text";
            taskEdit.classList.add("actions__save");
        }
        else{
            taskInput.setAttribute("readonly", "readonly");
            taskEdit.innerText = "Edit";
            taskInput.style.cursor = "default";
            taskEdit.classList.remove("actions__save");
        }
        for(let i = 0; i < max + 1; i++){
            if(localStorage.getItem(i) === task){
                localStorage.setItem(i, taskInput.value);
                break;
            }
        }
    });

    taskInput.addEventListener("keypress", (event) =>{
        if(event.code === "Enter" && taskEdit.innerText.toLowerCase() === "save"){
            taskEdit.click();
        }
    });

    taskDelete.addEventListener("click", () =>{
        for(let i = 0; i < max + 1; i++){
            if(localStorage.getItem(i) === task){
                localStorage.removeItem(i);
                break;
            }
        }
        tasks.removeChild(taskElement);
    })
}
form.addEventListener("submit", (event) => saveTodo(input.value, event));

let max = 0;
for(let i = 0; i < ObjLocalStorage.length; i++){
    if(ObjLocalStorage[i][0] > max){
        max = ObjLocalStorage[i][0];
    }
}

for(let i = 0; i < max + 1; i++){
    if(localStorage.getItem(i) != null){
        saveTodo(localStorage[i]);
    }
}