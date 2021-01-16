let seasons = document.getElementsByClassName("season");
    classes = document.getElementById("classes");
    nofclasses = 10;

for (let i = 0; i < seasons.length; i++) {
    for (let j = 0; j < 4; j++) {
        let newdropzone = document.createElement("div");
        newdropzone.className = "dropzone";
        seasons[i].appendChild(newdropzone);
    }
}

for (let i = 0; i < nofclasses; i++) {
    let newdragzone = document.createElement("div");
    newdragzone.className = "dragzone";
    classes.appendChild(newdragzone);
}