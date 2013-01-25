AdditionController.prototype = new ViewController();
AdditionController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('addition-container');
};
function  AdditionController(){
	var self = this;
	self.page = "Stock"
	this.viewDidLoad = function(){
		
	};
	function createBatchView(){

	};
	AdditionController.prototype._init_.call(this);
};