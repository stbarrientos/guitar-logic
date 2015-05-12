require_relative "string.rb"

class Scale

  attr_accessor :name, :degrees, :tuning

  def initialize(name, degrees = [], tuning: ["E","A","D","G","B","E"])
    @name = name
    @degrees = degrees
    @tuning = tuning
  end

  def index_degrees

  end

  def get_notes_from_intervals(intervals)
    notes = []
    notes << Note.new(self.name.split(" ")[0])
    for i in 0...intervals.length
      notes << (intervals[i] == "W" ? notes[i].next_whole_step : notes[i].next_half_step)
    end
    notes
  end

  def get_scale_notes
    notes = []
    case self.name.split(" ")[1]
    when "Major"
      notes = get_notes_from_intervals "WWHWWWH"
    when "Minor"
      notes = get_notes_from_intervals "WHWWWWH"
    when "Minor-Pentatonic"
      notes = get_notes_from_intervals "WHWWWHW"
    else
      return false
    end

    @degrees.map { |d| notes[d-1] }
  end

  def print_notes(options = {frets_only: false})
    scale_notes = get_scale_notes
    return "Unknown Scale. Please Create An Issue On Github For Review." unless scale_notes
    string_notes = []
    @tuning.each do |s|
      notes = []
      string = String.new(s)

      scale_notes.each do |n|
        if options[:frets_only]
          notes << string.find_note(n.name)
        else
          note_hash = {name: n.name, frets: string.find_note(n.name)}
          notes << note_hash
        end
      end

      if options[:frets_only]
        string_notes << notes.flatten.sort
      else
        string_notes << notes
      end

    end
    string_notes
  end

end

