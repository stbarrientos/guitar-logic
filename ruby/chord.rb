require_relative "guitar_string.rb"

class Chord

  attr_accessor :name, :tone

  def initialize(name,tone = nil)
    @name = name
    @tone = tone
  end

  def full_name
    "#{self.name} #{self.tone.capitalize}"
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

  def self.diagnose(notes_array)
    score = 0
    current_winner = nil
    ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"].each do |n|
      major_chord = Chord.new(n,"Major")
      minor_chord = Chord.new(n,"Minor")

      # Go through major notes
      check_array = major_chord.list_major_notes
      personal_score = 0
      check_array.each do |c|
        personal_score += 1 if notes_array.include? c
      end

      if personal_score > score
        current_winner = major_chord
        score = personal_score
      end

      # Go through minor notes
      check_array = minor_chord.list_minor_notes
      personal_score = 0
      check_array.each do |c|
        personal_score += 1 if notes_array.include? c
      end

      if personal_score > score
        current_winner = minor_chord
        score = personal_score
      end

    end
    current_winner
  end

end

