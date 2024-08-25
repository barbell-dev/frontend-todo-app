let todoList = [];
const themeKey = "theme";

window.onload = function () {
  let storedList = localStorage.getItem("todoList");
  if (storedList) {
    todoList = JSON.parse(storedList);
    console.log(todoList);
  }

  applySavedTheme();

  displayTodo();
};

function applySavedTheme() {
  let savedTheme = localStorage.getItem(themeKey);
  if (savedTheme === "dark") {
    document.body.id = "dark";
    document.querySelector("#themeIcon").innerHTML = "&#xf185;"; // Sun icon
  } else {
    document.body.id = "light";
    document.querySelector("#themeIcon").innerHTML = "&#xf186;"; // Moon icon
  }
}

function toggleTheme() {
  if (document.body.id === "light") {
    document.body.id = "dark";
    document.querySelector("#themeIcon").innerHTML = "&#xf185;";
    localStorage.setItem(themeKey, "dark");
  } else {
    document.body.id = "light";
    document.querySelector("#themeIcon").innerHTML = "&#xf186;";
    localStorage.setItem(themeKey, "light");
  }
  // location.reload();
}

function displayTodo() {
  let todos = "";
  for (let i = 0; i < todoList.length; i++) {
    todos += `<div class="new-element" id='${todoList[i]}'>
    <h4>${todoList[i]}</h4><button class="edit">Edit</button><button class="delete" id="delete${todoList[i]}">Delete</button></div>`;
  }
  document.querySelector("#todoList").innerHTML = todos;
  activateEditListener();
  activateDeleteListener();
}

function activateDeleteListener() {
  let deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((db, i) => {
    db.addEventListener("click", () => {
      deleteTodo(i);
    });
  });
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  location.reload();
}

function activateEditListener() {
  let editButtons = document.querySelectorAll(".edit");
  editButtons.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      editTodo(i);
    });
  });
}

function editTodo(index) {
  let newName = prompt("Enter new name for todo", todoList[index]);
  if (newName) {
    todoList[index] = newName;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    location.reload();
  }
}

function addToDo() {
  let sample = document.querySelector(".input-add-todo").value.trim();
  if (!sample) {
    alert("Todo can't be empty");
    return;
  }

  let newNode = document.createElement("div");
  let h4 = document.createElement("h4");
  h4.innerHTML = sample;

  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  deleteButton.id = "delete" + sample;

  newNode.appendChild(h4);
  newNode.appendChild(editButton);
  newNode.appendChild(deleteButton);
  newNode.className = "new-element";
  newNode.id = sample;

  let parentNode = document.querySelector("#todoList");
  parentNode.appendChild(newNode);

  todoList.push(sample);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  location.reload();

  document.querySelector(".input-add-todo").value = "";
}

function search() {
  let searchValue = document.querySelector(".search-bar").value;
  let nodes = document.querySelectorAll(".new-element");
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].children[0].innerHTML.includes(searchValue)) {
      nodes[i].children[0].style.display = "none";
      nodes[i].children[1].style.display = "none";
      nodes[i].children[2].style.display = "none";
    } else {
      nodes[i].children[0].style.display = "";
      nodes[i].children[1].style.display = "";
      nodes[i].children[2].style.display = "";
    }
  }
}
