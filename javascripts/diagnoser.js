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
    chords = Chord.evaluateDegrees(notes);
    var result = "";
    var counter = 0;
    for (key in chords){
      if (chords[key] != null) {
        result += "\n" + key + ", Degrees: " + chords[key];
        counter++;
      };
    };

    if (counter == 1){
      report("Those Notes Make Up: " + result);
    } else if (counter > 1){
      report("Multiple Chords Match Those Notes:" + result);
    } else {
      report("No Chord Found That Matches Those Notes");
    };
  });

  function report(message){
    alert(message);
  };

});