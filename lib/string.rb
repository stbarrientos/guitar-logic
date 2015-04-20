class String

  def initialize(name, next_string, prev_string, next_interval, prev_interval)
    @name = name
    @next_string = next_string
    @prev_string = prev_string
    @next_interval = next_interval
    @prev_interval = prev_interval
  end

  def first_note
    Note.new(self.name, self.prev_interval, self.next_interval)
  end

end
