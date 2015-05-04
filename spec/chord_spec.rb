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

    it "C# Major is C#, F, G#" do
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

RSpec.describe Chord, "#diagnose" do

  describe "find chord in notes" do

    it "gets G Major from G,B,D" do
      array = ["G","B","D"]
      expect(Chord.diagnose(array).full_name).to eq("G Major")
    end

    it "gets G Minor from G,A#,D" do
      array = ["G", "A#","D"]
      expect(Chord.diagnose(array).full_name).to eq("G Minor")
    end

    it "gets A Major from A,C#,E" do
      array = ["A","C#","E"]
      expect(Chord.diagnose(array).full_name).to eq("A Major")
    end

    it "gets A Minor from A,C,E" do
      array = ["A","C","E"]
      expect(Chord.diagnose(array).full_name).to eq("A Minor")
    end

    it "gets C# Major from C#,G#,F" do
      array = ["C#","G#","F"]
      expect(Chord.diagnose(array).full_name).to eq("C# Major")
    end

    it "gets C# Minor from C#,E,G#" do
      array = ["C#","E","G#"]
      expect(Chord.diagnose(array).full_name).to eq("C# Minor")
    end

  end

end
