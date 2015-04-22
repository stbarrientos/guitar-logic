require "chord"

RSpec.describe Chord, "#list_major_notes" do

  context "show major notes for chord" do

    it "G Major is G, B, D" do
      g = Chord.new("G")
      expect(g.list_major_notes).to eq(["G", "B", "D"])
    end

    it "A Major is A, C#, E" do
      a = Chord.new("A")
      expect(a.list_major_notes).to eq(["A", "C#", "E"])
    end

    it "C# Major is C#, G#, F" do
      c_sharp = Chord.new("C#")
      expect(c_sharp.list_major_notes).to eq(["C#", "F", "G#"])
    end

  end

end


RSpec.describe Chord, "#list_minor_notes" do

  context "show minor notes for chord" do

    it "G Minor is G, A#, D" do
      g = Chord.new("G")
      expect(g.list_minor_notes).to eq(["G", "A#", "D"])
    end

    it "A Minor is A, C, E" do
      a = Chord.new("A")
      expect(a.list_minor_notes).to eq(["A","C","E"])
    end

    it "C# Minor is C#, G#, E" do
      c_sharp = Chord.new("C#")
      expect(c_sharp.list_minor_notes).to eq(["C#", "E", "G#"])
    end

  end

end
