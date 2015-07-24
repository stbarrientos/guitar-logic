class String

  def print_in_color(color)
    "\e[#{color}m#{self}\e[0m"
  end

  def red
    print_in_color(31)
  end

  def green
    print_in_color(32)
  end

  def yellow
    print_in_color(33)
  end

  def pink
    print_in_color(35)
  end

end
