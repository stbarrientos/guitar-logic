require "sinatra"
require "sinatra/reloader"
require_relative "lib/string.rb"


get "/" do
  @fretboard = ["E","A","D","G","B","E"].map { |s| String.new(s).show_all_frets(starting: 1,ending: 21) }
  erb :fretboard
end
