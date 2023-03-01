let id = 1;
// let button = document.getElementById("add-button");

// button.innerText = "Add New Task";

console.log("hello");
let toDoList = document.getElementsByClassName("to-do-list")[0];

function modal() {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");

}
function hideModal() {
    let modalview = document.getElementsByClassName("input-container")[0];
    modalview.classList.toggle("display-modal");
}


function addTask() {
    id++;

    let button = document.getElementById("add-button");

    let inputElem = document.getElementById("to-do-input");
    let dateElem = document.getElementById("date-input");
    let discElem = document.getElementById("discription-input");


    let inputText = inputElem.value.trim();
    inputElem.value = "";
    let inputDate = dateElem.value.trim();
    dateElem.value = "";
    let inputDisc = discElem.value.trim();
    discElem.value = "";




    if (inputText.length === 0 || inputDisc.length === 0 || inputDate.length === 0) {
        alert("input required");
    }
    else {
        if (button.innerText === "Edit Task") {
            let editTask = document.getElementById("task-" + id);
            let editDate = document.getElementById("date-" + id);
            let editDiscription = document.getElementById("discription-" + id);

            editTask.innerText = inputText;
            editDate.innerText = inputDate;
            editDiscription.innerText = inputDisc;

        }
        else {
            button.innerText = "Add New Task";


            let toDoList = document.getElementsByClassName("to-do-list")[0];


            console.log(inputDate);

            toDoList.insertAdjacentHTML("beforeend",



                `
<div class="to-do-item" id="l-`+ id + `" >
<div>
    <p class="to-do-text">
        <span class="task-heading">Task `+ id + `: </span>  
        <span id="task-`+ id + `"> ` + inputText + `</span>
     </p>

<p id="date-`+ id + `" class="to-do-date">` + inputDate + `

</p>

</div>

<div>
    <p class="to-do-discription">
        <span class="task-heading">
            Discription:</span>
            
           <span id="discription-`+ id + `" > ` + inputDisc + `
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


    let targetElem = document.getElementById(elem);

    targetElem.style["transform"] = "translateX(85vw)";
    targetElem.style["transition"] = ".3s ease-in-out";
    setTimeout(() => {
        targetElem.remove();

    }, 500);


}
function editThis(elem) {

    let button = document.getElementById("add-button");

    button.innerText = "Edit Task";



    let inputTask = document.getElementById("to-do-input");
    let inputDate = document.getElementById("date-input");
    let inputDiscription = document.getElementById("discription-input");

    id = elem.slice(-1);

    let editTask = document.getElementById("task-" + id);
    let editDate = document.getElementById("date-" + id);
    let editDiscription = document.getElementById("discription-" + id);



    let parentElem = document.getElementById(elem);
    // parentElem.style["transform"] = "translate(45vh,85vw)";
    // parentElem.style["transition"] = ".5s ease-in-out";


    id = id - 1;
    setTimeout(() => {
        // parentElem.remove();

    }, 2000);



    console.log(editDate.innerText);
    inputTask.value = editTask.innerText;
    inputDate.value = editDate.innerText;
    inputDiscription.value = editDiscription.innerText;



    modal();


}