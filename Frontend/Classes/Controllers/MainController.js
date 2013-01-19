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
			
			tableController.view.removeView();
			tableController.view.setClass('stock-table');
			this.page                    = "Stocks";
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'manager','value':'Responsable'},
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
			tableController.view.removeView();
			tableController.view.setClass('salepoints-table');
			self.page = "Points";
			tableController.tableHeaders = [{'identifier': 'joinDate','value':'Fecha de ingreso'},
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'manager','value':'Representante'},
											{'identifier': 'temperature','value':'Temperatura'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'}];
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	//Sellers
	this.loadSellersPage = function() {
		if(self.page != "Sellers"){
			tableController.cleanTable();
			tableController.view.removeView();
			tableController.view.setClass('sellers-table');
			self.page = "Sellers";
			tableController.tableHeaders = [{'identifier': 'curp','value':'CURP'},
											{'identifier': 'name','value':'Nombre'},
											{'identifier': 'device','value':'Dispositivo'},
											{'identifier': 'stock','value':'Bodega'}];
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.loadSalesPage = function() {
		if(self.page != "Sales"){
			tableController.view.removeView();
			tableController.view.setClass('sales-table');
			self.page = "Sales";
			tableController.tableHeaders = [{'identifier': 'date','value':'Fecha'},
											{'identifier': 'salepoint','value':'Punto de venta'},
											{'identifier': 'status','value':'Estado'},
											{'identifier': 'amount','value':'Monto'}];
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
		
		
	};
	this.rowsNumber = function(){
		return this.currentData.length;
	};
	this.getCellData = function(index, identifier, row){
		var celldata = this.currentData[index];
		if(typeof row.data('id') === "undefined")row.data('id',celldata._id);
		return celldata[identifier];
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