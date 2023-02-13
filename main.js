let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let datetime = document.getElementById("datetime");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add= document.getElementById("add_button");

let h2 = document.getElementById("h2");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
})
let validate = () => {
    if (input.value === "") {
        msg.innerHTML = "task can't be empty";
        msg.style.color = "red";
    }
    else {
        msg.innerHTML = "";
        Acceptdata();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();

        (()=>{
            add.setAttribute("data-bs-dismiss","modal");
        })()
    }
}

let data = {};

let Acceptdata = () =>{
    data["text"] = input.value;
    data["date"] = datetime.value;
    data["discription"] = textarea.value;
    createTask();
    
}
let createTask = () => {
    tasks.innerHTML += 
    `
    <div>
        <h4 class="fw-bold">${data.text}</h4>
        <p class="small text-danger">${data.date}</p>
        <p>${data.discription}</p>
        <span id="delete-edit">
          <i onClick="editTask(this);" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
          <i onClick="deleteTask(this);" class="fa-solid fa-trash"></i>
        </span>
      </div>
    `
    input.value='';
    datetime.value='';
    textarea.value = '';
}
let deleteTask= (e)=>{
    e.parentElement.parentElement.remove();
}
let editTask =(e)=>{
    let task = e.parentElement.parentElement;

    input.value=task.children[0].innerHTML;
    datetime.value=task.children[1].innerHTML;
    textarea.value = task.children[2].innerHTML;

    task.remove();
}

