// adding a new task on add-button click
const addItemBtn = document.querySelector(".add-task-btn");
const taskBox = document.querySelector(".todo-tasks-box");

function saveTodos() {
  localStorage.setItem("todos-storage", JSON.stringify(todos));
}

// an array to store the todos in the form of objects
let todos = [{ id: 1, taskinp: "", checked: false }];
let obj_todo;

addItemBtn.addEventListener("click", function () {
  let newTask = document.querySelector(".task").cloneNode(true);

  // setting new ids for input tasks
  let val = taskBox.children.length;
  newTask.querySelector(".inp-task").id = `${val + 1}`;

  // reset previous input content and textcontent of the button
  newTask.querySelector(".inp-task").value = "";
  newTask.querySelector(".tick-btn").textContent = "";

  obj_todo = {
    id: Number(newTask.querySelector(".inp-task").id),
    taskinp: "",
    checked: false,
  };
  todos.push(obj_todo);
  saveTodos();
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
  // the just below line ensures the click happened on the tick-btn
  if (e.target.className === "tick-btn") {
    if (e.target.textContent == "") {
      e.target.textContent = "✔";
      let bg_img = planetSelector();
      document.querySelector(
        ".main"
      ).style.backgroundImage = `url(planet_assets/${bg_img}.jpg)`;
      document.querySelector("i").textContent = `${bg_img} — unlocked`;
      // storing the background image!!
      localStorage.setItem("bg-img", bg_img);
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
    saveTodos();
  }

  // the just below line ensures the click happened on the del-btn
  if (e.target.className === "del-btn") {
    let parent = e.target.parentElement;
    let parArrIndx = [...taskBox.children].indexOf(parent); // contains the particular index of the task div deleted before delete
    if (parArrIndx >= 0 && parArrIndx < taskBox.children.length - 1) {
      for (let i = parArrIndx + 1; i < taskBox.children.length; i++) {
        taskBox.children[i].children[1].id = `${
          taskBox.children[i].children[1].id - 1
        }`;
        todos[i].id -= 1;
      }
    }

    if (parArrIndx == 0 && taskBox.children.length == 1) {
      todos[0].taskinp = "";
      taskBox.children[0].children[1].value = "";
      taskBox.children[0].children[0].textContent = "";
    } else {
      todos.splice(parArrIndx, 1);
      taskBox.removeChild(parent);
    }
    saveTodos();
  }

  // the just below line ensures the click happened on the input-field
  if (e.target.className == "inp-task") {
    e.target.addEventListener("change", function (dets) {
      let parent = e.target.parentElement;
      todos[parent.children[1].id - 1].taskinp = parent.children[1].value;

      saveTodos();
    });
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("todos-storage") !== null) {
    todos = JSON.parse(localStorage.getItem("todos-storage"));
  } else {
    todos = [{ id: 1, taskinp: "", checked: false }];
  }

  let bg_img;

  if (localStorage.getItem("bg-img")) {
    bg_img = localStorage.getItem("bg-img");
  } else {
    bg_img = planetSelector();
  }

  document.querySelector(
    ".main"
  ).style.backgroundImage = `url(planet_assets/${bg_img}.jpg)`;
  document.querySelector("i").textContent = `${bg_img} — unlocked`;

  if (todos[0].checked) {
    document.querySelector(".task").querySelector(".tick-btn").textContent =
      "✔";
  } else {
    document.querySelector(".task").querySelector(".tick-btn").textContent = "";
  }
  document.querySelector(".task").querySelector(".inp-task").value =
    todos[0].taskinp;

  for (let i = 2; i <= todos.length; i++) {
    let newTask = document.querySelector(".task").cloneNode(true);

    newTask.querySelector(".inp-task").id = `${i}`;

    // reset previous input content and textcontent of the button
    newTask.querySelector(".inp-task").value = "";
    newTask.querySelector(".tick-btn").textContent = "";

    // button tick restore
    if (todos[i - 1].checked) {
      newTask.querySelector(".tick-btn").textContent = "✔";
    } else {
      newTask.querySelector(".tick-btn").textContent = "";
    }
    // input values restore
    newTask.querySelector(".inp-task").value = todos[i - 1].taskinp;

    taskBox.appendChild(newTask);
  }
});
