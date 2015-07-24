$(document).ready(function(){

  // For non ruby implementation
  function drawFretboard(){
    var stringNames = ["E","B","G","D","A","E"];

    // Draw the fretboard markers on top of the fretboard
    for (var i = 0 ; i <= 21; i++){
      $(".frets").append("<div class='fret'><span>" + (i + 1) + "</span></div>");
    };

    // Draw each string
    $(stringNames).each(function(i, stringName){
      var string = new GuitarString(stringName);
      htmlString = "<div class='string'>";

      // Draw the notes on each string
      $(string.showAllFrets(0,21)).each(function(x, note){
        htmlString += "<div class='note'><div>" + note + "</div></div>";
      });
      $("#fretboard").append(htmlString + "</div><hr />");
    });
  };

  // Comment out if using ruby
  drawFretboard();

  // Turn all sharp notes into - and vic versa
  $("#toggle-sharp-notes").on("click", function(){
    if ($(this).hasClass("sharps-toggled")){
      $(".note div").each(function(x, val){
        if ($(val).html() === "-"){
          $(val).html( $(val).attr("data-name") );
        };
      });
      $(this).removeClass("sharps-toggled");
    } else {
      $(".note div").each(function(x, val){
        if ($(val).html().substr(-1) === "#"){
          $(val).attr("data-name", $(val).html());
          $(val).html("-");
        };
      });
      $(this).addClass("sharps-toggled");
    };
  });

  // Toggle the highlighted class which draws a red circle around the note
  $(".note").on("click", function(){
    $(this).children().toggleClass("highlighted");
  });

  // Remove highlighted from all notes
  $("#clear-highlighted-btn").on("click", function(){
    $(".highlighted").removeClass("highlighted");
  });

});