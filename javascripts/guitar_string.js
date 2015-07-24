var GuitarString = function(stringName){
  this.stringName = stringName;
  this.openNote = new Note(stringName);
};

GuitarString.prototype = {

  fret: function(num){
    if (num === 0) return this.openNote;
    if (num === 1) return this.openNote.nextHalfStep();
    var currentFret = 0;
    var currentNote = this.openNote;
    while (currentFret <= num){
      if (num - currentFret === 2){
        return currentNote.nextWholeStep(); 
      } else if (num - currentFret === 1){
        return currentNote.nextHalfStep();
      } else {
        currentFret += currentNote.nextInterval * 2;
        currentNote = currentNote.nextNote();
      };
    };
    return currentNote;
  },

  showAllFrets: function(starting,ending){
    var fretArray = [];
    for (var i = starting; i <= ending; i++){
      fretArray.push(this.fret(i).noteName);
    };
    return fretArray;
  },

  showWholeFrets: function(starting,ending){
    fretArray = []
    for (var i = starting; i <= ending; i++){
      var thisFret = this.fret(i);
      if (thisFret.noteName.length > 1){
        fretArray.push("-");
      } else {
        fretArray.push(thisFret.noteName);
      };
    };
    return fretArray;
  },

  findNote: function(target,maximum){
    if (target === this.openNote.noteName) return [0,12];
    var fret;
    for (var i = 0; i <= 12; i++){
      if (this.fret(i).noteName === target){
        fret = i;
        break; 
      };
    };
    return (fret + 12 > maximum) ? [fret] : [fret, fret+12];
  }

};