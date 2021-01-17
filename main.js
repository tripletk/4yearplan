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

let years = document.getElementsByClassName("year");
    terms = ["fall", "winter", "spring"];
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

for (let i = 0; i < years.length; i++) {
    let newyearlabel = document.createElement("div");
    newyearlabel.className = "yearlabel";
    newyearlabel.innerHTML = "year " + (i + 1);
    years[i].appendChild(newyearlabel);
    for (let j = 0; j < terms.length; j++) {
        let newtermtab = document.createElement("div");
        let newtermlabel = document.createElement("div");
        let newtermclear = document.createElement("p");
        let newterm = document.createElement("div");
        newtermtab.className = "termtab";
        newtermlabel.className = "termlabel";
        newterm.className = "term";
        newtermlabel.innerHTML = terms[j];
        newtermclear.innerHTML = "clear courses for " + terms[j];
        newtermclear.style.fontWeight = "500";
        newtermclear.addEventListener("mouseover", grow);
        newtermclear.addEventListener("mouseleave", ungrow);
        newtermclear.addEventListener("click", clearterm);
        for (let k = 0; k < 4; k++) {
            let newdropzone = document.createElement("div");
            let newdropstate = document.createElement("div");
            newdropzone.className = "dropzone";
            newdropstate.className = "dropstate";
            newdropstate.innerHTML = "placeholder";
            newdropzone.appendChild(newdropstate);
            newterm.appendChild(newdropzone);
        }
        newtermtab.appendChild(newtermlabel);
        newtermtab.appendChild(newtermclear);
        years[i].appendChild(newtermtab);
        years[i].appendChild(newterm);
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

function grow() {
    this.style.transform = "scale(1.1)";
}

function ungrow() {
    this.style.transform = "scale(1)";
}

function clearterm() {

}