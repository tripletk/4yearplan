// functions relating to DB actions on main page

function retriveUserPlan() {
    console.log("Retrieving Courses");
}

function saveUserPlan() {
    console.log("Saving User's Plan");
}

function submitNewCourse() {
    document
        .getElementById("newCourseForm")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const courseName = event.target.coursena.value;
            const courseNum = event.target.coursenum.value;
            const units = event.target.recred.value;
            const majorReq = event.target.majorReq.value;
            const prereq = event.target.prereq.value.split(',');

            addCourse(courseNum, courseName, majorReq, prereq, units);
            closeWindow(".bg2");
        });
    
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

    // First ask server to retrieve user's courses
    fetch("/getUserCourses", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get(
                    "XSRF-TOKEN"),
                'uid': userUID
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            courses = data.courses;
            console.log(courses);

            changeSideBarCourses();
            $("div.dragzone").draggable({
                appendTo: "body",
                containment: "body",
                scroll: false,
                opacity: 1.5,
                helper: function (event) {
                    return $(event.target).clone().css({
                        width: $(event.target).width()
                    });
                }
            });
            $("div.dropzone").droppable({
                drop: function (event, ui) {
                    $(this)
                        .find(".dropstate")
                        .css({
                            display: "flex"
                        })
                        .html(ui.helper.html())
                        .draggable({
                            containment: "#plan",
                            scroll: false,
                            opacity: 1.5,
                            helper: function (event) {
                                return $(event.target).clone().css({
                                    width: $(event.target).width(),
                                    height: $(event.target).height()
                                });
                            }
                        });
                    console.log(ui.draggable.attr("id"));
                },
            });
        });

    // Replace defaults with user's courses
    function changeSideBarCourses() {
        for (let i = 0; i < courses.length; i++) {
            courses[i] = new course(courses[i].courseID, courses[i].units);
        }
        for (let i = 0; i < courses.length; i++) {
            let newdragzone = document.createElement("div");
            newdragzone.className = "dragzone ui-draggable ui-draggable-handle";
            newdragzone.id = courses[i].getName();
            newdragzone.innerHTML = courses[i].getName();
            document.getElementById("classlist").appendChild(newdragzone);
        }
    }


}