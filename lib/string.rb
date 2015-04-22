require_relative "note.rb"

class String

  attr_accessor :name, :open_note, :prev_string, :next_string, :prev_interval, :next_interval

  def initialize(name)
    @name = name
    @open_note = Note.new(@name)
  end

  def first_note
    Note.new(self.name, self.prev_interval, self.next_interval)
  end

  def fret(num)
    current_fret = 0
    current_note = @open_note
    while current_fret <= num
      if num - current_fret == 2
        current_note = current_note.next_whole_step
        break
      elsif num - current_fret == 1
        current_note = current_note.next_half_step
        break
      else
        current_fret += current_note.next_interval * 2
        current_note = current_note.next_note
      end
    end
    current_note
  end

end