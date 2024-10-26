let todos = [];

function addTodo() {
    const input = document.getElementById('todoInput');
    const todo = input.value.trim();
    if (todo) {
        todos.push({ text: todo, completed: false });
        input.value = '';
        renderTodos();
    }
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function renderTodos() {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'flex items-center bg-gray-100 p-3 rounded-lg cursor-move';
        li.draggable = true;
        li.innerHTML = `
            <span class="flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}" onclick="toggleTodo(${index})">${todo.text}</span>
            <button onclick="deleteTodo(${index})" class="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 text-sm">삭제</button>
        `;
        li.setAttribute('data-index', index);
        li.addEventListener('dragstart', dragStart);
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', drop);
        list.appendChild(li);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-index'));
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData('text/plain'));
    const toIndex = parseInt(e.target.closest('li').getAttribute('data-index'));
    if (fromIndex !== toIndex) {
        const [removed] = todos.splice(fromIndex, 1);
        todos.splice(toIndex, 0, removed);
        renderTodos();
    }
}

// 페이지 로드 시 초기 렌더링
renderTodos();
