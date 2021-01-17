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
        newtermclear.className = "termclear";
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
            newdropzone.classList.add("dropzone");
            newdropzone.classList.add("year" + i);
            newdropzone.classList.add("term" + j);
            newdropzone.classList.add("course" + k);
            newdropstate.className = "dropstate";
            newdropstate.innerHTML = "placeholder";
            newdropzone.appendChild(newdropstate);
            newterm.appendChild(newdropzone);
        }
        let newtermclears = document.getElementsByClassName("termclear");
        for (let k = 0; k < newtermclears.length; k++) {
            newtermclears[k].classList.add("clear" + k);
        }
        newtermtab.appendChild(newtermlabel);
        newtermtab.appendChild(newtermclear);
        years[i].appendChild(newtermtab);
        years[i].appendChild(newterm);
    }
}

for (let i = 0; i < courses.length; i++) {
    let newdragzone = document.createElement("div");
    newdragzone.classList.add("dragzone");
    newdragzone.classList.add("course" + i);
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
$( "div.dropstate" ).draggable( {
    appendTo: "body",
    containment: "body",
    scroll: false,
    opacity: 1.5,
    helper: function(event) {
        return $(event.target).clone().css({
            width: $(event.target).width(),
            height: $(event.target).height()
        });
    }
});
$( "div.dropzone" ).droppable({
    drop: function( event, ui ) {
        /*$( this )
        .find( ".dropstate" )
            .css({
                display: "flex"
            })
            .html( ui.helper.html() );*/
        /*console.log($(this).attr("class"));
        console.log(classNumFromClassList($(this).attr("class"), "year"));
        console.log(classNumFromClassList($(this).attr("class"), "term"));
        console.log(classNumFromClassList($(this).attr("class"), "course"));
        console.log(classNumFromClassList(ui.draggable.attr("class"), "course"));*/
        row = (classNumFromClassList($(this).attr("class"), "year") * terms.length) + classNumFromClassList($(this).attr("class"), "term");
        col = classNumFromClassList($(this).attr("class"), "course");
        plan[row][col] = courses[classNumFromClassList(ui.draggable.attr("class"), "course")];
        document.getElementsByClassName("termclear")[row].style.display = "inline-block";
        debugplan();
        update(row, col);
    },
});

function debugplan() {
    for (let i = 0; i < 12; i++) {
        let row = "";
        for (let j = 0; j < 4; j++) {
            if (plan[i][j] === "!")
                row += plan[i][j] + " ";
            else 
                row += plan[i][j].getName() + " ";
        }
        row += "R" + (i + 1);
        console.log(row);
    }
    console.log("____________________");
}

// Gets number from class naming scheme [classname]## from a ClassList string
// Returns -1 if the ClassList string doesn't include the classname
function classNumFromClassList(fullstring, classname) {
    if (fullstring.indexOf(classname) != -1)
        return parseInt(fullstring.substring(fullstring.indexOf(classname), fullstring.indexOf(" ", fullstring.indexOf(classname))).substring(classname.length));
    else
        return -1;
}

function grow() {
    this.style.transform = "scale(1.1)";
}

function ungrow() {
    this.style.transform = "scale(1)";
}

function clearterm() {
    for (let i = 0; i < 4; i++) {
        plan[parseInt(this.classList[1][5])][i] = "!";
        update(parseInt(this.classList[1][5]), i);
    }
    debugplan();
    this.style.display = "none";
}
function update(row, column) {
    let dropzones = document.getElementsByClassName("dropzone");
    if (plan[row][column] !== "!") {
        dropzones[(row * 4) + column].firstChild.style.display = "flex";
    }
    else {
        dropzones[(row * 4) + column].firstChild.style.display = "none";
    }
}