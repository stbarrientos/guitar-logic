var Validation = function(){

};

Validation.prototype = {
  it: function(description, a,b){
    if(this.expect(a,b) === true){
      console.log(description + " -> PASSED");
      return true;
    } else {
      console.log(description + " -> FAILED");
      return false;
    };
  },

  expect: function(a,b){
    return a === b;
  }
};