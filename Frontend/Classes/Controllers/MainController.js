Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/TableController.js');
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
	this.page = "Stock";
	this.currentData = [];
	
	this.viewDidLoad = function(){
		if(!menuController){
			menuController = new MenuController();
			menuController.delegate = self.delegate;
		};
		menuController.view.appendToView(this.view);
	};
	//Stocks
	this.loadStockPage = function(){
		tableController       = new TableController();
		tableController.delegate = self;
		var detailBtn         = $('<button class="detail-button"></button>');
		var deleteBtn         = $('<button class="delete-button"></button>');
		detailBtn.text('Detalle');
		deleteBtn.text('-');
		tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
										{'identifier': 'manager','value':'Responsable'},
										{'identifier': 'phone','value':'Teléfono'},
										{'identifier': 'delete','value':'', 'itemPrototype': detailBtn},
										{'identifier': 'detail','value':'', 'itemPrototype': deleteBtn}
										];

		tableController.view.appendToView(this.view);
		self.makeSearch({});
	};
	this.rowsNumber = function(){
		return this.currentData.length;
	};
	this.getCellData = function(identifier, index){
		var celldata = this.currentData[index];
		return celldata[identifier];
	};
	///
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
		self.currentData = stocks;
		tableController.loadTable();
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