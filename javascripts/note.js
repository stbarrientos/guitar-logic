var Note = function(noteName){
  this.noteName = noteName;
  this.classify();
};

Note.prototype = {
  classify: function(){
    if (this.noteName.length > 1){
      this.nextInterval = 0.5, this.prevInterval = 0.5
    } else {
      ref = Note.allNotesWithIntervals[this.noteName]
      this.nextInterval = ref["nextInterval"];
      this.prevInterval = ref["prevInterval"];
    };
  }, 

  nextNote: function(){
    return new Note(Note.allNotesWithIntervals[this.noteName[0]]["nextNote"]);
  },

  prevNote: function(){
    return new Note(Note.allNotesWithIntervals[this.noteName[0]]["prevNote"]);
  },

  nextHalfStep: function(){

    // If the next half step is the next whole note, we are done
    if (this.nextInterval === 0.5) return this.nextNote();

    // If the name has a modifier, i.e #
    if (this.noteName.length > 1){

      // Return the next note value of the half step down
      return new Note(Note.allNotesWithIntervals[this.noteName[0]]["nextNote"]);
    } else {

      // Return the sharp version of this note
      return new Note(this.noteName + "#");
    };
  },

  prevHalfStep: function(){
    // If the previous half step is the prev whole note, return it
    if (this.prevInterval === 0.5) return this.prevNote();

    // If the name has a modifier
    if (this.noteName.length > 1){

      // Return this note without the sharp
      return new Note(this.noteName[0]);
    } else {

      // Return the sharp version of the previous whole note
      return new Note(Note.allNotesWithIntervals[this.noteName]["prevNote"] + "#");
    }
  },

  nextWholeStep: function(){
    // If the interval is 1, return the next note, if it's 0.5 (sharp), add 1 and a half notes
    return (this.nextInterval === 1) ? this.nextNote() : this.nextNote().nextHalfStep();
  },

  prevWholeStep: function(){
    // See nextWholeStep()
    return (this.prevInterval === 1) ? this.prevNote() : this.prevNote().prevHalfStep();
  },


};

Note.allNotes = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]

Note.allNotesWithIntervals = {
  "A": {"nextInterval": 1, "prevInterval": 1, "nextNote": "B", "prevNote": "G"},
  "B": {"nextInterval": 0.5, "prevInterval": 1, "nextNote": "C", "prevNote": "A"},
  "C": {"nextInterval": 1, "prevInterval": 0.5, "nextNote": "D", "prevNote": "B"},
  "D": {"nextInterval": 1, "prevInterval": 1, "nextNote": "E", "prevNote": "C"},
  "E": {"nextInterval": 0.5, "prevInterval": 1, "nextNote": "F", "prevNote": "D"},
  "F": {"nextInterval": 1, "prevInterval": 0.5, "nextNote": "G", "prevNote": "E"},
  "G": {"nextInterval": 1, "prevInterval": 1, "nextNote": "A", "prevNote": "F"}
};




