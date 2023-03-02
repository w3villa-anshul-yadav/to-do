let id = 0, editId = 0;
console.log("hello");
let toDoList = document.getElementsByClassName("to-do-list")[0];
function modal(operation) {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");
    let button = document.getElementById("add-button");
    if (operation === "add" || operation ==="required" ) {
        button.innerText = "Add   Task";
        if (operation ==="add"){
            clearInputBox(); 
        }
    }else{
        button.innerText = "Edit Task"
    }
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
function ensureValidation(elem){
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
    inputElem.value = "";
    dateElem.value = "";
    discElem.value = "";
}
function isValidLength(input_field){
    return input_field.value.trim().length === 0;
}
function submitTask() {
    let button = document.getElementById("add-button");
    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");
    let inputText = inputElem.value.trim();
    let inputDate = dateElem.value.trim();
    let inputDisc = discElem.value.trim();
    if (isValidLength(dateElem) ) {
        desableRequired();
        dateElem.style.border = "3px solid red";
        dateElem.classList.toggle("required");
        modal("required");
    }
    else if (isValidLength(inputElem) ) {
        desableRequired();
        inputElem.style.border = "3px solid red";
        inputElem.classList.toggle("required");
        modal("required");
    }
    else if (isValidLength(discElem) ) {
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
            console.log(inputDate);
            addNewList(id, inputText, inputDate, inputDisc);
        }
    }
    hideModal();
}
function addNewList(id, inputText, inputDate, inputDisc){
    let toDoList = document.getElementsByClassName("to-do-list")[0];
    toDoList.insertAdjacentHTML("beforeend",
                                            `
                                                <div class="to-do-item" id="l-`+ id + `" >
                                                        <div>
                                                            <p class="to-do-text">
                                                                <span class="task-heading">Task `+ id + `: </span>  
                                                                <span id="task-`+ id + `"> ` + " " + inputText + `</span>
                                                            </p>
                                                            <p id="date-`+ id + `" class="to-do-date">` + " " + inputDate + `</p>

                                                            </div>

                                                            <div>
                                                            <p class="to-do-discription">
                                                                <span class="task-heading"> Discription:</span>

                                                                <span id="discription-`+ id + `" > ` + " " + inputDisc + ` </span>
                                                            </p>
                                                            <div class="task-button">
                                                                <input type="button"  value="Delete" onclick="deleteThis('l-`+ id + `')"> 
                                                                <input  type="button"  value="Edit" onclick="editTask('l-`+ id + `')"> 
                                                            </div>
                                                        </div>
                                                </div>

                                            `
);
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
function editTask(elem) {
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




