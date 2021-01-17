// functions relating to DB actions on main page

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


function listCourse(schoolName) {
    console.log("Listing Courses");

    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/listCourses", {
        method: "POST",
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
}