// functions relating to DB actions on main page

const { response } = require("express");

function retriveUserPlan() {
    console.log("Retrieving Courses");
}

function saveUserPlan() {
    console.log("Saving User's Plan");
}

function addCourse(courseID, courseTitle, majorReq, preReq, units) {
    console.log("Adding Course");

    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/recordNewCourse", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get(
                "XSRF-TOKEN"),
        },
        body: JSON.stringify({
            uid: userUID,
            course: {
                courseID: courseID,
                courseTitle: courseTitle,
                majorReq: majorReq,
                preReq: preReq,
                units: units
            }
        })
    })
}

function exportPlan() {
    console.log("Exporting Plan");
}

function sharePlan() {
    console.log("Sharing Plan");
}

function enterReqs() {
    console.log("Entering Reqs");
}

function setUserCourses() {
    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;
    
    fetch("/getUserCourses", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get(
                "XSRF-TOKEN"),
            uid: userUID
        }
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

function listCourse(schoolName) {
    console.log("Listing Courses");

    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/listCourses", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get(
                "XSRF-TOKEN"),
        },
        body: JSON.stringify({
            uid: userUID,
            school: schoolName,
        })
    })

    .then(response => response.json())
    .then(data => console.log(data));
}