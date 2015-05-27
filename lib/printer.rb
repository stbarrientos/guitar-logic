require_relative "chord.rb"
require_relative "scale.rb"

module Printer

  def self.print_fretboard(strings)

    # Print the top of the fretboard
    # 22.times { print " - " }
    print "\n"

    # Loop through each string
    strings.each do |string|
      string.show_whole_frets(starting: 0, ending: 21).each { |fret| print " #{fret} " }
      print "\n"
    end
  end

  def self.print_scale_notes(scale)
    print "\n"
    scale.print_notes.each do |string|
      array = []
      22.times { array << "-" }
      string.each do |note_hash|
        note_hash[:frets].length.times { |i| array[note_hash[:frets][i]] = note_hash[:name] }
      end
      array.each { |x| print x[-1] == "#" ? " #{x} " : " #{x}  " }
      print "\n"
    end
  end

  def self.print_scale_tab(scale)
    written_count = 0
    scale.print_notes(frets_only: true).reverse_each do |string|
      written_count.times { print "-" }
      written_count += string.to_s.length - 2
      string.each { |fret| print fret.to_s.length > 1 ? "#{fret}-" : "#{fret}--"}
      print "\n"
    end
  end

end

def reverse_each
  (self.length-1).down_to(0) { |x| yield self[x] }
end

Printer.print_fretboard([String.new("E"), String.new("B"),String.new("G"), String.new("D"), String.new("A"), String.new("E")])
print "\n\n"
Printer.print_scale_notes Scale.new("A Major", [1,3,5])
print "\n\n"
Printer.print_scale_tab Scale.new("A Major", [1,3,5])
