$(document).ready(function(){

  console.log("locked and loaded");

  // Set the paper that we will be drawing the fretboard on
  var paper = Raphael(50,50,1200,300);

  // Draw 6 Strings equally spaced apart
  function drawStrings(startX,startY){
    increment = 0
    for (var i = 0; i < 6; i++){
      string = paper.path("M" + startX + "," + (startY+increment) + "H1100");
      increment += 39;
      console.log(string);
    };
  };

  function drawFret(){};

  // Function to draw dots around the notes
  function drawNotes(){};

  // Function to grow dots when clicked
  function selectNote(){};

  // Function to draw the fret markers (dots on the fretboard)
  function drawFretDots(){};

  // Bring it all together and draw the fretboard
  drawStrings(50,56);
  drawNotes();
  drawFretDots();

});