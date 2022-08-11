// capture nav buttons
const menuBtn = document.querySelector(".menu-btn");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");

//query selector to disable app buttons, not modal buttons
const app = document.querySelectorAll("button:not(#modal button), input");

// Modal elements
const modalContainer = document.querySelector(".modal-body");
const continueButton = document.querySelector(".modal-continue-btn");
const modalLoadBtn = document.querySelector(".modal-load-btn");
const modalPopoverBtn = document.querySelector(".modal-popover-btn");
const challengeContainer = document.querySelector(".challenge-container");
const modalDescript = document.querySelector(".modal-descript");

// catch log elements
const catchesDiv = document.getElementById("catches");
const loadBtn = document.getElementsByClassName("load")[0];
const addBtn = document.querySelector("button.add");
const catchDIVS = document.getElementsByClassName("catch");


