# Class to house string/scale/chord data
class Theory

  def self.strings
    ["e", "B", "G", "D", "A", "E"]
  end

  def self.intervals
    {"a" => 1,
     "b" => 0,
     "c" => 1,
     "d" => 1,
     "e" => 0,
     "f" => 1,
     "g" => 1 }
  end

  def self.notes
    ["a", "b", "c", "d", "e", "f", "g"] # All seven notes
  end

  def self.major_intervals
    [1, 1, 0, 1, 1, 1, 0] # WWHWWWH
  end

  def self.minor_intervals
    [1, 0, 1, 1, 0, 1, 1] # WHWWHWW
  end

end

# Class for showing scale/chord data
class Neck < Theory

  # Draw blank neck
  def self.draw_neck
    puts "      . . . .  :  . . . ."
    self.strings.each do |string|
      puts "\n\ninitial index: #{self.notes.index(string.downcase) + 1}"
      puts "tertiary destination: #{self.notes.length - 1 - self.notes.index(string.downcase)}"
      
      # Keep track of how many frets have been printed, we want to show a 21 fret fretboard
      frets_printed = 0

      # Print the string name first
      print "\n#{string} |"
        
      # Start the line with a dash if there is no note there
      if  self.intervals[string.downcase] > 0 
        print "-"
        frets_printed += 1
      end

      # Keep printing until there have been 21 frets printed
      while frets_printed < 21

        # Account for G (last note in array)

        unless self.notes.index(string.downcase) == self.notes.length - 1
        
          # Go down the string fret by fret
          for i in (self.notes.index(string.downcase) + 1)..(self.notes.length - 1)
            
            # Print the note name
            print self.notes[i] 

            # Increase frets_printed
            frets_printed += 1

            # Print dashes where sharps and flats are located
            self.intervals[self.notes[i]].times do
              print "-"

              # Increment the frets_printed
              frets_printed += 1
            end 
          end

          # Repeate notes as necessary
          for i in 0..(self.notes.index(string.downcase))
            print self.notes[i]
            frets_printed += 1
            self.intervals[self.notes[i]].times do
              print "-"
              frets_printed += 1
            end
          end
        else
          for i in 0..(self.notes.length - 1)
            print self.notes[i]
            frets_printed += 1
            self.intervals[self.notes[1]].times do
              print "-"
              frets_printed += 1
            end
          end
        end
      end
    end

    # Leave space for the prompt
    print "\n"

  end

end

# Class for showing and writing tabs
class Tab < Theory

  # Draw new tab
  def new_tab
    self.strings.each { |string| puts "#{string} |-" }
  end

end

# puts Neck.strings
Neck.draw_neck
