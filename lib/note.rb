class Note
  
  attr_accessor :name, :prev_interval, :next_interval

  def initialize(name, prev_interval = nil, next_interval = nil)
    @name = name
    classify
  end

  def next_note
    new_note = Note.reference(self.name[0])
    new_note_name = new_note[:next_note]
    new_note = Note.reference(new_note_name)
    Note.new(new_note_name, new_note[:prev_interval], new_note[:next_interval])
  end

  def next_half_step
    return self.next_note if self.next_interval == 0.5 
    if self.name[1] == "#"
      base = Note.reference(self.name[0])
      Note.new(base[:next_note])
    else
      Note.new(self.name + "#")
    end
  end

  def next_whole_step
    self.next_interval == 1 ? self.next_note : self.next_note.next_half_step
  end

  def classify
    if self.name[1]
      self.next_interval = self.prev_interval = 0.5
    else
      ref = Note.reference self.name
      self.next_interval, self.prev_interval = ref[:next_interval], ref[:prev_interval]
    end
  end

  def self.reference(name)
    case name
    when "A"
      {next_interval: 1, prev_interval: 1, next_note: "B"}
    when "B"
      {next_interval: 0.5, prev_interval: 1, next_note: "C"}
    when "C"
      {next_interval: 1, prev_interval: 0.5, next_note: "D"}
    when "D"
      {next_interval: 1, prev_interval: 1, next_note: "E"}
    when "E"
      {next_interval: 0.5, prev_interval: 1, next_note: "F"}
    when "F"
      {next_interval: 1, prev_interval: 1, next_note: "G"}
    when "G"
      {next_interval: 1, prev_interval: 1, next_note: "A"}
    end
  end

end

puts Note.new("A").next_half_step.name


