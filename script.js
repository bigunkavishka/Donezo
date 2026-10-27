
const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const count = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearButton = document.getElementById("clearCompleted");

let tasks = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskName = input.value.trim();

  if (taskName === "") {
    return;
  }

  const task = {
    id: crypto.randomUUID(),
    text: taskName,
    completed: false
  };

  tasks.push(task);

  input.value = "";
  renderTasks();
});

function renderTasks() {
  list.replaceChildren();

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "todo-item";

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", "Complete " + task.text);

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });

      renderTasks();
    });

    li.append(checkbox, text, deleteButton);
    list.appendChild(li);
  });

  const remaining = tasks.filter(function (task) {
    return !task.completed;
  }).length;

  count.textContent = `${remaining} tasks remaining`;
  emptyMessage.hidden = tasks.length > 0;
}

clearButton.addEventListener("click", function () {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  renderTasks();
});

renderTasks();
