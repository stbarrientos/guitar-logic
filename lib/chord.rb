require "note"

class Chord

  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def major_notes
    notes = []
    notes << Note.new(self.name)
    notes << notes[0].next_whole_step.next_whole_step
    notes << notes[1].next_half_step.next_whole_step
    notes
  end

  def minor_notes
    notes = []
    notes << Note.new(self.name)
    notes << notes[0].next_whole_step.next_half_step
    notes << notes[1].next_whole_step.next_whole_step
    notes
  end

  def list_major_notes
    major_notes.map { |n| n.name }
  end

  def list_minor_notes
    minor_notes.map { |n| n.name }
  end

end