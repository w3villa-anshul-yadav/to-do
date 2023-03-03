let id = 0, editId = 0;
let arr=[];
var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;
var today = year + "-" + month + "-" + day;       
let elem=document.getElementById("date-input").setAttribute("min",`${today}`);
console.log(elem);
let toDoList = document.getElementsByClassName("to-do-list")[0];
function modal(operation) {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");
    let button = document.getElementById("add-button");
    if (operation === "add" || operation ==="required" || operation==  "sameTaskAdded") {
        button.innerText = "Add   Task";
        if (operation ==="add"){
            clearInputBox(); 
        }
    }else{
        button.innerText = "Edit Task"
    }
}
function disableRequired(){
    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");
    let messageDiv=document.getElementById("messageDiv");
    discElem.style.border = "none";
    inputElem.style.border = "none";
    dateElem.style.border = "none";
    messageDiv.classList.remove("required-task");
    messageDiv.classList.remove("required-date"); 
    messageDiv.classList.remove("required-disc");
}
function hideModal() {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");
}
function ensureValidation(elem){
    if(elem.value.length === 0){
        elem.style.border = "3px solid red";
         elem.classList.add("required");
    }else{
        elem.style.border = "none";
        messageDiv.classList.remove("required-disc");
        messageDiv.classList.remove("required-date");
        messageDiv.classList.remove("required-task");
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
    let messageDiv=document.getElementById("messageDiv");
    let inputText = inputElem.value.trim();
    let inputDate = dateElem.value.trim();
    let inputDisc = discElem.value.trim();
   
            if (isValidLength(dateElem) ) {
                disableRequired();
                 messageDiv.classList.add("required-date");
                modal("required");
            }
            else if (isValidLength(inputElem) ) {
                disableRequired();
                inputElem.style.border = "3px solid red";
                messageDiv.classList.add("required-task");
                 modal("required");
            }
            else if (isValidLength(discElem) ) {
                disableRequired();
                discElem.style.border = "3px solid red";
                messageDiv.classList.add("required-disc");
                 modal("required");
            }
            else {
                clearInputBox();
                disableRequired();
                if (button.innerText === "Edit Task") {
                    let editTask = document.getElementById("task-" + editId);
                    let editDate = document.getElementById("date-" + editId);
                    let editDiscription = document.getElementById("discription-" + editId);
                    arr.shift(editTask.innerText);
                    editTask.innerText = inputText;
                    editDate.innerText = inputDate;
                    editDiscription.innerText = inputDisc;
                    arr.push(inputText.toUpperCase());
                }
                else {
                        if(arr.includes(inputText.toUpperCase()) ){
                            document.getElementById("messageDiv").classList.toggle("task-already-exist");
                            setTimeout(()=>{
                                messageDiv.style["transition"]=".5s ease";
                                messageDiv.classList.toggle("task-already-exist");
                            },5000);
                            modal("sameTaskAdded");
                        }
                        else{
                                id++;
                                console.log(inputDate);
                                addNewList(id, inputText, inputDate, inputDisc);
                                arr.push(inputText.toUpperCase());
                            }
                }
            }
            hideModal();
        
}
function addNewList(id, inputText, inputDate, inputDisc){
    let toDoList = document.getElementsByClassName("to-do-list")[0];
    toDoList.insertAdjacentHTML("beforeend",
                                            ` <div class="to-do-item" id="l-`+ id + `" >
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
    console.log(elem+ "del");
    let temp=elem.split("-");
    elem=temp[temp.length-1];
    let task = document.getElementById("task-" + elem).innerText;
    console.log(task+" t");
    targetElem.style["transform"] = "translateX(85vw)";
    targetElem.style["transition"] = ".3s ease";
    arr.shift(task.toUpperCase());
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
     let temp=elem.split("-");
     editId=temp[temp.length-1];
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




