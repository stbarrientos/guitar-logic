package hello;

public class Note {
  private final String noteName;
  private final Float nextInterval;
  private final Note nextNote;
  private final Float prevInterval;
  private final Note prevNote;

  public Note(String noteName){
    this.noteName = noteName;
  }

  public String getNoteName(){
    return noteName;
  }
  
}