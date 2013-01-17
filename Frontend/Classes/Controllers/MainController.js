Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/TableController.js');
function MainController () {
	var self = this;
	var tableController = null;
	var menuController = null
	var pagecount = 0;
	var objects = 15;

	this.page = 'Stock';

	this.viewDidLoad = function(){
		self['load'+this.page].call(self);
	};
	//Stocks
	this.loadStock = function(){
		if(!tableController)
			tableController = new TableController();
		if(!menuController)
			menuController = new MenuController();
		tableController.createStockTable();
		menuController.view.appendToView(this.view);
		tableController.view.appendToView(this.view);
		self.makeSearch({});
	};
	this.setStocks = function(){

	};
	this.makeSearch = function(aditional){
		var searchData  = $.extend({},{}, aditional);
		searchData.objects = objects;
		searchData.page = pagecount;
		self.delegate['search'+self.page+'s'].call(null,searchData);
	};
	MainController.prototype._init_.call(this);
};
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};