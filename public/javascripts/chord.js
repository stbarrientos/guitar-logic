var Chord = function(chordName,tone){
  this.chordName = chordName;
  this.tone = tone;
};

Chord.prototype = {

  fullName: function(){
    // Simple function to return name and tone, e.g A Minor
    return this.chordName + " " + this.tone;
  },

  majorNotes: function(){
    // Return an array of the notes that make up the major chord. Start with an empty array
    var notes = [];

    // Push the root, which is the name of the chord
    notes.push(new Note(this.chordName));

    // Push the 3rd degree of the scale
    notes.push(notes[0].nextWholeStep().nextWholeStep());

    // Push the 5th degree of the scale
    notes.push(notes[1].nextHalfStep().nextWholeStep());

    // Return the array
    return notes;
  },

  minorNotes: function(){
    // Return an array of the notes that make up the minor chord. Start with an empty array
    var notes = [];

    // Push the root/name of the chord
    notes.push(new Note(this.chordName));

    // Push the flat 3rd degree
    notes.push(notes[0].nextWholeStep().nextHalfStep());

    // Push the 5th degree
    notes.push(notes[1].nextWholeStep().nextWholeStep());

    // Return the array
    return notes;
  },

  listMajorNotes: function(){
    // Function to print the names of the major notes
    var notes = [];

    // Save the major notes array
    var majorNotes = this.majorNotes();

    // Go through every item in the major notes array
    for (var i = 0; i < majorNotes.length; i++){

      // Push the note name into the array
      notes.push(majorNotes[i].noteName);
    };

    // Return the array
    return notes;
  },

  listMinorNotes: function(){
    // Function to print the names of the minor notes
    var notes = [];

    // Save the minor notes array
    var minorNotes = this.minorNotes();

    // Go through each item of the minor notes array
    for (var i = 0; i < minorNotes.length; i++){

      // Push the note name into the array
      notes.push(minorNotes[i].noteName);
    };

    // Return the array
    return notes;
  },

};

function diagnoseChord(notesArray){
  // Function to diagnose a chord based on an array of notes. Start with a score variable and an empty current winner
  // This function works by tracking the chord with the highest "score", the most matched notes
  var score = 0;
  var currentWinner = [];

  // An array of every possible note
  var allNotes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"];

  // Loop through every note
  for (var i = 0; i < allNotes.length; i++){
    // Create a new chord with the note as the root
    var chord = new Chord(allNotes[i]);

    var personalScore = 0;

    // Create an array of all of the different chord variations we want to test
    var variationsArray = [chord.listMajorNotes(),chord.listMinorNotes()];
    var variationsNamesArray = ["Major","Minor"];

    // Our object to keep track of which variation has the highest score
    var scoreKeeper = [];

    // Go through each variation of the chord
    for (var j = 0; j < variationsArray.length; j++){
      // Keep track of each variation's score
      var variationScore = 0;

      // Loop through the variation's notes
      for (var x = 0; x < variationsArray[j].length; x++){
        // If this variation has a common note with the parameter passed to the function, increment it's score
        if (notesArray.indexOf(variationsArray[j][x]) > -1) variationScore++;
      };

      if (variationScore > personalScore){
        scoreKeeper = [variationsNamesArray[j],variationScore];
        personalScore = variationScore;
      };

    };

    // Compare this chord's highest variation score to the high score
    if (scoreKeeper[1] > score){

      // If we have a new high score, update the chords tone/variation
      chord.tone = scoreKeeper[0];

      // Set the new current winner
      currentWinner = [chord];
      score = scoreKeeper[1];
    } else if (scoreKeeper[1] === score){
       // If we have a tie, add him to the current winner array
       chord.tone = scoreKeeper[0];
       currentWinner.push(chord);
    };
  };
  
  return currentWinner;
};



