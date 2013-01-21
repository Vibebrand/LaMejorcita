Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/SearchController.js');
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
	var searchController = null;
	var buttonsContainer;
	var pagecount = 0;
	var objects = 15;
	this.currentData = [];
	
	this.viewDidLoad = function(){
		if(!menuController){
			menuController          = new MenuController();
			menuController.delegate = self.delegate;
		};
		if(!tableController){
			tableController          = new TableController();
			tableController.delegate = self;
		}
		if(!searchController){
			searchController          = new SearchController();
			searchController.delegate = self;
		}
		menuController.view.appendToView(this.view);
		searchController.view.appendToView(this.view);
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
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'address.district','value':'Colonia'},
											{'identifier': 'manager.name','value':'Responsable'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			createVisualizationButtons
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
	this.loadPOSPage = function() {
		if(self.page != "POS"){
			var detailBtn                = $('<button class="detail-button"></button>');
			var deleteBtn                = $('<button class="delete-button"></button>');
			tableController.view.removeView();
			tableController.view.setClass('pos-table');
			self.page = "POS";
			tableController.tableHeaders = [{'identifier': 'fridge.serial','value':'Serial'},
											{'identifier': 'fridge.status','value':'Estado'},
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'address.district','value':'Colonia'},
											{'identifier': 'manager.name','value':'Representante'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];

			detailBtn.text('Detalle');
			deleteBtn.text('-');
			createVisualizationButtons();
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
	};
	this.setPOSData = function(posdata){
		self.currentData = posdata;
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
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'},
											{'identifier': 'stock.name','value':'Bodega'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			removeVisualizationButtons();
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
			tableController.view.removeView();
			tableController.view.setClass('sales-table');
			self.page = "Sales";
			tableController.tableHeaders = [{'identifier': 'date','value':'Fecha'},
											{'identifier': 'time','value':'Hora'},
											{'identifier': 'salepoint.fridge.serial','value':'Punto de venta'},
											{'identifier': 'salepoint.fridge.status','value':'Estado'},
											{'identifier': 'products.products','value':'Cantidad'},
											{'identifier': 'products.amount','value':'Monto'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn}];
			detailBtn.text('Detalle');
			createVisualizationButtons
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
		var stringValue = tableController.getStringData(identifier, celldata);
		if(typeof row.data('id') === "undefined")row.data('id',celldata._id);

		if(identifier === "address")
			stringValue =  getAddressString(celldata[identifier]);

		if(identifier === "products.products")
			stringValue =  celldata.products.products.length;

		if(identifier === "salepoint.fridge.status" || identifier === "fridge.status"){
			var fridgeStatus = stringValue;
			if(fridgeStatus)
				stringValue = "Bien";
			else
				stringValue = "Mal";
		};
		return stringValue;
	};
	this.tableLoaded = function() {
		self.delegate.enableEvents();
	};
	this.makeSearch = function(aditional){
		var searchData  = $.extend({},{}, aditional);
		searchData.objects = objects;
		searchData.page = pagecount;
		self.delegate['search'+self.page].call(null,searchData);
	};
	function getAddressString(address){
		var addressText = address.street+" #"+address.extNum;
		if(address.intNum != "")
			addressText+= " int. "+address.intNum;
		return addressText;
	};
	function createVisualizationButtons(){
		if(typeof buttonsContainer == "undefined" || typeof buttonsContainer.find != "undefined"){
			buttonsContainer  = $('<div class="buttons-container"></div>');
			var mapBtn = $('<button class="map-button"></button>');
			var listBtn = $('<button class="list-button"></button>');
			buttonsContainer.append(mapBtn);
			buttonsContainer.append(listBtn);
			self.view.addSubview(buttonsContainer);
			mapBtn.text('Mapa');
			listBtn.text('Lista');
		};
	};
	function removeVisualizationButtons(){
		if(typeof buttonsContainer != "undefined"  && typeof buttonsContainer.remove != "undefined")
			buttonsContainer.remove();
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
		var detailBtn = tableController.view.container().find('.detail-button');
		var deleteBtn = tableController.view.container().find('.delete-button');
		detailBtn.unbind('click');
		deleteBtn.unbind('click');
		detailBtn.bind('click',onClickDetail);
		deleteBtn.bind('click',onClickDelete);
		menuController.enableEvents();
		searchController.enableEvents();
	};
	this.disableEvents = function(){
		menuController.disableEvents();
		searchController.disableEvents();
		tableController.view.container().find('button').unbind('click');
	};
	MainController.prototype._init_.call(this);
};