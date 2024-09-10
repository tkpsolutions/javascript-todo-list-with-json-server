const API_URL = 'http://localhost:3000/todos';
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Fetch and Display TODOs
async function fetchTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();
    displayTodos(todos);
}

// Display TODOs in the table
function displayTodos(todos) {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {

        var content = `
        <tr>
            <td>${index + 1}</td>
            <td>${todo.title}</td>
            <td>${todo.status}</td>
            <td>
            `;

                if( todo.status === 'Pending' ){
                    content += `<button class="btn btn-success btn-sm" onclick="doneTodo('${todo.id}', '${todo.title}')">Done</button>`;
                }
                content +=  `<button class="btn btn-danger btn-sm" onclick="deleteTodo('${todo.id}')">Delete</button>
            </td>
        </tr>`;

        todoList.innerHTML += content;
    });
}

// Add new TODO
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('todo-title').value;

    if (title.trim() === '') 
    {
        "Please fill the title";
        return;
    }

    //single json object creation
    const newTodo = { title: title, status: 'Pending' };

    //connecting the to json server with post method
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
    });

    document.getElementById('todo-title').value = '';
    fetchTodos();
});

// Delete TODO
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    fetchTodos();
}

//Update the status
async function doneTodo(id, title) {

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, status: "Completed" })
    });
    fetchTodos();
}

// Initial Fetch
fetchTodos();