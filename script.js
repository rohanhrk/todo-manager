"use strict";

let leftOption = document.querySelector(".left-option");
let leftContainer = document.querySelector(".left-container");
let rightOption = document.querySelector(".right-option");
let themebox = document.querySelector(".theme-option-container");
let row = document.querySelectorAll(".row");
let taskBox = document.querySelector(".add-task-input");
let circleIcn = document.querySelector(".circle");
let plusIcn = document.querySelector(".add");
let maincont = document.querySelector(".main-container");
let taskfilter = document.querySelector(".filter-color-box");

let clickFlag = false;
let rightflag = false;
let keyPressFlag = true;
let enterFlage = false;

leftOption.addEventListener("click", function () {
    if (clickFlag == false) {
        leftContainer.style.display = "block";
    }
    else {
        leftContainer.style.display = "none";
    }
    clickFlag = !clickFlag;
})

rightOption.addEventListener("click", function () {
    if (rightflag == false) {
        themebox.style.display = "flex";
    } else {
        themebox.style.display = "none";
    }
    rightflag = !rightflag;
})

taskBox.addEventListener("click", function () {
    circleIcn.style.display = "flex";
    plusIcn.style.display = "none";
})

maincont.addEventListener("click", function () {
    circleIcn.style.display = "none";
    plusIcn.style.display = "flex";
    taskfilter.style.display = "none";
})

taskBox.addEventListener("keydown", function () {
    if(enterFlage == false) {
        taskfilter.style.display = "flex";
    } else {
        taskfilter.style.display = "none";
        enterFlage = false;
    }
})


