"use strict";
let taskInput = document.querySelector("#addTask");
let taskColor = document.querySelectorAll(".color-box");
let mainContainer = document.querySelector(".main-container");
let taskclr = document.querySelector(".filter-color-box");
let lastContainer = document.querySelector(".last-container")

let cColor = "lightpink";
let cTheme = "white";

let taskArr = [];
let themeArr = [];
let tickArr = [];
let styleArr = [];

let tickdisplay = "none";
let saveFlag = true;
let cancelFlag = true;

let colors = ["lightpink", "lightblue", "lightgreen", "black"];

//  ================================================reload -> according to state re-render the ui=============================================================================
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));
    for (let i = 0; i < taskArr.length; i++) {
        let { task, color, id } = taskArr[i];
        createTask(task, color, id);
    }
}
if (localStorage.getItem("style")) {
    styleArr = JSON.parse(localStorage.getItem("style"));
    for (let i = 0; i < styleArr.length; i++) {
        let { curId, fontVal, fontFamilyVal } = styleArr[i];
        let idx = taskArr.findIndex(function (ticket) {
            return ticket.id == curId;
        })
        let taskStyle = document.querySelectorAll(".mytask")[idx];
        taskStyle.style.fontSize = fontVal + "pt";
        taskStyle.style.fontFamily = fontFamilyVal;
    }
}
if (localStorage.getItem("tick")) {
    tickArr = JSON.parse(localStorage.getItem("tick"));
    // let task = document.querySelectorAll(".task-generate");
    let tick = document.querySelectorAll(".green");
    for (let i = 0; i < tickArr.length; i++) {
        let idx;
        let { id, tickdisplay } = tickArr[i];
        id = id.slice(1);
        // console.log(id);
        for (let j = 0; j < taskArr.length; j++) {
            if (taskArr[j].id == id) {
                idx = j;
            }
        }

        tick[idx].style.display = tickdisplay;
    }

}
if (localStorage.getItem("theme")) {
    themeArr = JSON.parse(localStorage.getItem("theme"));
    let { cTheme } = themeArr[0];
    console.log(cTheme);
    setnewTheme(cTheme);
}

//==========================================================================color box click-> add border====================================================================================
for (let i = 0; i < taskColor.length; i++) {
    taskColor[i].addEventListener("click", function () {
        taskColor.forEach(function (color) {
            color.classList.remove("border");
        })
        taskColor[i].classList.add("border");
        cColor = taskColor[i].classList[0];
        console.log(cColor);
    })
}

//==========================================================================text area==========================================================================
taskInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
        let task = taskInput.value;
        //create task
        createTask(task, cColor);

        //clean
        taskInput.value = "";
        cColor = "lightpink";
        enterFlage = true;//means enter key is pressed
    }
})

//==========================================================================create task function==========================================================================
function createTask(task, cColor, myid) {
    let taskcontainer = document.createElement("div");
    taskcontainer.setAttribute("class", "task-generate");
    let id = myid || shortid();
    taskcontainer.innerHTML = `
        <div class="color-circle">
            <i class="far fa-circle" id="circle" style= "color: ${cColor}"></i>
            <div class="green-tick">
                <i class="green far fa-check-circle" style = "display:none"></i>
            </div>
        </div>
        <div class="taskNid">
            <div class="id">#${id}</div>
            <div class="mytask">${task}</div>
        </div>

        <div class="deletebtn">
            <i class="trash fas fa-trash-alt"></i>
        </div> 
    `

    mainContainer.appendChild(taskcontainer);

    if (!myid) {
        taskArr.push({
            color: cColor,
            id: id,
            task: task
        })
        localStorage.setItem("allTask", JSON.stringify(taskArr));
    }
    markAsCompleted(taskcontainer, task);
    handleDeleteTask(taskcontainer);

    handleEditTask(taskcontainer, task, cColor, id);

}

//==========================================================================click on any theme->make border on them==========================================================================
let onetheme = document.querySelectorAll(".box-col");
for (let i = 0; i < onetheme.length; i++) {
    onetheme[i].addEventListener("click", function () {
        onetheme.forEach(function (color) {
            color.classList.remove("border");
        })
        onetheme[i].classList.add("border");
        cTheme = onetheme[i].classList[1];

        for (let i = 0; themeArr.length; i++) {
            themeArr.splice(i, 1);
        }
        themeArr.push({
            cTheme: cTheme
        })
        localStorage.setItem("theme", JSON.stringify(themeArr));
        setnewTheme(cTheme);

    })
}

//==========================================================================Mark as a completed==========================================================================
function markAsCompleted(taskcontainer) {
    let markElem = taskcontainer.querySelector("#circle");
    let tickElem = taskcontainer.querySelector(".green");
    let id = taskcontainer.querySelector(".id").innerText;
    markElem.addEventListener("click", function () {
        if (tickElem.style.display == "none") {
            tickArr.push({
                id,
                tickdisplay: "block",
            })
            localStorage.setItem("tick", JSON.stringify(tickArr));
            tickElem.style.display = "block";
        } else {
            id = id.slice(1);
            let idx = taskArr.findIndex(function (i) {
                return i.id == id;
            })
            tickArr.splice(idx, 1);
            localStorage.setItem("tick", JSON.stringify(tickArr));
            tickElem.style.display = "none";
        }
    })
}

//==========================================================================delete task==========================================================================
function handleDeleteTask(taskcontainer) {
    let trashElem = taskcontainer.querySelector(".deletebtn");
    trashElem.addEventListener("click", function () {
        let elem = taskcontainer.querySelector(".id");
        let toBeDeletedId = elem.innerText.slice(1);
        let idx1 = taskArr.findIndex(function (ticket) {
            return ticket.id == toBeDeletedId;
        })
        let idx2 = tickArr.findIndex(function (i2) {
            return i2.id = elem.innerText;
        })
        let idx3 = styleArr.findIndex(function (i3) {
            return i3.curId = toBeDeletedId;
        })
      
        let deletecontainer = document.createElement("div");
        deletecontainer.setAttribute("class", "trash-request-container");

        //find current text
        let task = taskArr[idx1].task;
        deletecontainer.innerHTML = `
            <div class="delete-task">
                <p id="dlt">Delete task</p>
            </div>
            <div class="message">
                <p id="mssg">"${task}" will be permanetly deleted</p>
            </div>
            <div class="deleteNcancel">
                <div class="delete">
                    <p id="tab">delete</p>
                </div>
                <div class="cancel">
                    <p id="tab">cancel</p>
                </div>
            </div>
        `
        mainContainer.appendChild(deletecontainer);
        let trashRequest = document.querySelector(".trash-request-container");
        trashRequest.style.display = "block";
        let yes = document.querySelector(".delete");
        let no = document.querySelector(".cancel");

        yes.addEventListener("click", function () {
            taskArr.splice(idx1, 1);//remove from local storage
            tickArr.splice(idx2, 1);//remove from local storage
            styleArr.splice(idx3, 1);//remove from local storage

            localStorage.setItem("allTask", JSON.stringify(taskArr));//update local storage
            localStorage.setItem("tick", JSON.stringify(tickArr));
            localStorage.setItem("style", JSON.stringify(styleArr));
            taskcontainer.remove();
            trashRequest.remove();

            if(localStorage.getItem("allTask").length == 0) {
                localStorage.getItem("allTask").remove();
            }
            if(localStorage.getItem("style").length == 0) {
                localStorage.getItem("style").remove();
            }
        })

        no.addEventListener("click", function () {
            trashRequest.remove();
        })
    })
}

//========================================================================== set theme ==========================================================================
function setnewTheme(cTheme) {

    let pElem = document.querySelector(".p");
    let fasElem = document.querySelector(".fas");
    let farElem = document.querySelector(".far");
    let themeElem = document.querySelector(".theme");
    let faElem = document.querySelector(".fa");
    let plusElem = document.querySelector(".plus");
    let crcElem = document.querySelector(".crc");
    let baseElem = document.querySelector("#addTask");

    let vbar = document.querySelectorAll(".baar");
    let pbar = document.querySelector(".plan.bar")

    pElem.style.color = cTheme;
    fasElem.style.color = cTheme;
    farElem.style.color = cTheme;
    themeElem.style.color = cTheme;
    faElem.style.color = cTheme;
    plusElem.style.color = cTheme;
    crcElem.style.color = cTheme;
    baseElem.style.color = cTheme;

    vbar.forEach(function (b) {
        b.style.backgroundColor = cTheme;
    })

    pbar.style.backgroundColor = cTheme;

}



//========================================================================== work on last container ==========================================================================
function handleEditTask(taskcontainer, task, cColor, id) {
    let taskBox = taskcontainer.querySelector(".taskNid");
    taskBox.addEventListener("click", function () {
        lastContainer.style.display = "block";

        // 1. menu container->font style
        let menuContainer = document.createElement("div");
        menuContainer.setAttribute("class", "menu-container");
        menuContainer.innerHTML = `
        <select class="font-family">
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Times">Times</option>
                <option value="Courier New">Courier New</option>
                <option value="Courier">Courier</option>
                <option value="Verdana">Verdana</option>
                <option value="Georgia">Georgia</option>
                <option value="Palatino">Palatino</option>
                <option value="Garamond">Garamond</option>
                <option value="Bookman">Bookman</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Arial Black">Arial Black</option>
                <option value="Impact">Impact</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
            </select>
            <select class="font-size">
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">14</option>
                <option value="16">16</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="22">22</option>
                <option value="24">24</option>
                <option value="26">26</option>
                <option value="28">28</option>
                <option value="30">30</option>
                <option value="32">32</option>
            </select>
        `
        lastContainer.appendChild(menuContainer);

        // 2. taskGenerate container
        let taskGenerate = document.createElement("div");
        taskGenerate.setAttribute("class", "task-generate");
        taskGenerate.setAttribute("id", "editable-task");
        taskGenerate.innerHTML = `
            <div class="color-circle" id="editcrc">
                <i class="far fa-circle" id="circle" style= "color: ${cColor}"></i>
                <div class="green-tick">
                    <i class="green far fa-check-circle"></i>
                </div>
            </div>
            <div class="taskNid" id="edittask">
                <div class="id">#${id}</div>
                <div class="mytask ntask" contenteditable="true">${task}</div>
            </div>

            <div class="deletebtn">
                <i class="fas fa-trash-alt"></i>
            </div>
        `
        lastContainer.appendChild(taskGenerate);

        // 3.option-> save/cancel
        let option = document.createElement("div");
        option.setAttribute("class", "option");
        option.innerHTML = `
        <div class="save-option">
            <span id="sc">Save</span>
        </div>
        <div class="cancel-option">
            <span id="sc">Cancel</span>
        </div>
        `
        lastContainer.appendChild(option);

        // 4. leftSlide
        let leftSlide = document.createElement("div");
        leftSlide.setAttribute("class", "angle-right");
        leftSlide.innerHTML = `
        <i class="yoo fas fa-angle-right"></i>
        `
        lastContainer.appendChild(leftSlide);

        // *********************************font-styling*****************************************
        let fontVal = "18";
        let fontFamilyVal = "monospace";
        // font-size
        let fontSizeElem = document.querySelector(".font-size");
        fontSizeElem.addEventListener("change", function () {
            fontVal = fontSizeElem.value;
            let taskElem = taskGenerate.querySelector(".ntask");
            taskElem.style.fontSize = fontVal + "pt";
        })

        //font-family
        let fontFamilyElem = document.querySelector(".font-family");
        fontFamilyElem.addEventListener("change", function () {
            fontFamilyVal = fontFamilyElem.value;
            let taskElem = taskGenerate.querySelector(".ntask");
            taskElem.style.fontFamily = fontFamilyVal;
        })

        // *************************************color change*******************************************
        let newColor;
        let crcColorElem = taskGenerate.querySelector(".color-circle");
        crcColorElem.addEventListener("click", function () {
            let style = crcColorElem.children[0].style["color"];//lightblue
            let idx = colors.indexOf(style);
            let newidx = (idx + 1) % 4;
            newColor = colors[newidx];
            crcColorElem.children[0].style.color = newColor;
        })

        //********************************delete taskk *********************************/
        let trashElem = taskGenerate.querySelector(".deletebtn");
        trashElem.addEventListener("click", function () {
            let elem = taskcontainer.querySelector(".id");
            let toBeDeletedId = elem.innerText.slice(1);
            let idx1 = taskArr.findIndex(function (ticket) {
                return ticket.id == toBeDeletedId;
            })
            let idx2 = tickArr.findIndex(function (i2) {
                return i2.id = elem.innerText;
            })
            let idx3 = styleArr.findIndex(function (i3) {
                return i3.curId = toBeDeletedId;
            })
            
            let deletecontainer = document.createElement("div");
            deletecontainer.setAttribute("class", "trash-request-container");

            //find current text
            let task = taskArr[idx1].task;
            deletecontainer.innerHTML = `
                <div class="delete-task">
                    <p id="dlt">Delete task</p>
                </div>
                <div class="message">
                    <p id="mssg">"${task}" will be permanetly deleted</p>
                </div>
                <div class="deleteNcancel">
                    <div class="delete">
                        <p id="tab">delete</p>
                    </div>
                    <div class="cancel">
                        <p id="tab">cancel</p>
                    </div>
                </div>
            `
            mainContainer.appendChild(deletecontainer);
            let trashRequest = document.querySelector(".trash-request-container");
            trashRequest.style.display = "block";
            let yes = document.querySelector(".delete");
            let no = document.querySelector(".cancel");

            yes.addEventListener("click", function () {
                taskArr.splice(idx1, 1);//remove from local storage
                tickArr.splice(idx2, 1);//remove from local storage
                styleArr.splice(idx3, 1);//remove from local storage

                localStorage.setItem("allTask", JSON.stringify(taskArr));//update local storage
                localStorage.setItem("tick", JSON.stringify(tickArr));
                localStorage.setItem("style", JSON.stringify(styleArr));

                lastContainer.remove();
                trashRequest.remove();
                taskcontainer.remove();
            })

            no.addEventListener("click", function () {
                lastContainer.remove();
                trashRequest.remove();
            })
        })
        // *********************************edit task*******************************************
        //save/cancel
        let saveElem = document.querySelector(".save-option");
        saveElem.addEventListener("click", function () {
            //also change font styling in original task
            let setTask = taskcontainer.querySelector(".mytask");
            setTask.style.fontSize = fontVal + "pt";
            setTask.style.fontFamily = fontFamilyVal;

            //change color in circle
            let colorCircle = taskcontainer.querySelector(".color-circle");
            colorCircle.children[0].style.color = newColor;

            let taskElem = taskGenerate.querySelector(".ntask");
            let val = taskElem.innerText;
            taskcontainer.querySelector(".mytask").innerText = val;



            //also change in local storage
            let elem = taskcontainer.querySelector(".id");
            let toBeDeletedId = elem.innerText.slice(1);
            let idx = taskArr.findIndex(function (ticket) {
                return ticket.id == toBeDeletedId;
            })

            
            taskArr[idx].task = val;//set new task in local storage 
            taskArr[idx].color = newColor;//set color in local storage
            localStorage.setItem("allTask", JSON.stringify(taskArr));

            for (let i = 0; i < styleArr.length; i++) {
                styleArr.splice(i, 1);
            }
            
            //also save style formate in local storage
            let curId = elem.innerText.slice(1);
            styleArr.push({
                curId,
                fontVal,
                fontFamilyVal,

            })
            localStorage.setItem("style", JSON.stringify(styleArr));

            lastContainer.style.display = "none";
            taskGenerate.remove();
            menuContainer.remove();
            option.remove();
            leftSlide.remove();
        })

        let cancelElem = document.querySelector(".cancel-option");
        cancelElem.addEventListener("click", function () {
            lastContainer.style.display = "none";
            taskGenerate.remove();
            menuContainer.remove();
            option.remove();
            leftSlide.remove();
        })

        //click on angle right
        let slideElem = document.querySelector(".angle-right");
        slideElem.addEventListener("click", function () {
            lastContainer.style.display = "none";
            taskGenerate.remove();
            menuContainer.remove();
            option.remove();
            leftSlide.remove();
        })
    })
}
