class course {
    constructor(coursename, credits) {
        this.coursename = coursename;
        this.credits = credits;
    }
    getName() {
        return this.coursename;
    }
    getCredits() {
        return this.credits;
    }
}

let seasons = document.getElementsByClassName("season");
    courses = ["CS 1", "CS 2", "CS 3", "CS 4", "MATH 1", "MATH 2", "MATH 3", "MATH 4", "PHYS 1", "PHYS 2", "PHYS 3", "PHYS 4"];
    plan = [["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"], 
            ["!", "!", "!", "!"],
            ["!", "!", "!", "!"]];

for (let i = 0; i < courses.length; i++) {
    courses[i] = new course(courses[i], 4);
}

for (let i = 0; i < seasons.length; i++) {
    for (let j = 0; j < 4; j++) {
        let newdropzone = document.createElement("div");
        let newdropstate = document.createElement("div");
        newdropzone.className = "dropzone";
        newdropzone.id = i + "-" + j;
        newdropstate.className = "dropstate";
        newdropstate.innerHTML = "placeholder";
        newdropzone.appendChild(newdropstate);
        seasons[i].appendChild(newdropzone);
    }
}

for (let i = 0; i < courses.length; i++) {
    let newdragzone = document.createElement("div");
    newdragzone.className = "dragzone";
    newdragzone.id = courses[i].getName();
    newdragzone.innerHTML = courses[i].getName();
    document.getElementById("classlist").appendChild(newdragzone);
}

$( "div.dragzone" ).draggable( {
    appendTo: "body",
    containment: "body",
    scroll: false,
    opacity: 1.5,
    helper: function(event) {
        return $(event.target).clone().css({
            width: $(event.target).width()
        });
    }
});
$( "div.dropzone" ).droppable({
    drop: function( event, ui ) {
        $( this )
        .find( ".dropstate" )
            .css({
                display: "flex"
            })
            .html( ui.helper.html() )
            .draggable( {
                containment: "#plan",
                scroll: false,
                opacity: 1.5,
                helper: function(event) {
                    return $(event.target).clone().css({
                        width: $(event.target).width(),
                        height: $(event.target).height()
                    });
                }
            });
        console.log(ui.draggable.attr("id"));
    },
});
debugplan();
function debugplan() {
    for (let i = 0; i < 12; i++) {
        let row = "";
        for (let j = 0; j < 4; j++) {
            row += plan[i][j] + " ";
        }
        row += "R" + (i + 1);
        console.log(row);
    }
}