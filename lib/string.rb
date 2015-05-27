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

  def show_whole_frets(frets = {starting: 1, ending: 12})
    frets[:starting].upto(frets[:ending]).map { |f| fret(f).name.length > 1 ? "-" : fret(f).name }
  end

  def find_note(target, maximum = 21)
    return [0,12] if target == self.open_note.name
    num = (0..12).detect { |n| fret(n).name == target }
    num + 12 > maximum ? [num] : [num, num+12]
  end

end
