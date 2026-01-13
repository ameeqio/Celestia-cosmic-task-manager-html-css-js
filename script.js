// adding a new task on add-button click
const addItemBtn = document.querySelector(".add-task-btn");
const taskBox = document.querySelector(".todo-tasks-box");

// an array to store the todos in the form of objects
let todos = [{ id: 1, taskinp: "", checked: false }];
let obj_todo;

addItemBtn.addEventListener("click", function (a) {
  let newTask = document.querySelector(".task").cloneNode(true);

  // setting new ids for input tasks
  let val = taskBox.children.length;
  newTask.querySelector(".inp-task").id = `${val+1}`;

  // reset previous input content and textcontent of the button
  newTask.querySelector(".inp-task").value = "";
  newTask.querySelector(".tick-btn").textContent = "";

  obj_todo = { id: Number(newTask.querySelector(".inp-task").id) , taskinp: "", checked: false };
  todos.push(obj_todo);
  localStorage.setItem("todos-storage", JSON.stringify(todos));
  taskBox.appendChild(newTask);
});

// random planet image generator
function planetSelector() {
  const randomNum = Math.floor(Math.random() * 8) + 1;
  let img;
  switch (randomNum) {
    case 1:
      img = "hopsk";
      return img;

    case 2:
      img = "nexus";
      return img;

    case 3:
      img = "oxus";
      return img;

    case 4:
      img = "phantora";
      return img;

    case 5:
      img = "quil";
      return img;

    case 6:
      img = "tyler";
      return img;

    case 7:
      img = "wefendor";
      return img;

    case 8:
      img = "yafra";
      return img;
  }
}

// code for tick-boxes
const todoBox = document.querySelector(".todo-box");
taskBox.addEventListener("click", function (e) {
  localStorage.clear;
  // the just below line ensures the click happened on the tick-btn
  if (e.target.className === "tick-btn") {
    if (e.target.textContent == "") {
      e.target.textContent = "✔";
      document.querySelector(
        ".main"
      ).style.backgroundImage = `url(planet_assets/${planetSelector()}.jpg)`;
      document.querySelector(
        "i"
      ).textContent = `${planetSelector()} — unlocked`;
    } else {
      e.target.textContent = "";
    }

    // updating the corresponding object checked status
    let parent = e.target.parentElement;
    if (parent.children[0].textContent == "") {
      todos[parent.children[1].id - 1].checked = false;
    } else {
      todos[parent.children[1].id - 1].checked = true;
    }
    localStorage.setItem("todos-storage", JSON.stringify(todos));
  }

  // the just below line ensures the click happened on the del-btn
  if (e.target.className === "del-btn") {
    let parent = e.target.parentElement;
    let parArrIndx = [...taskBox.children].indexOf(parent); // contains the particular index of the task div deleted before delete
    if (parArrIndx >= 0 && parArrIndx < (taskBox.children.length - 1)) {
      for (let i = parArrIndx + 1 ; i<taskBox.children.length ; i++) {
        taskBox.children[i].children[1].id = `${(taskBox.children[i].children[1].id) - 1}`;
        todos[i].id -= 1;
      }
    }

    if (parArrIndx == 0 && taskBox.children.length == 1) {
      todos[0].taskinp = "";
      taskBox.children[0].children[1].value = "";
      taskBox.children[0].children[0].textContent = "";
    }
    else {
      todos.splice(parArrIndx, 1);
      taskBox.removeChild(parent);
      // now the only thing is the handling of local storage!!
      // how to remove the particular object from the array present as a string in the localStorage!!
    }
    localStorage.setItem("todos-storage", JSON.stringify(todos));

  }

  // the just below line ensures the click happened on the input-field
  if (e.target.className == "inp-task") {
    e.target.addEventListener("change", function (dets) {
      let parent = e.target.parentElement;
      todos[parent.children[1].id - 1].taskinp = parent.children[1].value;
      // console.log(todos);
      localStorage.setItem("todos-storage", JSON.stringify(todos));
    });
  }
});

