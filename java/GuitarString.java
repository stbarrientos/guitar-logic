public class GuitarString {

  private final String stringName;
  private final Note openNote;

  public GuitarString(String stringName){
    this.stringName = stringName;
    this.openNote = new Note(stringName);
  }

  public Note fret(int num){
    // If num is the open note, simply return the open note
    if (num == 0) { return this.openNote; };

    // If the first fret is requested, return the next half step after the open note
    if (num == 1) { return this.openNote.nextHalfStep(); };

    // Iterator and value holder for while loop
    int currentFret = 0;
    Note currentNote = this.openNote;

    // While the iterator is less than the argument
    while (currentFret <= num){

      // If the iterator is a whole step away from the target, return a whole step from the current note
      if (num - currentFret == 2){
        return currentNote.nextWholeStep();

      // If the iterator is a half step away from the target, return a half step from the current note
      } else if (num - currentFret == 1){
        return currentNote.nextHalfStep();

      // If we aren't close enough to the target yet, update the iterator and value holder
      } else {
        currentFret += currentNote.nextInterval * 2;
        currentNote = currentNote.nextWholeStep();
      };
    };

    return currentNote;
  }

  public String[] showAllFrets(int starting, int ending){
    // Empty array to hold notes from for loop
    String[] fretArray = new String[(ending - starting) + 1];

    // For loop to get note values
    for (int i = starting; i <= ending; i++){
      // Push all notes into the fretArray
      fretArray[i] = this.fret(i).noteName;
    };
    return fretArray;
  }

  public String[] showWholeFrets(int starting, int ending){
    // Empty array to hold notes
    String[] fretArray = new String[(ending - starting) + 1];

    // For loop to get note values
    for (int i = starting; i <= ending; i++){

      // Store the value of the iterator's fret
      Note thisFret = this.fret(i);
      if (thisFret.noteName.length() > 1){
        fretArray[i] = "-";
      } else {
        fretArray[i] = thisFret.noteName;
      };
    };

    // Return the fret array
    return fretArray;
  }

  public int[] findNote(String target, int maximum){

    // If the target happens to be the string name, return the open note and 12th fret
    if (target == this.openNote.noteName){ return new int[]{0,12}; };

    int fret = 1;

    // For loop to find first occurance of the target
    for (int i = 1; i <= 12; i++){

      // If this fret matches the target, save the iterator value and break out of the loop
      if (this.fret(i).noteName == target){
        fret = i;
        break; 
      };
    };

    return (fret + 12 > maximum) ? new int[]{fret} : new int[]{fret, fret + 12};
  }

  public static void main(String[] args){
    GuitarString aString = new GuitarString("A");
    System.out.println(aString.openNote.noteName);
    System.out.println(aString.fret(5).noteName);
    System.out.println(aString.showAllFrets(0,12));
    System.out.println(aString.showWholeFrets(0,12));
    System.out.println(aString.findNote("E",21));
  }

}