let todoList = [];
let addButton = document.getElementById("add-button");
let todoInput = document.getElementById("todo-input");
let deleteAllButton = document.getElementById("delete-all");
let deleteSelectedButton = document.getElementById("delete-selected");
let allTodos = document.getElementById("all-todos");

addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSelectedButton.addEventListener("click", deleteSelected);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") add();
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".complete")) completeTodo(e);
  if (e.target.closest(".delete")) deleteTodo(e);
  if (e.target.id === "all") viewAll();
  if (e.target.id === "rem") viewRemaining();
  if (e.target.id === "com") viewCompleted();
});

function updateCounts() {
  const completed = todoList.filter((t) => t.complete).length;
  document.getElementById("c-count").innerText = completed;
  document.getElementById("r-count").innerText = todoList.length;
}

function add() {
  const value = todoInput.value.trim();
  if (!value) return alert("😮 Task cannot be empty");

  todoList.push({ id: Date.now().toString(), task: value, complete: false });
  todoInput.value = "";
  render(todoList);
  updateCounts();
}

function render(list) {
  allTodos.innerHTML = "";
  list.forEach((item) => {
    const li = document.createElement("li");
    li.className = `todo-item ${item.complete ? "completed" : ""}`;
    li.setAttribute("id", item.id);

    li.innerHTML = `
      <p>${item.task}</p>
      <div class="todo-actions">
        <button class="complete ${item.complete ? "active" : ""}">
          <i class="bx bx-check bx-sm"></i>
        </button>
        <button class="delete">
          <i class="bx bx-trash bx-sm"></i>
        </button>
      </div>
    `;
    allTodos.appendChild(li);
  });
}

function completeTodo(e) {
  const id = e.target.closest("li").id;
  todoList = todoList.map((t) =>
    t.id === id ? { ...t, complete: !t.complete } : t
  );
  render(todoList);
  updateCounts();
}

function deleteTodo(e) {
  const id = e.target.closest("li").id;
  todoList = todoList.filter((t) => t.id !== id);
  render(todoList);
  updateCounts();
}

function deleteAll() {
  todoList = [];
  render(todoList);
  updateCounts();
}

function deleteSelected() {
  todoList = todoList.filter((t) => !t.complete);
  render(todoList);
  updateCounts();
}

function viewAll() {
  render(todoList);
}
function viewRemaining() {
  render(todoList.filter((t) => !t.complete));
}
function viewCompleted() {
  render(todoList.filter((t) => t.complete));
}
