Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/StockController.js');
function MainController () {
	var self = this;
	var tableController = new ViewController();
	var menuController = null
	var pagecount = 0;
	var objects = 15;

	//Stocks
	this.loadStockPage = function(){
		if(!menuController){
			menuController = new MenuController();
			menuController.delegate = self.delegate;
		};
		menuController.view.appendToView(this.view);

		if(!(tableController instanceof StockController)){
			var stockController = new StockController();
			tableController.view.removeView();
			stockController.view.appendToView(this.view);
			tableController = stockController;
			this.page = "Stock";
			this.makeSearch({});
		};
	};
	this.setStocks = function(stocks){
		for (var i = 0; i < stocks.length; i++)
			tableController.addStockRow(stocks[i]);
		tableController.enableEvents();
	};
	this.makeSearch = function(aditional){
		var searchData  = $.extend({},{}, aditional);
		searchData.objects = objects;
		searchData.page = pagecount;
		self.delegate['search'+self.page+'s'].call(null,searchData);
	};
	//Load Pages
	this.loadPoint = function(){
		console.log('loadPoint');
	};
	this.loadSeller = function(){
		console.log('loadSelle');
	};
	this.loadSale = function(){
		console.log('loadSale ');
	};
	//Enable Disable
	this.enableEvents = function(){
		menuController.enableEvents();
		tableController.enableEvents();
	};
	this.disableEvents = function(){
		menuController.disableEvents();
		tableController.disableEvents();
	};
	MainController.prototype._init_.call(this);
};
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};