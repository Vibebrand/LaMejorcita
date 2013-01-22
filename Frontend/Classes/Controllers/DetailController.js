DetailController.prototype = new ViewController();
DetailController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.pageFunctions = [this.loadStockDetail];
	var backButton     = $('<button class="back-button"></button>');
	backButton.text('volver');
	this.view.addSubview(backButton);
	this.view.setClass('detail-container');
};
function DetailController (argument) {
	this.detailId = null;
	this.viewDidLoad = function(){
		
	};
	this.loadStockDetail = function(){

	};
	DetailController.prototype._init_.call(this);
};