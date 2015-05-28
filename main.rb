require "sinatra"
require "sinatra/reloader"
require "json"
require_relative "lib/scale.rb"
require_relative "lib/chord.rb"
require_relative "lib/custom_methods.rb"


get "/" do
  @fretboard = ["E","A","D","G","B","E"].map { |s| GuitarString.new(s).show_all_frets(starting: 0,ending: 21) }
  erb :fretboard
end

post "/diagnose" do
  puts "\n\n\n\n#{params}\n\n\n\n"
  chord = Chord.diagnose(params["notes"])
  @notes = chord.send("list_#{chord.tone.downcase}_notes")
  puts "\n\n\nChord: #{chord.inspect}\n\n\n"
  {name: chord.full_name, notes: @notes}.to_json
end
