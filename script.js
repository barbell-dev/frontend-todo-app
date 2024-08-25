let todoList = [];
window.onload = function () {
  temp = localStorage.getItem("todoList");
  if (temp) {
    todoList = temp.split(",");
    // todoList.push(temp);
    // console.log(temp);
  }
  // console.log(todoList);
  displayTodo();
  // console.log(typeof temp);
};
function displayTodo() {
  let todos = "";
  for (let i = 0; i < todoList.length; i++) {
    todos += `<div class="new-element" id='${todoList[i]}'>
    <h4>${todoList[i]}</h4><button class="edit">Edit</button><button class="delete" id="delete${todoList[i]}">Delete</button></div>`;
  }
  console.log(todos);
  document.querySelector("#todoList").innerHTML = todos;
  activateEditListener();
  activateDeleteListener();
}
function activateEditListener() {
  let editButton = document.querySelectorAll(".edit");
  editButton.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      editTodo(i);
    });
  });
}
function editTodo(j) {
  let editButtons = document.querySelectorAll(".edit");
  for (let i = 0; i < editButtons.length; i++) {
    if (editButtons[i].parentElement.children[0].innerText == todoList[j]) {
      let newName = prompt(
        "Enter new name for todo",
        editButtons[i].parentElement.children[0].innerHTML
      );
      // newName.init;
      if (newName) {
        // let temp =
        todoList[j] = newName;
        localStorage.setItem("todoList", todoList);
        // console.log(todoList[j]);
        location.reload();
      } else {
        // alert("Edit has been cancelled.");
        return;
      }
    }
  }
  // console.log(todoList);
  location.reload;
}
function addToDo() {
  let sample = document.querySelector(".input-add-todo").value;
  let newNode = document.createElement("div");
  let h4 = document.createElement("h4");
  let addToDoText2 = sample.split(" ");
  let addToDoText = "";
  for (let i = 0; i < addToDoText2.length; i++) {
    if (addToDoText2[i] != "") {
      addToDoText += addToDoText2[i];
    }
  }
  if (addToDoText == "") {
    alert("Todo cant be empty");
    return;
  }
  h4.innerHTML = addToDoText;
  //   newNode.innerHTML += "<editButton>Edit</editButton>";
  let editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.className = "edit";
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.className = "delete";
  deleteButton.id = "delete" + addToDoText;

  newNode.appendChild(h4);
  newNode.appendChild(editButton);
  newNode.appendChild(deleteButton);
  newNode.className = "new-element";
  newNode.id = addToDoText;
  // console.log(newNode.innerHTML);
  //   newNode.innerHTML += editButton;
  let parentNode = document.querySelector("#todoList");
  //   let editeditButton = document.g
  parentNode.appendChild(newNode);
  // console.log(parentNode.children.length);
  // console.log(typeof todoList);
  todoList.push(h4.innerText);
  localStorage.setItem("todoList", todoList);
  //   console.log(typeof document.getElementById("ad"))
  deleteButton.onclick = function () {
    newNode.parentElement.removeChild(document.getElementById(addToDoText));
  };
  document.querySelector(".input-add-todo").value = "";
  console.log(editButton.parentElement.innerHTML);
  editButton.onclick = function () {
    let newName = prompt(
      "Enter new name for todo",
      editButton.parentElement.children[0].innerHTML
    );
    // newName.init;
    if (newName) {
      let node = document.querySelector("#" + addToDoText).children[0];
      // console.log(node);
      node.innerHTML = newName;
      // let temp =
      for (let i = 0; i < todoList.length; i++) {
        if (todoList[i] == editButton.parentElement.children[0]) {
          todoList[i] = newName;
        }
      }
    } else {
      // alert("Edit has been cancelled.");
      return;
    }
  };

  // localStorage.setItem("tasks", document.querySelectorAll(".new-element"));
  // console.log(localStorage);
}
// p.appendChild(new);
function search() {
  let searchValue = document.querySelector(".search-bar").value;
  let nodes = document.querySelectorAll(".new-element");
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i].children[0].innerHTML.includes(searchValue)) {
      // console.log(nodes[i].children[0].innerHTML);

      nodes[i].children[0].style.display = "none";
      nodes[i].children[1].style.display = "none";
      nodes[i].children[2].style.display = "none";
    } else {
      // console.log(nodes[i].children[0].innerHTML);

      nodes[i].children[0].style.display = "";
      nodes[i].children[1].style.display = "";
      nodes[i].children[2].style.display = "";
    }

    // console.log(nodes[i].children[0].innerHTML);
  }
  // if (
  //   nodes[0].children[0].innerHTML.startsWith(
  //     document.querySelector(".search-bar").value
  //   )
  // ) {
  //   console.log(nodes[0].children[0].innerHTML);
  // }
}
