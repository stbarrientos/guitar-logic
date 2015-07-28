var Chord = function(attributes){
  this.chordName = attributes["chordName"];
  this.tone = attributes["tone"];
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
  }



};

// Object to keep track of all known interval values for the different chords
Chord.allChordIntervals = {
  "Major": "WWHWWWH",
  "Minor": "WHWWWWH"
};

// Object to keep track of the different degrees that make up different chords
Chord.degrees = {};

Chord.diagnose = function(notesArray){

  // Keep track of the winning interval
  var winningIntervalScore = 0;
  var winningInterval = "";
  var winningChord = "";
      // Keep track of the current winning root note
    var winningRootScore = 0;
    var winningRoot = "";

  // Loop through each saved interval value in the Chord.intervals store
  for (key in Chord.allChordIntervals){

    // We will save the key as the interval name, and the interval string as intervals
    var currentIntervalName = key;
    var intervals = Chord.allChordIntervals[key];

    // Go through every note from the Note.intervals object so we cover every possibility
    for (i in Note.allNotes){
      var root = Note.allNotes[i];

      // Keep Track of this root's score
      var rootScore = 0;

      // Save the current note
      var currentNote = root;

      for (var x = 0; x < intervals.length; x++){

        // Save the chord name so we know the tonality at the end of the function
        var chordName = root + ":" + currentIntervalName

        // If the current note is in the notesArray, add to the note score
        if (notesArray.indexOf(currentNote) > -1) {
          rootScore ++;
        };

        // If we have a new winner, store it
        if (rootScore > winningRootScore){
          winningRootScore = rootScore;

          // Only update the winning note if it is different than the current root
          if (winningRoot != chordName){ winningRoot = chordName; };

        // if there is a tie, add the current note to the winning note
        } else if (rootScore === winningRootScore && winningRoot !== root){

          // if winningNote is already an array, push current note into it
          if (Object.prototype.toString.call( winningRoot ) === "[object Array]" && winningRoot.indexOf(chordName) === -1){
            winningRoot.push(chordName);

          // if winning note is not an array, turn it into an array with itself and the current note as it's items
          } else if (Object.prototype.toString.call( winningRoot ) !== "[object Array]" && winningRoot !== chordName) {
            winningRoot = [winningRoot, chordName];
          };
        };

        // Save the current chracter of the intervals string
        var currentInterval = intervals.charAt(x);

        // If the current intervale is a W for whole step, set the current note to the next whole step
        if (currentInterval === "W"){
          currentNote = new Note(currentNote).nextWholeStep().noteName;

        // If the current interval is a H for half step, set the current note to the next half step
        } else if (currentInterval === "H"){
          currentNote = new Note(currentNote).nextHalfStep().noteName;

        // Otherwise the interval is bad, just stop
        } else {
          return false;
        };
      };
    };

    if (winningRootScore > winningIntervalScore){
      winningIntervalScore = winningRootScore;
      winningInterval = currentIntervalName;
    } else if (winningRootScore === winningIntervalScore){
      if (Object.prototype.toString.call( winningInterval ) === "[object Array]" && winningRoot.indexOf(currentIntervalName) === -1){
        winningRoot.push(currentIntervalName);
      } else if (Object.prototype.toString.call( winningInterval ) !== "[object Array]") {
        winningInterval = [winningInterval, currentIntervalName];
      };
    };
  };

  return winningRoot;
};

Chord.evaluateDegrees = function(notesArray){

  // Keep our result in an object
  var results = {};

  // Diagnose the notes array and save the chords
  var chords = Chord.diagnose(notesArray);

  // Go through each root, line up the degrees
  for ( i in chords ){

    // Split the chord string to get the root and the tone, then retrieve the intervals from the allChordIntervals object
    var chordSplit = chords[i].split(":")
    var root = chordSplit[0];
    var tone = chordSplit[1];
    var intervals = Chord.allChordIntervals[tone];

    // Store the degrees that align with each root
    var degrees = [];
    var currentNote = root;

    for (x in intervals){
      if (notesArray.indexOf(currentNote) !== -1){
        degrees.push(parseInt(x)+1);
      };
      if (intervals[x] === "W"){
        currentNote = new Note(currentNote).nextWholeStep().noteName;
      } else if (intervals[x] === "H"){
        currentNote = new Note(currentNote).nextHalfStep().noteName;
      } else {
        return false;
      };
    };
    results[root + " " + tone] = degrees;
  };
  return results;
};

