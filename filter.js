'use strict';
let pFilterColor = null;
let allFilterElems = document.querySelectorAll(".filter-color-container");
let bars = document.querySelectorAll(".baar");
let planBar = document.querySelector(".plan.bar");
let allPlanElem = document.querySelector(".filter-plan-container");
for (let i = 0; i < allFilterElems.length; i++) {
    allFilterElems[i].addEventListener("click", function () {
        let filterColorElem = allFilterElems[i].children[1];
        let toFilterColor = filterColorElem.classList[0];
        //  current Ui -> remove
        let taskElemsArr = document.querySelectorAll(".task-generate");
        let length = taskElemsArr.length;
        let reqArr;
        for (let i = 0; i < length; i++) {
            taskElemsArr[i].remove();
        }
        // show all
        if (pFilterColor != null && pFilterColor == toFilterColor) {
            reqArr = taskArr;
            // filter
            pFilterColor = null;

        } else {
            // filter
            reqArr = taskArr.filter(function (elemobj) {
                return elemobj.color == toFilterColor;
            });

            pFilterColor = toFilterColor;
        }

        //  reqArr -> render 
        reqArr.forEach(function (taskobj) {
            let { task, color, id } = taskobj;
            createTask(task, color, id);
        });
    })
}

for (let i = 0; i < allFilterElems.length; i++) {
    allFilterElems[i].addEventListener("click", function () {
        bars.forEach(function (bar) {
            bar.style.opacity = "0";
        })
        if (bars[i].innerText == "0") {
            bars[i].style.opacity = "1"
            bars[i].innerText = "1";
            planBar.style.opacity = "0";
        } else {
            bars[i].style.opacity = "0";
            bars[i].innerText = "0"
            planBar.style.opacity = "1";
        }

    })
}

// allPlanElem.addEventListener("click", function () {
//     let taskElemsArr = document.querySelectorAll(".task-generate");
//     let length = taskElemsArr.length;
    
//     //remove remaining task
//     for (let i = 0; i < length; i++) {

//         taskElemsArr[i].remove();
//     }
    
//     //add all task
//     taskArr = JSON.parse(localStorage.getItem("allTask"));
//     for (let i = 0; i < taskArr.length; i++) {
//         let { task, color, id } = taskArr[i];
//         createTask(task, color, id);
//     }
    
//     bars.forEach(function (bar) {
//         bar.style.opacity = "0";
//         bars[i].innerText = "0"
//     })
    
//     planBar.style.opacity = "1";
// })