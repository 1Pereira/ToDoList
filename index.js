const form = document.getElementById('form');
const input = document.getElementById('input');
const todoUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'))

if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault() //previne de recarregar a pagina ao enviar o formulario
    
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if (todo) {
        todoText = todo.text
    }

    if (todoText) {
        const todoEl = document.createElement('li')
        todoEl.innerText = todoText



        todoUL.appendChild(todoEl) //add a <li> a ul


        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLocalStorage()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault() //previne de abrir o menu ao apertar com o botão direito

            todoEl.remove()
            updateLocalStorage()
        })



        if (todo && todo.completed) {
            todoEl.classList.add('completed') //add a classe completed a task
        }

        input.value = '' //limpa o input apos o enter
        
        updateLocalStorage()
    }  
}

function updateLocalStorage () {
    var todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.firstChild.textContent,               //pega o texto da li
            completed: todoEl.classList.contains('completed')  //verifica se li tem a classe completed
        })                                                     //salva no array todos
    })

    localStorage.setItem('todos', JSON.stringify(todos))       //converte o array todos para uma string JSON
}                                                              //atualiza o localstorage sob a chave todos