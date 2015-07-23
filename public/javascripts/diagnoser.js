$(document).ready(function(){

  $("#diagnose-chord-btn").on("click", function(){
    var notes = []
    $(".highlighted").each(function(x,val){
      var note = $(val).html()
      if (note === "-"){
        notes.push($(val).attr("data-name"));
      } else {
        notes.push(note);
      };
    });
    chordArray = diagnoseChord(notes);
    if (chordArray.length == 1){
      report("Those Notes Make Up " + chordArray[0].fullName());
    } else if (chordArray.length > 1){
      var chordNames = chordArray.map(function(chord){
        return chord.fullName();
      }).join(", ");
      report("Multiple Chords Match Those Notes:\n" + chordNames);
    } else {
      report("No Chord Found That Matches Those Notes");
    }
  });

  function report(message){
    alert(message);
  };

});