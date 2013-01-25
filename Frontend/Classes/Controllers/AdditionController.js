AdditionController.prototype = new ViewController();
AdditionController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
};
function  AdditionController(){
	var self = this;
	AdditionController.prototype._init_.call(this);
};