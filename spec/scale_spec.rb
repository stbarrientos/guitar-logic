require "scale"
require "chord"

RSpec.describe Scale, "#print_notes" do
  
  context "print all frets on 6th string for 1,3,4,5,7 positions of A Minor-Pentatonic" do

    it "prints 0,3,5,8,10,12,15,17,21" do
      scale = Scale.new("A Minor-Pentatonic",[1,3,4,5,7])
      expect(scale.print_notes(frets_only: true)[0]).to eq([0,3,5,8,10,12,15,17,20])
    end

  end

end