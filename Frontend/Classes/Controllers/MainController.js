Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/StockController.js');
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};
function MainController () {
	var self = this;
	var tableController = new ViewController();
	var menuController = null
	var pagecount = 0;
	var objects = 15;
	
	this.viewDidLoad = function(){
		if(!menuController){
			menuController = new MenuController();
			menuController.delegate = self.delegate;
		};
		menuController.view.appendToView(this.view);
	};
	//Stocks
	this.loadStockPage = function(){
		if(!(tableController instanceof StockController)){
			var stockController = new StockController();
			tableController.view.removeView();
			stockController.view.appendToView(this.view);
			tableController = stockController;
			this.page = "Stock";
			this.makeSearch({});
		};
	};
	this.loadPointsPage = function() {
	
		tableController.view.removeView();
		tableController = new ViewController();
		tableController.view.appendToView(this.view);
		
	};
	this.loadSellersPage = function() {
		tableController.view.removeView();
		tableController = new ViewController();
		tableController.view.appendToView(this.view);
	};
	this.loadSalesPage = function() {
		tableController.view.removeView();
		tableController = new ViewController();
		tableController.view.appendToView(this.view);
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