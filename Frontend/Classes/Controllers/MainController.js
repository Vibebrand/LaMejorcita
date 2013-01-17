Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/TableController.js');
function MainController () {
	var self = this;
	var tableController = null;
	var menuController = null
	this.page = 'Stock';
	this.viewDidLoad = function(){
		self['load'+this.page].call(self);
	};
	this.loadStock = function(){
		if(!tableController)
			tableController = new TableController();
		if(!menuController)
			menuController = new MenuController();
		tableController.createStockTable();
		menuController.view.appendToView(this.view);
		tableController.view.appendToView(this.view);
	};
	MainController.prototype._init_.call(this);
};
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};