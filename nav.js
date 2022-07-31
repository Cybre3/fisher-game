// capture nav buttons
const menuBtn = document.querySelector(".menu-btn");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");

menuBtn.addEventListener("click", modalPopup);

function modalPopup() {
  modalContainer.style.animation = "fadein 0.4s linear";
}
