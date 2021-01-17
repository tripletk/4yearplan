// functions relating to DB actions on main page

//get saved Plan from DB
function retrieveUserPlan() {
    console.log("Retrieving Courses");

    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/getUserPlan", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get(
                    "XSRF-TOKEN"),
                'uid': userUID,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            savedplan = data.plan;
            console.log(courses);

            changePlan();
        });

    // Replace current plan with user's courses
    function changePlan() {
        let count = 0;
        for (let i = 0; i < 12; i++){
            for (let j = 0; j < 4; j++){
                if (savedplan[count] != "!")
                    plan[i][j] = new course(savedplan[count].courseID,savedplan[count].courseTitle,savedplan[count].credits,
                        savedplan[count].majorReq, savedplan[count].preReq);
                update(i,j);
                count++;
            }
        }

    }
}

function saveUserPlan(newPlan) {
    console.log("Saving User's Plan");
    
    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/recordUserPlan", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "CSRF-Token": Cookies.get(
                "XSRF-TOKEN"),
            
        },
        body: JSON.stringify({
            uid: userUID,
            plan: newPlan
        }),        
    })

    
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
            // $("div.dragzone").draggable({
            //     appendTo: "body",
            //     containment: "body",
            //     scroll: false,
            //     opacity: 1.5,
            //     helper: function (event) {
            //         return $(event.target).clone().css({
            //             width: $(event.target).width()
            //         });
            //     }
            // });
            // $("div.dropzone").droppable({
            //     drop: function (event, ui) {
            //         $(this)
            //             .find(".dropstate")
            //             .css({
            //                 display: "flex"
            //             })
            //             .html(ui.helper.html())
            //             .draggable({
            //                 containment: "#plan",
            //                 scroll: false,
            //                 opacity: 1.5,
            //                 helper: function (event) {
            //                     return $(event.target).clone().css({
            //                         width: $(event.target).width(),
            //                         height: $(event.target).height()
            //                     });
            //                 }
            //             });
            //         console.log(ui.draggable.attr("id"));
            //     },
            // });
            $("div.dragzone").draggable({
                appendTo: "body",
                containment: "body",
                scroll: false,
                opacity: 1.5,
                helper: function (event) {
                    return $(event.target).clone().css({
                        width: $(event.target).width(),
                        cursor: "grabbing"
                    });
                }
            });
            $("div.dropzone").droppable({
                drop: function (event, ui) {
                    row = (classNumFromClassList($(this).attr("class"), "year") * terms.length) + classNumFromClassList($(this).attr("class"), "term");
                    col = classNumFromClassList($(this).attr("class"), "course");
                    plan[row][col] = courses[classNumFromClassList(ui.draggable.attr("class"), "course")];
                    document.getElementsByClassName("termclear")[row].style.display = "inline-block";
                    //debugplan();
                    update(row, col);
                },
                over: function (event, ui) {
                    this.style.backgroundColor = "#cfcfcf";
                },
                out: function (event, ui) {
                    this.style.backgroundColor = "#C4C4C4";
                }
            });
        });

    // Replace defaults with user's courses
    function changeSideBarCourses() {
        // for (let i = 0; i < courses.length; i++) {
        //     courses[i] = new course(courses[i].courseID, courses[i].units);
        // }
        for (let i = 0; i < courses.length; i++) {
            courses[i] = new course(courses[i].courseID, courses[i].courseTitle, courses[i].units, courses[i].majorReq, courses[i].preReq);
        }
        // for (let i = 0; i < courses.length; i++) {
        //     let newdragzone = document.createElement("div");
        //     newdragzone.className = "dragzone ui-draggable ui-draggable-handle";
        //     newdragzone.id = courses[i].getName();
        //     newdragzone.innerHTML = courses[i].getName();
        //     document.getElementById("classlist").appendChild(newdragzone);
        // }
        for (let i = 0; i < courses.length; i++) {
            let newdragzone = document.createElement("div");
            newdragzone.classList.add("dragzone");
            newdragzone.classList.add("course" + i);
            newdragzone.innerHTML = courses[i].getName();
            document.getElementById("classlist").appendChild(newdragzone);
        }
    }
}



function listCourse(schoolName) {
    console.log("Listing Courses");

    const userUID = JSON.parse(sessionStorage.fouryearplanuser).uid;

    fetch("/getSchoolCourses", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "CSRF-Token": Cookies.get(
                    "XSRF-TOKEN"),
                'school': schoolName,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            courses = data;
            console.log(courses);

            changeSideBarCourses();
            $("div.dragzone").draggable({
                appendTo: "body",
                containment: "body",
                scroll: false,
                opacity: 1.5,
                helper: function (event) {
                    return $(event.target).clone().css({
                        width: $(event.target).width(),
                        cursor: "grabbing"
                    });
                }
            });
            $("div.dropzone").droppable({
                drop: function (event, ui) {
                    row = (classNumFromClassList($(this).attr("class"), "year") * terms.length) + classNumFromClassList($(this).attr("class"), "term");
                    col = classNumFromClassList($(this).attr("class"), "course");
                    plan[row][col] = courses[classNumFromClassList(ui.draggable.attr("class"), "course")];
                    document.getElementsByClassName("termclear")[row].style.display = "inline-block";
                    //debugplan();
                    update(row, col);
                },
                over: function( event, ui ) {
                    this.style.backgroundColor = "#cfcfcf";
                },
                out: function( event, ui ) {
                    this.style.backgroundColor = "#C4C4C4";
                }
            });
        });

    // Replace defaults with user's courses
    function changeSideBarCourses() {
  
        for (let i = 0; i < courses.length; i++) {
            //courses[i] = new course(courses[i], "", 4, "", "");
            
            //coursesArr.push(new course(courses[i].CourseID, courses[i].CourseTitle, courses[i].Units, courses[i].MajorReq, courses[i].PreReq))
        
            courses[i] = new course(courses[i].CourseID, courses[i].CourseTitle, courses[i].Units, courses[i].MajorReq, courses[i].PreReq);
        }
        // for (let i = 0; i < coursesArr.length; i++) {
        //     let newdragzone = document.createElement("div");
        //     newdragzone.className = "dragzone ui-draggable ui-draggable-handle";
        //     newdragzone.id = coursesArr[i].getName();
        //     newdragzone.innerHTML = coursesArr[i].getName();
        //     document.getElementById("classlist").appendChild(newdragzone);
        // }
        for (let i = 0; i < courses.length; i++) {
            let newdragzone = document.createElement("div");
            newdragzone.classList.add("dragzone");
            newdragzone.classList.add("course" + i);
            newdragzone.innerHTML = courses[i].getName();
            document.getElementById("classlist").appendChild(newdragzone);
        }



    }


}