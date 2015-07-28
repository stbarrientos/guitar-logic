function Modal(config){
  this.header = config["header"];
  this.footer = config["footer"];
  this.modalBody = config["body"];
  this.element = config["element"];
  this.setHeader();
  this.setBody();
  this.setFooter();
};

Modal.prototype = {
  show: function(){
    Modal.showBlocker();
    this.element.classList.remove("hidden");
    return this;
  },

  hide: function(){
    this.element.classList.add("hidden");
    Modal.hideBlocker();
    return this;
  },

  setHeader: function(){
    this.element.getElementsByClassName("modal-header")[0].innerHTML = this.header;
    return this;
  },

  setBody: function(content){
    this.element.getElementsByClassName("modal-body")[0].innerHTML = this.modalBody;
    return this;
  },

  setFooter: function(content){
    this.element.getElementsByClassName("modal-footer")[0].innerHTML = this.footer;
    return this;
  }

};

Modal.showBlocker = function(){
  document.getElementById("background-blocker").classList.remove("hidden");
};

Modal.hideBlocker = function(){
  document.getElementById("background-blocker").classList.add("hidden");
};


