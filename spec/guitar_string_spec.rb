require "guitar_string"

RSpec.describe GuitarString, "#open_note" do

  context "every string starts with an open note" do

    it "E string open note is E" do
      e = String.new("E")
      expect(e.open_note.name).to eq("E")
    end

    it "A string open note is A" do
      a = String.new("A")
      expect(a.open_note.name).to eq("A")
    end

  end

end

RSpec.describe String, "#fret" do

  context "return note at fret" do

    it "note on 5th fret of E string is A" do
      e = String.new("E")
      expect(e.fret(5).name).to eq("A")
    end

    it "note on 6th fret of E string is A#" do
      e = String.new("E")
      expect(e.fret(6).name).to eq("A#")
    end

    it "note on 5th fret of A string is D" do
      e = String.new("A")
      expect(e.fret(5).name).to eq("D")
    end

    it "note on 6th fret of A string is D#" do
      a = String.new("A")
      expect(a.fret(6).name).to eq("D#")
    end

  end

end

RSpec.describe String, "#show_all_frets" do

  context "return array of all notes including open note" do

    it "returns [F,F#,G,G#,A,A#,B,C,D,D#,E] when asked for first 12 frets of E string" do
      e = String.new("E")
      expect(e.show_all_frets).to eq(["F","F#","G","G#","A","A#","B","C","C#","D","D#","E"])
    end

  end

end

RSpec.describe String, "#find_note" do

  context "return frets of note on string" do

    it "E find C# returns 9 and 21" do
      e = String.new("E")
      expect(e.find_note("C#")).to eq([9,21])
    end

    it "A find F returns 8 and 20" do
      a = String.new("A")
      expect(a.find_note("F")).to eq([8,20])
    end

  end

end

