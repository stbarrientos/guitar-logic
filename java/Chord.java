import java.util.*;

public class Chord {

  private String chordName;
  public String tone;

  public String fullName(){
    return this.chordName + " " + this.tone;
  }

  public Chord(String chordName){
    this.chordName = chordName;
  }

  public Chord(String chordName, String tone){
    this.chordName = chordName;
    this.tone = tone;
  }

  public Note[] majorNotes(){
    // Start with a new array to hold the notes of the chord
    Note[] notes = new Note[3];

    // First, push the root note
    notes[0] = new Note(this.chordName);

    // Push the third degree of the chord
    notes[1] = notes[0].nextWholeStep().nextWholeStep();

    // Push the 5th degree of the chord
    notes[2] = notes[1].nextHalfStep().nextWholeStep();

    // Return the array
    return notes;
  }

  public Note[] minorNotes(){
    // Start with a new array to hold the notes of the chord
    Note[] notes = new Note[3];

    // First, push the root note
    notes[0] = new Note(this.chordName);

    // Push the third degree of the chord
    notes[1] = notes[0].nextWholeStep().nextHalfStep();

    // Push the 5th degree of the chord
    notes[2] = notes[1].nextWholeStep().nextWholeStep();

    // Return the array
    return notes;
  }

  public String[] listMajorNotes(){
    // Array to hold the note names
    String[] notes = new String[3];

    // Save the major notes array
    Note[] majorNotes = this.majorNotes();

    // Fill the notes array with the names of the major notes
    for (int i = 0; i < majorNotes.length; i++){

      // Push only the note name into the array
      notes[i] = majorNotes[i].noteName;
    };

    // Return the array with the note names
    return notes;
  }

  public String[] listMinorNotes(){
    // Array to hold the note names
    String[] notes = new String[3];

    // Save the major notes array
    Note[] minorNotes = this.minorNotes();

    // Fill the notes array with the names of the minor notes
    for (int i = 0; i < minorNotes.length; i++){

      // Push only the note name into the array
      notes[i] = minorNotes[i].noteName;
    };

    // Return the array with the note names
    return notes;
  }

  public static Chord[] diagnose(String[] noteArray){
    // Variable to keep track of the high score set by the winning chord
    int score = 0;
    Chord[] currentWinner = new Chord[1];

    // Array of all possible notes
    String[] allNotes = new String[]{"A","A#","B","C","C#","D","D#","E","F","F#","G","G#"};

    // Loop through every note
    for (int i = 0; i < allNotes.length; i++){

      // Create a new chord for the current note
      Chord chord = new Chord(allNotes[i]);

      // Keep track of the highest variation score within the chord
      int personalScore = 0;

      // Array to keep track of notes in each variations
      String[][] variationsArray = new String[][]{chord.listMajorNotes(),chord.listMinorNotes()};

      // Array to keep track of names of each variation
      String[] variationsNamesArray = new String[]{"Major","Minor"};

      // Our object to keep track of which variation has the highest score
      Object[] scoreKeeper = new Object[2];

      // Go through each variation of the chord
      for (int j = 0; j < variationsArray.length; j++){

        // Keep track of each variation's score
        int variationScore = 0;

        // Loop through the variation's notes
        for (int x = 0; x < variationsArray[j].length; x++){

          // If this variation has a common note with the parameter passed to the function, increment it's score
          for (int y = 0; y < allNotes.length; y++) {
            if (allNotes[y] == variationsArray[j][x]) {
              System.out.println(allNotes[y] + " matched with " + variationsArray[j][x]);
              variationScore++;
              break;
            };
          };
        };

        if (variationScore > personalScore){
          scoreKeeper = new Object[]{new String(variationsNamesArray[j]), new Integer(variationScore)};
          personalScore = variationScore;
        };
      };

      // Compare this chord's highest variation score to the high score
      if ((Integer)scoreKeeper[1] > score){
        // If we have a new high score, update the chords tone/variation
        chord.tone = (String)scoreKeeper[0];
        System.out.println("score: " + score + ", new current winner (first condition) " + chord.fullName() + " with personal score of: " + scoreKeeper[1]);

        // Set the new current winner
        currentWinner = new Chord[]{chord};

        score = (Integer)scoreKeeper[1];
      } else if ((Integer)scoreKeeper[1] == score){
         // If we have a tie, add him to the current winner array
         chord.tone = (String)scoreKeeper[0];
         System.out.println("score: " + score + ", new current winner (second condition) " + chord.fullName() + " with personal score of: " + scoreKeeper[1]);
         Chord[] holder = new Chord[currentWinner.length];
         System.arraycopy(holder, 0, currentWinner, 0, currentWinner.length);
         currentWinner = new Chord[currentWinner.length + 1];
         for (int z = 0; z < holder.length; z++){
          currentWinner[z] = holder[z];
         };
         currentWinner[currentWinner.length - 1] = chord;
      };
    };

    // Return the current winner
    return currentWinner;
  }

  public static void main(String[] args){

    // String[] aMinorNotes = new Chord("A","Minor").listMinorNotes();
    // String[] cMajorNotes = new Chord("C","Major").listMajorNotes();

    // Chord chord = new Chord(args[0],args[1]);
    // System.out.println(chord.tone);
    // if (chord.tone == "Major"){
    //   notes = chord.listMajorNotes();
    // } else if (chord.tone == "Minor") {
    //   notes = chord.listMinorNotes();
    // } else {
    //   notes = new String[]{"Unknown Tonality"};
    // };
    // System.out.println("A Minor Notes: ");
    // for (int x = 0; x < aMinorNotes.length; x++){
    //   System.out.print(aMinorNotes[x] + " ");
    // };

    // System.out.println("C Major Notes:");
    // for (int x = 0; x < cMajorNotes.length; x++){
    //   System.out.print(cMajorNotes[x] + " ");
    // };


    System.out.println(Chord.diagnose(new String[]{"A","C","E"})[0]);
  }
}