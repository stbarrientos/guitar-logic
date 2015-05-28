$(document).ready(function(){

  function diagnose(notes){
    $.ajax({
      url: "/diagnose",
      method: "POST",
      dataType: "json",
      data: {"notes": notes},
      success: function(data){
        alert("This Chord Is " + data["name"] + ". It is made up of " + data["notes"].join(", "))
      }
    });
  };

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
    diagnose(notes);
  });
});