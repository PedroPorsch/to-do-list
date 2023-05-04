// Seleção elementos

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;


// Funções

function addTask(value){

    const todo = document.createElement('div')
    todoList.appendChild(todo)
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = value;
    todo.appendChild(todoTitle)

    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn);

    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-todo')
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeBtn);
}

function finishTask(e){
    e.target.parentNode.classList.toggle('done')
    console.log(e.target.parentNode)
}

function removeTask(e){
    e.target.parentNode.remove();
}

function toggleForms(){
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
}

function updateTodo(text){

    let todos = document.querySelectorAll('.todo')
    console.log(todos)

    todos.forEach((item)=>{
        let todoTitle = item.querySelector('h3');
        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }

    })

}

function cancelEdit(e){
    e.preventDefault();
    toggleForms();
}

// Eventos

todoForm.addEventListener('submit', function(e){

    e.preventDefault();

    const inputValue = todoInput.value;
    todoInput.value = ''

    if(inputValue){
        addTask(inputValue);
    }
})

document.addEventListener('click', function(e){
    const targetElement = e.target;
    const parentElement = targetElement.closest('div')
    let todoTitle;

    if(parentElement && parentElement.querySelector('h3')){
        todoTitle = parentElement.querySelector('h3').innerText || '';
        console.log(todoTitle)
    }

    if(e.target.classList.contains('finish-todo')){
        finishTask(e)
    }

    if(e.target.classList.contains('edit-todo')){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;

    }

    if(e.target.classList.contains('remove-todo')){
        removeTask(e)
    }
   
   
})

cancelEditBtn.addEventListener('click', cancelEdit);

editForm.addEventListener('submit', function(e){

    e.preventDefault();
    
    editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})