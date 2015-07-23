import java.util.*;
import java.lang.*;

public class Note {
  protected final String noteName;
  protected Double nextInterval;
  protected Note nextNote;
  protected Double prevInterval;
  protected Note prevNote;

  public Note(String noteName){
    this.noteName = noteName;


    // Determine intervals based on sharps
    if (this.noteName.length() > 1){
      this.nextInterval = 0.5;
      this.prevInterval = 0.5;
    } else {
      // Get data from lookUp static class
      String[] intervals = Note.lookUp(this.noteName);
      this.nextInterval = Double.parseDouble(intervals[0]);
      this.prevInterval = Double.parseDouble(intervals[1]);
    }
  }

  public static Map<String,String[]> fillMap(){

    // HashMap to keep track of each notes intervals and neighboring notes
    Map<String, String[]> intervals = new HashMap<String, String[]>();

    // Array of all possible notes
    String[] allNotes = {"A","A#","B","C","C#","D","D#","E","F","G","G#"};

    // Loop through every note and populate our hash map
    for (String i : allNotes ){
      intervals.put(i, new String[4]);
    };

    // Update the map so all notes are covered
    intervals.put("A", new String[] {"1","1","B","G"});
    intervals.put("B", new String[] {"0.5","1","C","A"});
    intervals.put("C", new String[] {"1","0.5","D","B"});
    intervals.put("D", new String[] {"1","1","E","C"});
    intervals.put("E", new String[] {"0.5","1","F","D"});
    intervals.put("F", new String[] {"1","0.5","G","E"});
    intervals.put("G", new String[] {"1","1","A","F"});

    return intervals;
  }

  public static String[] lookUp(String key){
    Map<String, String[]> intervals = fillMap();
    return intervals.get(key);
  }

  public Note nextNote(){
    String startingLetter = Character.toString(this.noteName.charAt(0));
    return new Note(Note.lookUp(startingLetter)[2]);
  }

  public Note prevNote(){
    String startingLetter = Character.toString(this.noteName.charAt(0));
    return new Note(Note.lookUp(startingLetter)[3]);
  }

  public Note nextHalfStep(){
    // If the next note a half step away, return it
    if (this.nextInterval == 0.5){ return this.nextNote(); };

    // Otherwise, if the length of the note name is > 1, we have a sharp
    if (this.noteName.length() > 1){
      String startingLetter = Character.toString(this.noteName.charAt(0));
      return new Note(Note.lookUp(startingLetter)[2]);
    } else {
      return new Note(this.noteName + "#");
    }
  }

  public Note nextWholeStep(){
    return (this.nextInterval == 1) ? nextNote() : nextNote().nextHalfStep();
  }

  public Note prevHalfStep(){
    // If the next note a half step away, return it
    if (this.nextInterval == 0.5){ return this.nextNote(); };

    // Otherwise, if the length of the note name is > 1, we have a sharp
    if (this.noteName.length() > 1){
      String startingLetter = Character.toString(this.noteName.charAt(0));
      return new Note(startingLetter);
    } else {
      return new Note(Note.lookUp(this.noteName)[3] + "#");
    }
  }

  public Note prevWholeStep(){
    return (this.nextInterval == 1) ? this.prevNote() : this.prevNote().prevHalfStep();
  }

  public String getNoteName(){
    return noteName;
  }

  public static void main(String[] args){

    Note aSharp = new Note("A#");
    System.out.println(aSharp.getNoteName());
    System.out.println(aSharp.nextNote().getNoteName());
    System.out.println(aSharp.prevNote().getNoteName());
    System.out.println(aSharp.nextWholeStep().getNoteName());
    System.out.println(aSharp.nextHalfStep().getNoteName());
    System.out.println(aSharp.prevWholeStep().getNoteName());
    System.out.println(aSharp.prevHalfStep().getNoteName());
  }

}