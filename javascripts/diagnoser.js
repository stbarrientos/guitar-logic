document.addEventListener("DOMContentLoaded", function() {

  var modal = new Modal({
    "element": document.getElementById("chord-modal"),
    "header": "Chord Diagnoser",
    "footer": "<button id='modal-close'>Close</button>"
  });

  document.getElementById("modal-close").addEventListener("click", function(){
    modal.hide();
  });

  document.getElementById("diagnose-chord-btn").addEventListener("click", function(){
    var notes = []
    var targetFrets = document.getElementsByClassName("highlighted");
    for (var i = 0; i < targetFrets.length; i++){
      var note = targetFrets[i];
      if (note.innerHTML === "-"){
        notes.push(note.getAttribute("data-name"));
      } else {
        notes.push(note.innerHTML);
      };
    };

    chords = Chord.evaluateDegrees(notes);
    var result = "";
    var counter = 0;
    for (key in chords){
      if (chords[key] != null) {
        result += key + ", Degrees: " + chords[key] + "<br>";
        counter++;
      };
    };
    if (counter == 1){
      modal.modalBody = result;
    } else if (counter > 1){
      modal.modalBody = result;
    } else {
      modal.modalBody("No Chord Found That Matches Those Notes");
    };
    modal.setBody().show();
  });
});


