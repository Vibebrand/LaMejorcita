Importer.importfile('Classes/Controllers/MenuController.js');
Importer.importfile('Classes/Controllers/SearchController.js');
Importer.importfile('Classes/Controllers/TableController.js');
Importer.importfile('Classes/Controllers/DetailController.js');
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};
function MainController () {
	var buttonsContainer;
	var self             = this;
	var pagecount        = 0;
	var objects          = 15;
	var tableController  = null;
	var detailController = null;
	var menuController   = null;
	var searchController = null;
	this.currentData = [];
	
	this.viewDidLoad = function(){
		if(!menuController){
			menuController          = new MenuController();
			menuController.delegate = self;
		};
		if(!tableController){
			tableController          = new TableController();
			tableController.delegate = self;
		};
		if(!searchController){
			searchController          = new SearchController();
			searchController.delegate = self;
		};
		if(!detailController){
			detailController = new DetailController();
			detailController.delegate = self;
		};
		menuController.view.appendToView(this.view);
		searchController.view.appendToView(this.view);
		tableController.view.appendToView(this.view);
	};
	this.updateMenu = function(index){
		menuController.changeOption(index);
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
			createVisualizationButtons();
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
		self.showTable();
		self.updateMenu(0);
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
		self.showTable();
		self.updateMenu(1);
	};
	this.setPOSData = function(posdata){
		self.currentData = posdata;
		tableController.loadTable(true);
	};
	//Sellers
	this.loadSellersPage = function() {
		if(self.page != "Sellers"){
			var detailBtn = $('<button class="detail-button"></button>');
			var deleteBtn = $('<button class="delete-button"></button>');
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
			self.updateMenu(2);
			self.makeSearch({});
		};
		self.showTable();
		self.updateMenu();
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
			createVisualizationButtons();
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
		self.showTable();
		self.updateMenu(3);
	};
	this.setSales = function(sales){
		self.currentData = sales;
		tableController.loadTable(true);
	};
	//Products
	this.loadProductsPage = function() {
		if(self.page != "Products"){
			var detailBtn = $('<button class="detail-button"></button>');
			var deleteBtn = $('<button class="delete-button"></button>');
			tableController.view.removeView();
			tableController.view.setClass('products-table');
			self.page = "Products";
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'salePrice','value':'Precio'},
											{'identifier': 'count','value':'Cantidad'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			detailBtn.text('Detalle');
			deleteBtn.text('-');
			removeVisualizationButtons();
			tableController.cleanTable();
			tableController.view.appendToView(this.view);
			self.makeSearch({});
		};
		self.showTable();
		self.updateMenu(4);
	};
	this.setProducts = function(products){
		self.currentData = products;
		tableController.loadTable(true);
	};
	//Detail
	this.loadDetailPage = function(detailId){
		var table      = tableController.view.container();
		var detailView = detailController.view.container();
		detailController.currentId = detailId;
		table.fadeOut('fast', function(){
			detailView.hide('fast');
			detailController.view.appendToView(self.view);
			detailView.fadeIn('fast');
		});
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

		if(identifier.indexOf("fridge.status") != -1)
			stringValue =  getFridgeStatus(stringValue);

		if(identifier.indexOf("salePrice") != -1 || identifier.indexOf("amount") != -1 )
			stringValue = getPrice(stringValue);

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
	this.showTable = function(){
		tableController.view.container().show();
	};
	//creation
	function createVisualizationButtons(){
		if(typeof buttonsContainer == "undefined" || typeof buttonsContainer.find == "undefined"){
			buttonsContainer  = $('<div class="buttons-container"></div>');
			var mapBtn = $('<button class="map-button"></button>');
			var listBtn = $('<button class="list-button"></button>');
			buttonsContainer.append(mapBtn);
			buttonsContainer.append(listBtn);
			mapBtn.text('Mapa');
			listBtn.text('Lista');
		};
		self.view.addSubview(buttonsContainer);
	};
	function removeVisualizationButtons(){
		if(typeof buttonsContainer != "undefined"  && typeof buttonsContainer.remove != "undefined")
			buttonsContainer.remove();
	};
	//Data obtaining
	function getAddressString(address){
		var addressText = address.street+" #"+address.extNum;
		if(address.intNum != "")
			addressText+= " int. "+address.intNum;
		return addressText;
	};
	function getFridgeStatus(fridgeStatus){
		if(fridgeStatus)
			return "Bien";
		else
			return "Mal";
	};
	function getPrice(stringValue){
		return "$ "+Number(stringValue).toFixed(2);
	}; 
	//Events
	function onClickDetail(){
		
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
	//delegate
	this.changePage = function(hashpage){
		self.delegate.changePage(hashpage);
	};
	MainController.prototype._init_.call(this);
};