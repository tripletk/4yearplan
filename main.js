let seasons = document.getElementsByClassName("season");
    classlist = document.getElementById("classlist");
    classes = ["CS 1", "CS 2", "CS 3", "CS 4", "MATH 1", "MATH 2", "MATH 3", "MATH 4", "PHYS 1", "PHYS 2", "PHYS 3", "PHYS 4"];

for (let i = 0; i < seasons.length; i++) {
    for (let j = 0; j < 4; j++) {
        let newdropzone = document.createElement("div");
        let newdropstate = document.createElement("div");
        newdropzone.className = "dropzone";
        newdropstate.className = "dropstate";
        newdropstate.innerHTML = "placeholder";
        newdropzone.appendChild(newdropstate);
        seasons[i].appendChild(newdropzone);
    }
}

for (let i = 0; i < classes.length; i++) {
    let newdragzone = document.createElement("div");
    newdragzone.className = "dragzone";
    newdragzone.innerHTML = classes[i];
    classlist.appendChild(newdragzone);
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
            .html( "Dropped!" );
    }
});
    