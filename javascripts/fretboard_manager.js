document.addEventListener("DOMContentLoaded", function() {

  var tab = {
    1 : [],
    2 : [],
    3 : [],
    4 : [],
    5 : [],
    6 : []
  };

  // For non ruby implementation
  function drawFretboard(){
    var stringNames = ["E","B","G","D","A","E"];

    // Draw the fretboard markers on top of the fretboard
    var frets = document.getElementsByClassName("frets")[0];
    for (var i = 0 ; i <= 21; i++){
      var existingHTML = frets.innerHTML;
      frets.innerHTML = existingHTML + "<div class='fret'><span>" + (i) + "</span></div>";
    };

    // Draw each string
    for (var i = 0; i < stringNames.length; i++) {
      var string = new GuitarString(stringNames[i]);
      htmlString = "<div class='string'>";

      // Draw the notes on each string
      var allFrets = string.showAllFrets(0,21);
      for (var x = 0; x < allFrets.length; x++){
        htmlString += "<div class='note' data-fret='" + x + "'' data-string='" + (i + 1) + "'><div>" + allFrets[x] + "</div></div>";
      };

      var fretboard = document.getElementById("fretboard");
      var existingHTML = fretboard.innerHTML;
      fretboard.innerHTML = existingHTML + htmlString + "</div><hr />";
    };
  };

  // Comment out if using ruby
  drawFretboard();

  // Turn all sharp notes into - and vic versa
  document.getElementById("toggle-sharp-notes").addEventListener("click", function(){
    if (this.classList.contains("sharps-toggled")){
      var notes = document.getElementsByClassName("note");
      for (var i = 0; i < notes.length; i++){
        var noteDiv = notes[i].getElementsByTagName("div")[0];
        if (noteDiv.innerHTML === "-"){
          noteDiv.innerHTML = noteDiv.getAttribute("data-name");
        };
      };
      this.classList.remove("sharps-toggled");
    } else {
      var notes = document.getElementsByClassName("note");
      for (var i = 0; i < notes.length; i++){
        var noteDiv = notes[i].getElementsByTagName("div")[0];
        if (noteDiv.innerHTML.charAt( noteDiv.innerHTML.length - 1) === "#"){
          noteDiv.setAttribute("data-name", noteDiv.innerHTML);
          noteDiv.innerHTML = "-";
        };
      };

      this.classList.add("sharps-toggled");
    };
  });

  // Toggle the highlighted class which draws a red circle around the note
  var noteElements = document.getElementsByClassName("note")
  for (var i = 0; i < noteElements.length; i++){
    noteElements[i].addEventListener("click", function(){
      var div = this.getElementsByTagName("div")[0];
      if (div.classList.contains("highlighted")){
        div.classList.remove("highlighted");
      } else {
        div.classList.add("highlighted");
      };
    });
  };

  // Remove highlighted from all notes
  document.getElementById("clear-highlighted-btn").addEventListener("click", function(){
    var highlighted = document.getElementsByClassName("highlighted");
    for (var i = highlighted.length - 1; i >= 0; i--){
      if (highlighted[i].classList.contains("highlighted")){
        highlighted[i].classList.remove("highlighted");
      };
    };
  });

  // Add highlighted frets to tab
  document.getElementById("add-to-tab").addEventListener("click", function (){
    var highlighted = document.getElementsByClassName("highlighted");

    // Go through all six strings and update our tab object
    for (var i = 1; i <= 6; i++){

      // If we have a note on that string (or notes), add them to the object
      var notesOnString = []
      for (var x = 0; x < highlighted.length; x++){

        // If this highlighted note is on the same string that we are currently on
        var currentNote = highlighted[x].parentNode;
        if (currentNote.getAttribute("data-string") == i){
          notesOnString.push(currentNote.getAttribute("data-fret"));
        };
      };

      // If no highlighted notes were found on that string, add an empty mark
      if (notesOnString.length === 0){
        notesOnString.push("-")
      };

      // Add each item of notesOnString to the object array
      for (var y = 0; y < notesOnString.length; y++){
        tab[i].push(notesOnString[y]);
      };
    };

    // Write the tab object to the page
    writeTabToPage();
  });

  function writeTabToPage(){
    var textarea = document.getElementsByTagName("textarea")[0];

    // Clear the textarea
    textarea.value = "";
    console.log(tab)

    // Go through each string
    for (var i = 1; i <= 6; i++){

      // Access the notes for this string in the tabs object
      var notesArray = tab[i];

      for (var x = 0; x < notesArray.length; x++){
        textarea.value += notesArray[x] + " - ";
      };

      textarea.value += "\n";
    };
  };
});


