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
            add.setAttribute("data-bs-dismiss","");
        })()
    }
}

let data = [];

let Acceptdata = () =>{
    data.push({
        text:input.value,
        date:datetime.value,
        discription:textarea.value
    }
    )
    localStorage.setItem("data", JSON.stringify(data));
    createTask();
}
let createTask = () => {
    tasks.innerHTML="";
    data.map((x,y)=>{
        return(
            tasks.innerHTML += 
    `
    <div id=${y}>
        <h4 class="fw-bold">${x.text}</h4>
        <p class="small text-danger">${x.date}</p>
        <p>${x.discription}</p>
        <span id="delete-edit">
          <i onClick="editTask(this);" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
          <i onClick="deleteTask(this);" class="fa-solid fa-trash"></i>
        </span>
      </div>
    `
        )
    })
    input.value='';
    datetime.value='';
    textarea.value = '';
}
let deleteTask= (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data", JSON.stringify(data));
}
let editTask =(e)=>{
    let task = e.parentElement.parentElement;

    input.value=task.children[0].innerHTML;
    datetime.value=task.children[1].innerHTML;
    textarea.value = task.children[2].innerHTML;

    deleteTask(e);
}

(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTask();
})()
