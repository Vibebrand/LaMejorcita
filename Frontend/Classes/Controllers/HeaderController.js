function HeaderController(){
	var self      = this;
	this.delegate = null;
	HeaderController.prototype._init_ .call(this);
};
HeaderController.prototype = new ViewController();
HeaderController.prototype._init_ = function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('header-container');
};