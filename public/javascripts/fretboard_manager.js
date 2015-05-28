$(document).ready(function(){

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