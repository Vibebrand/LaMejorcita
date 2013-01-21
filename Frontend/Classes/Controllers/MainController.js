Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/TableController.js');
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};
function MainController () {
	var self = this;
	var tableController = null;
	var menuController = null
	var pagecount = 0;
	var objects = 15;
	this.currentData = [];
	
	this.viewDidLoad = function(){
		if(!menuController){
			menuController = new MenuController();
			menuController.delegate = self.delegate;
		};
		if(!tableController){
			tableController = new TableController();
			tableController.delegate     = self;
		}
		menuController.view.appendToView(this.view);
		tableController.view.appendToView(this.view);
	};
	//Stocks
	this.loadStockPage = function(){
		if(this.page != "Stocks"){
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.view.removeView();
			tableController.view.setClass('stock-table');
			this.page                    = "Stocks";
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'manager.name','value':'Responsable'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'delete','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'detail','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			detailBtn.bind('click', onClickDetail);
			deleteBtn.bind('click', onClickDelete);

			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.setStocks = function(stocks){
		self.currentData = stocks;
		tableController.loadTable(true);
	};
	//Sale points
	this.loadPointsPage = function() {
		if(self.page != "Points"){
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.view.removeView();
			tableController.view.setClass('salepoints-table');
			self.page = "Points";
			tableController.tableHeaders = [{'identifier': 'joinDate','value':'Fecha de ingreso'},
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'manager.name','value':'Representante'},
											{'identifier': 'fridge.temperature','value':'Temperatura'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'},
											{'identifier': 'delete','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'detail','value':'', 'itemPrototype': deleteBtn}];

			detailBtn.text('Detalle');
			deleteBtn.text('-');
			detailBtn.bind('click', onClickDetail);
			deleteBtn.bind('click', onClickDelete);
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.setSalePoints = function(salepoints){
		self.currentData = salepoints;
		tableController.loadTable(true);
	};
	//Sellers
	this.loadSellersPage = function() {
		if(self.page != "Sellers"){
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.cleanTable();
			tableController.view.removeView();
			tableController.view.setClass('sellers-table');
			self.page = "Sellers";
			tableController.tableHeaders = [{'identifier': 'stock.name','value':'Bodega'},
											{'identifier': 'name','value':'Nombre'},
											{'identifier': 'curp','value':'CURP'},
											{'identifier': 'device','value':'Dispositivo'},
											{'identifier': 'delete','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'detail','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			detailBtn.bind('click', onClickDetail);
			deleteBtn.bind('click', onClickDelete);
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.setSellers = function(sellers) {
		self.currentData = sellers;
		tableController.loadTable(true);
	};
	//Sales
	this.loadSalesPage = function() {
		if(self.page != "Sales"){
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.view.removeView();
			tableController.view.setClass('sales-table');
			self.page = "Sales";
			tableController.tableHeaders = [{'identifier': 'date','value':'Fecha'},
											{'identifier': 'time','value':'Hora'},
											{'identifier': 'salepoint.fridge.serial','value':'Punto de venta'},
											{'identifier': 'salepoint.fridge.status','value':'Estado'},
											{'identifier': 'products.amount','value':'Monto'},
											{'identifier': 'delete','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'detail','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			detailBtn.bind('click', onClickDetail);
			deleteBtn.bind('click', onClickDelete);
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.setSales = function(sales){
		self.currentData = sales;
		tableController.loadTable(true);
	};
	//table methods
	this.rowsNumber = function(){
		return this.currentData.length;
	};
	this.getCellData = function(index, identifier, row){
		var celldata = self.currentData[index];
		if(typeof row.data('id') === "undefined")row.data('id',celldata._id);
		return tableController.getStringData(identifier, celldata);
	};
	this.makeSearch = function(aditional){
		var searchData  = $.extend({},{}, aditional);
		searchData.objects = objects;
		searchData.page = pagecount;
		self.delegate['search'+self.page].call(null,searchData);
	};
	//Events
	function onClickDetail(){
		console.log('detail');
	};
 	function onClickDelete(){
 		console.log('delete');
 	};
	//Enable Disable
	this.enableEvents = function(){
		menuController.enableEvents();
	};
	this.disableEvents = function(){
		menuController.disableEvents();
	};
	MainController.prototype._init_.call(this);
};