DetailController.prototype = new ViewController();
DetailController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.pageFunctions = [this.loadStockDetail];
	var backButton     = $('<button class="back-button"></button>');
	backButton.text('volver');
	this.view.addSubview(backButton);
	this.view.setClass('detail-container');
	this.backButton = backButton;
};
function DetailController (argument) {
	var self = this;
	this.detailId = null;
	this.viewDidLoad = function(){
		this.backButton.bind('click', function(){
			var index = $.cookie('lamejorcita.option')? $.cookie('lamejorcita.option'): 0;
			self.delegate.triggerOption(index);
		});
	};
	this.loadStockDetail = function(){

	};
	DetailController.prototype._init_.call(this);
};