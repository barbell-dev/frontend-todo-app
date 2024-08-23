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
  //   newNode.innerHTML += editButton;
  let parentNode = document.querySelector(".input-add-todo").parentElement;
  //   let editeditButton = document.g
  parentNode.appendChild(newNode);
  //   console.log(typeof document.getElementById("ad"))
  deleteButton.onclick = function () {
    newNode.parentElement.removeChild(document.getElementById(addToDoText));
  };
  document.querySelector(".input-add-todo").value = "";
  editButton.onclick = function () {
    let newName = prompt("Enter new name for todo");
    if (newName) {
      let node = document.querySelector("#" + addToDoText).children[0];
      console.log(node);
      node.innerHTML = newName;
    } else {
      alert("Edit has been cancelled.");
    }
  };
}
// p.appendChild(new);
function search() {
  let node = document.querySelectorAll(".new-element");
  console.log(node);
}
