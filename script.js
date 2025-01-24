const input = document.querySelector(".input-task");
const buttonAdd = document.querySelector(".add-task");
const listTasks = document.querySelector(".list-tasks");

let taskList = [];

function addNewTask() {
  taskList.push({
    task: input.value,
    check: false,
  });

  input.value = "";

  addedTasks();
}

function addedTasks() {
  let newTask = "";

  taskList.forEach((task, index) => {
    newTask =
      newTask +
      `
            <li class="task ${task.check && "done"}">
                <img src="./images/checked.png" alt="check-icon" onclick="checkTask(${index})">
                <p>${task.task}</p>
                <img src="./images/trash.png" alt="trash-icon" onclick="deleteTask(${index})">
            </li>
        `;
  });

  listTasks.innerHTML = newTask;

  localStorage.setItem("list", JSON.stringify(taskList));
}

function checkTask(index) {
  taskList[index].check = !taskList[index].check;

  addedTasks();
}

function deleteTask(index) {
  taskList.splice(index, 1);

  addedTasks();
}

function reloadTasks() {
  const storageTasks = localStorage.getItem("list");

  if (storageTasks) {
    taskList = JSON.parse(storageTasks);
  }

  addedTasks();
}

reloadTasks();
buttonAdd.addEventListener("click", addNewTask);
