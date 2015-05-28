class Array

  def reverse_each
    (self.length-1).downto(0) { |x| yield self[x] }
  end

end