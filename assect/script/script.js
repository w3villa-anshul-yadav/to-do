let id = 0, editId = 0;


console.log("hello");
let toDoList = document.getElementsByClassName("to-do-list")[0];





function modal(operation) {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");
    let button = document.getElementById("add-button");

    if (operation === "add") {
        button.innerText = "Add   Task";
        clearInputBox();
        
        
        
    } else if(operation ==="required"){
        
        button.innerText = "Add   Task";
    }
    
    else
        button.innerText = "Edit Task";


}

function desableRequired(){

    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");
    discElem.style.border = "none";
    inputElem.style.border = "none";
    dateElem.style.border = "none";

    dateElem.classList.remove("required");
    inputElem.classList.remove("required");
    discElem.classList.remove("required");
}
function hideModal() {

    let modalview = document.getElementsByClassName("input-container")[0];

    modalview.classList.toggle("display-modal");
}

function checkRequired(elem){

    if(elem.value.length === 0){
        elem.style.border = "3px solid red";
        console.log("not"+elem);
        
        elem.classList.add("required");
    }else{
        elem.style.border = "none";
        console.log("yes"+elem);

        elem.classList.remove("required");
    }
}


function clearInputBox() {

    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");

    let inputText = inputElem.value.trim();
    let inputDate = dateElem.value.trim();
    let inputDisc = discElem.value.trim();
    inputElem.value = "";
    dateElem.value = "";
    discElem.value = "";
}

function addTask() {

    let button = document.getElementById("add-button");

    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");

    let inputText = inputElem.value.trim();
    let inputDate = dateElem.value.trim();
    let inputDisc = discElem.value.trim();





    if (inputDate.length === 0) {
        desableRequired();
        dateElem.style.border = "3px solid red";
        dateElem.classList.toggle("required");
        modal("required");
    }
    
    
    else if (inputText.length === 0) {
        desableRequired();
        inputElem.style.border = "3px solid red";
        inputElem.classList.toggle("required");
        
        modal("required");
    }
    else if (inputDisc.length === 0) {
        desableRequired();
        discElem.style.border = "3px solid red";
        discElem.classList.toggle("required");
         
        modal("required");
    }
    else {

        clearInputBox();
        desableRequired();

        if (button.innerText === "Edit Task") {
            let editTask = document.getElementById("task-" + editId);
            let editDate = document.getElementById("date-" + editId);
            let editDiscription = document.getElementById("discription-" + editId);

            editTask.innerText = inputText;
            editDate.innerText = inputDate;
            editDiscription.innerText = inputDisc;


        }
        else {
            id++;


            let toDoList = document.getElementsByClassName("to-do-list")[0];


            console.log(inputDate);

            toDoList.insertAdjacentHTML("beforeend",



                `
<div class="to-do-item" id="l-`+ id + `" >
<div>
    <p class="to-do-text">
        <span class="task-heading">Task `+ id + `: </span>  
        <span id="task-`+ id + `"> ` + " " + inputText + `</span>
     </p>

<p id="date-`+ id + `" class="to-do-date">` + " " + inputDate + `

</p>

</div>

<div>
    <p class="to-do-discription">
        <span class="task-heading">
            Discription:</span>
            
           <span id="discription-`+ id + `" > ` + " " + inputDisc + `
        </span>
    </p>
    <div class="task-button">
        <input type="button"  value="Delete" onclick="deleteThis('l-`+ id + `')"> 
    <input  type="button"  value="Edit" onclick="editThis('l-`+ id + `')"> 
    </div>

</div>

</div>

`



            );

        }
    }
    hideModal();
}




function deleteThis(elem) {

    console.log(elem);

    if(confirm("do you want to really delete this task")){
    let targetElem = document.getElementById(elem);

    targetElem.style["transform"] = "translateX(85vw)";
    targetElem.style["transition"] = ".3s ease";
    setTimeout(() => {
        targetElem.remove();

    }, 500);
}


}
function editThis(elem) {

    let button = document.getElementById("add-button");

    button.innerText = "Edit Task";



    let inputTask = document.getElementById("to-do-input");
    let inputDate = document.getElementById("date-input");
    let inputDiscription = document.getElementById("discription-input");

    editId = elem.slice(-1);

    let editTask = document.getElementById("task-" + editId);
    let editDate = document.getElementById("date-" + editId);
    let editDiscription = document.getElementById("discription-" + editId);



    let parentElem = document.getElementById(elem);








    console.log(editDate.innerText);
    inputTask.value = editTask.innerText;
    inputDate.value = editDate.innerText;
    inputDiscription.value = editDiscription.innerText;



    modal("edit");


}




