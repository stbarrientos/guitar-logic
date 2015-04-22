require_relative "note.rb"

class String

  attr_accessor :name, :open_note, :prev_string, :next_string, :prev_interval, :next_interval

  def initialize(name)
    @name = name
    @open_note = Note.new(@name)
  end

  def fret(num)
    return @open_note if num == 0
    return @open_note.next_half_step if num == 1
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

  def show_all_frets(frets = {starting: 1, ending: 12})
    frets[:starting].upto(frets[:ending]).map { |f| fret(f).name }
  end

end

# puts String.new("E").show_all_frets
# puts String.new("E").fret(2).name