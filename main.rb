require "sinatra"
require "sinatra/reloader"
require_relative "lib/string.rb"

get "/strings/:name" do
  @string_notes = String.new(params[:name]).show_all_frets
  @string_name = params[:name]
  erb :string
end
