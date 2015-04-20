require "note"

RSpec.describe Note, "#next_note" do

  context "going sequentially" do

    it "next note after A is B" do
      a = Note.new("A")
      expect(a.next_note.name).to eq("B")
    end

    it "next note after A# is B" do
      a_sharp = Note.new("A#")
      expect(a_sharp.next_note.name).to eq("B")
    end

    it "next note after B is C" do
      b  = Note.new("B")
      expect(b.next_note.name).to eq("C")
    end

    it "next note after C is D" do
      c = Note.new("C")
      expect(c.next_note.name).to eq("D")
    end

    it "next note after C# is D" do
      c_sharp = Note.new("C#")
      expect(c_sharp.next_note.name).to eq("D")
    end

    it "next note after D is E" do
      d = Note.new("D")
      expect(d.next_note.name).to eq("E")
    end

    it "next note after D# is E" do
      d_sharp = Note.new("D#")
      expect(d_sharp.next_note.name).to eq("E")
    end

    it "next note after E is F" do
      e = Note.new("E")
      expect(e.next_note.name).to eq("F")
    end

    it "next note after F is G" do
      f = Note.new("F")
      expect(f.next_note.name).to eq("G")
    end

    it "next note after F# is G" do
      f_sharp = Note.new("F#")
      expect(f_sharp.next_note.name).to eq("G")
    end

    it "next note after G is A" do
      g = Note.new("G")
      expect(g.next_note.name).to eq("A")
    end

    it "next note after G# is A" do
      g_sharp = Note.new("G#")
      expect(g_sharp.next_note.name).to eq("A")
    end

  end

end

RSpec.describe Note, "#next_whole_step" do

   context "could be flat or sharp" do

      it "next whole step after A is B" do
        a = Note.new("A")
        expect(a.next_whole_step.name).to eq("B")
      end

      it "next whole step after A# is B#" do
        a_sharp = Note.new("A#")
        expect(a_sharp.next_whole_step.name).to eq("B#")
      end

      it "next whole step after B is C#" do
        b = Note.new("B")
        expect(b.next_whole_step.name).to eq("C#")
      end

      it "next whole step after C is D" do
        c = Note.new("C")
        expect(c.next_whole_step.name).to eq("D")
      end

      it "next whole step after C# is D#" do
        c_sharp = Note.new("C#")
        expect(c_sharp.newxt_whole_step.name).to eq("D#")
      end

      it "next_whole step after D is E" do
        d = Note.new("D")
        expect(d.next_whole_step.name).to eq("E")
      end

      it "next whole step after D# is F" do
        d_sharp = Note.new("D#")
        expect(d_sharp.next_whole_step.name).to eq("F")
      end

      it "next whole step after E is F#" do
        e = Note.new("E")
        expect(e.next_whole_step.name).to eq("F#")
      end

      it "next whole step after F is G" do
        f = Note.new("F")
        expect(f.next_whole_step.name).to eq("G")
      end

      it "next whole step after F# is G#" do
        f_sharp = Note.new("F#")
        expect(f_sharp.next_whole_step.name).to eq("G#")
      end

      it "next whole step after G is A" do
        g = Note.new("G")
        expect(g.next_whole_step.name).to eq("A")
      end

      it "next whole step after G# is A#" do
        g_sharp = Note.new("G#")
        expect(g_sharp.next_whole_step.name).to eq("A#")
      end
   end
end

RSpec.describe Note, "#prev_whole_step" do

end

RSpec.describe Note, "#next_half_step" do

end

RSpec.describe Note, "#prev_half_step" do

end
