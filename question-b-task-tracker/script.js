const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const filterSelect = document.getElementById('filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  const filter = filterSelect.value;
  const filteredTasks = filter ? tasks.filter(t => t.priority === filter) : tasks;

  filteredTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = `${task.title} [${task.priority}]`;
    li.className = task.completed ? 'completed' : '';
    li.addEventListener('click', () => toggleComplete(index));
    
    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(del);
    taskList.appendChild(li);
  });

  updateStats();
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;

  document.getElementById('total').textContent = total;
  document.getElementById('completed').textContent = completed;
  document.getElementById('remaining').textContent = remaining;
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const priority = document.getElementById('priority').value;

  if (!title || !priority) {
    alert('Please enter task title and priority.');
    return;
  }

  tasks.push({ title, priority, completed: false });
  saveTasks();
  renderTasks();
  taskForm.reset();
});

filterSelect.addEventListener('change', renderTasks);

renderTasks();
