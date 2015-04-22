class Note
  
  attr_accessor :name, :prev_interval, :next_interval

  def initialize(name, prev_interval = nil, next_interval = nil)
    @name = name
    classify
  end

  def next_note
    Note.new Note.reference(self.name[0])[:next_note]
  end

  def prev_note
    name = self.name
    Note.new( name[1] ? name[0] : Note.reference(name)[:prev_note])
  end

  def next_half_step
    return self.next_note if self.next_interval == 0.5 
    if self.name[1]
      base = Note.reference(self.name[0])
      Note.new(base[:next_note])
    else
      Note.new(self.name + "#")
    end
  end

  def prev_half_step
    return self.prev_note if self.prev_interval == 0.5
    if self.name[1]
      Note.new(self.name[0])
    else
      Note.new( Note.reference(self.name)[:prev_note] + "#")
    end
  end

  def next_whole_step
    self.next_interval == 1 ? self.next_note : self.next_note.next_half_step
  end

  def prev_whole_step
    self.prev_interval == 1 ? self.prev_note : self.prev_note.prev_half_step
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
      {next_interval: 1, prev_interval: 1, next_note: "B", prev_note: "G"}
    when "B"
      {next_interval: 0.5, prev_interval: 1, next_note: "C", prev_note: "A"}
    when "C"
      {next_interval: 1, prev_interval: 0.5, next_note: "D", prev_note: "B"}
    when "D"
      {next_interval: 1, prev_interval: 1, next_note: "E", prev_note: "C"}
    when "E"
      {next_interval: 0.5, prev_interval: 1, next_note: "F", prev_note: "D"}
    when "F"
      {next_interval: 1, prev_interval: 0.5, next_note: "G", prev_note: "E"}
    when "G"
      {next_interval: 1, prev_interval: 1, next_note: "A", prev_note: "F"}
    end
  end

end

puts Note.new("A").next_half_step.name


