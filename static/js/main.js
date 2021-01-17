// function moveSignup() {
//     document.querySelector(".modalBG").style.display = "flex";
// }

// function xSignup() {
//     document.querySelector(".modalBG").style.display = "none";
// }

// function moveSignin() {
//     document.querySelector(".signBG").style.display = "flex";
// }

// function xSignin() {
//     document.querySelector(".signBG").style.display = "none";
// }

function openWindow(divName) {
    console.log("opened Window");
    document.querySelector(divName).style.display = "flex";
}

function closeWindow(divName) {
    console.log("closed Window");
    document.querySelector(divName).style.display = "none";
}
