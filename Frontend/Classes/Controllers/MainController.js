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
	var searchController = null;
	var pages = ["stock","pos","seller","sale","product"];
	this.currentData = [];
	currentDataKeys = [];
	this.viewDidLoad = function(){
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
		searchController.view.appendToView(self.view);
		tableController.view.appendToView(this.view);
	};
	this.updateMenu = function(index){
		self.delegate.updateMenu(index);
	};
	//Stocks
	this.loadStockPage = function(){
		if(this.page != "Stock"){
			this.page     = "Stock";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'address.district','value':'Colonia'},
											{'identifier': 'manager.name','value':'Responsable'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			tableController.view.setClass('stock-table');
			loadTableView();
		};
		removeBatchView();
		searchController.showSearch();
		searchController.showAddButton();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setStocks = function(stocks){
		self.currentData = stocks;
		tableController.loadTable(true);
	};
	//Sale points
	this.loadPOSPage = function() {
		if(self.page != "POS"){
			self.page = "POS";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [{'identifier': 'fridge.serial','value':'Serial'},
											{'identifier': 'fridge.status','value':'Estado'},
											{'identifier': 'address','value':'Dirección'},
											{'identifier': 'address.district','value':'Colonia'},
											{'identifier': 'representative.name','value':'Representante'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			tableController.view.setClass('pos-table');
			loadTableView();
		};
		removeBatchView();
		searchController.showSearch();
		searchController.showAddButton();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setPOSData = function(posdata){
		self.currentData = posdata;
		tableController.loadTable(true);
	};
	//Sellers
	this.loadSellersPage = function() {
		if(self.page != "Seller"){
			self.page = "Seller";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'phone','value':'Teléfono'},
											{'identifier': 'email','value':'Correo electrónico'},
											{'identifier': 'stock.name','value':'Bodega'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			tableController.view.setClass('sellers-table');
			loadTableView();
		};
		removeBatchView();
		searchController.showSearch();
		searchController.showAddButton();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setSellers = function(sellers) {
		self.currentData = sellers;
		tableController.loadTable(true);
	};
	//Sales
	this.loadSalesPage = function() {
		if(self.page != "Sale"){
			self.page = "Sale";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			tableController.view.setClass('sales-table');
			tableController.tableHeaders = [{'identifier': 'date','value':'Fecha'},
											{'identifier': 'time','value':'Hora'},
											{'identifier': 'salepoint.fridge.serial','value':'Punto de venta'},
											{'identifier': 'salepoint.fridge.status','value':'Estado'},
											{'identifier': 'products.count','value':'Cantidad'},
											{'identifier': 'products.amount','value':'Monto'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn}];
			tableController.view.setClass('sale-table');
			loadTableView();
		};
		removeBatchView();
		searchController.showSearch();
		searchController.hideAddButton();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setSales = function(sales){
		self.currentData = sales;
		tableController.loadTable(true);
	};
	//Products
	this.loadProductsPage = function() {
		if(self.page != "Product"){
			self.page = "Product";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [{'identifier': 'name','value':'Nombre'},
											{'identifier': 'salePrice','value':'Precio'},
											{'identifier': 'count','value':'Cantidad'},
											{'identifier': 'detail','value':'', 'itemPrototype': detailBtn},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			tableController.view.setClass('products-table');
			loadTableView();
		};
		removeBatchView();
		searchController.hideSearch();
		searchController.showAddButton();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setProducts = function(products){
		self.currentData = products;
		tableController.loadTable(true);
	};
	//Batches
	this.loadBatchesPage = function(){
		if(self.page != "Batch"){
			self.page = "Batch";
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [{'identifier': 'batch.expiration','value':'Lote'},
											{'identifier': 'batch.count','value':'Cantidad'},
											{'identifier': 'delete','value':'', 'itemPrototype': deleteBtn}];
			tableController.view.setClass('batches-table');
			self.createDetailMenu(true);
			createProductDetail();
			loadTableView();
			self.getDetail("Product", self.additionalData);
		};
		prepareTableView();
		searchController.showSearch();
		searchController.showAddButton();
		removeVisualizationButtons();
		
	};
	function getObjectKeys(objects){
		for (var object in objects)
			currentDataKeys.push(object);
	};
	function createProductDetail(){
		var element = self.view.container();
		var infoContainer = $('<div class="productInfo-container"></div>');
		element.append(infoContainer);
		detailController.createField({
			field: 'name',
			title:{classname:'title', value: 'Nombre'},
			container: infoContainer
		});
		detailController.createField({
			field: 'salePrice',
			title:{classname:'title', value: 'Precio de venta'},
			container: infoContainer
		});
		detailController.createField({
			field: 'registationDate',
			title:{classname:'title', value: 'Fecha registro'},
			container: infoContainer
		});
		detailController.createField({
			field: 'count',
			title:{classname:'title', value: 'Total'},
			container: infoContainer
		});
	};
	function createBatchItem(count, expiration){
	};
	function removeBatchView(){
		self.view.container().find('.productInfo-container').remove();
	};
	this.setProductDetail = function(product){
		var container = self.view.container().find('.productInfo-container');
		var pname = container.find('.name .value');
		var salePrice = container.find('.salePrice .value');
		var registationDate = container.find('.registationDate .value');
		var total = container.find('.count .value');
		pname.text(product.name);
		salePrice.text('$ '+product.salePrice.toFixed(2));
		registationDate.text(product.registationDate);
		total.text(product.count);
	};
	this.setBatches = function(batches){
		getObjectKeys(batches);
		self.currentData = batches;
		tableController.loadTable(true);
	};
	//Detail
	this.loadDetailPage = function(data){
		detailController.currentId = data.id;
		detailController.page = data.kind.toCapitalize();
		detailController.pagenum = pages.indexOf(data.kind);

		searchController.hideSearch();
		searchController.hideAddButton();
		removeVisualizationButtons();
		detailController.createDetailMenu();

		detailController.view.removeView();
		tableController.view.removeView();
		detailController.view.appendToView(self.view);
	};
	this.getDetail = function(page, id){
		var getCall = self.delegate["get"+page+"Detail"];
		if(typeof getCall == "function") getCall.call(self.delegate, id);
	};
	self.setDetail = function(data){
		detailController.setDetail(data);
	};
	//table methods
	this.rowsNumber = function(){
		if(self.currentData.constructor === Array)
			return self.currentData.length;
		if(self.currentData.constructor === Object)
			return Object.keys(self.currentData).length;
	};
	this.getCellData = function(index, identifier, row){
		var celldata = self.currentData[index];
		var stringValue = tableController.getStringData(identifier, celldata);

		if(typeof row.data('id') === "undefined" && identifier.indexOf('batch') == -1)
			row.data('id',celldata._id);
		else
			row.data('id',currentDataKeys[index]);

		if(identifier == "batch.expiration")
			stringValue = self.currentData[currentDataKeys[index]];
		if(identifier == "batch.count")
			stringValue = currentDataKeys[index];

		if(identifier === "address")
			stringValue =  self.getAddressString(celldata[identifier]);
		if(identifier.indexOf("fridge.status") != -1)
			stringValue =  getFridgeStatus(stringValue);
		if(identifier.indexOf("salePrice") != -1 || identifier.indexOf("amount") != -1 )
			stringValue = getPrice(stringValue);

		return stringValue;
	};
	this.tableLoaded = function() {
		self.delegate.enableEvents();
	};
	this.makeSearch = function(additional){
		var searchData  = $.extend({},{}, additional);
		searchData.objects = objects;
		searchData.page = pagecount;
		if(typeof self.additionalData != "undefined" && typeof self.additionalData.id != "undefined")
			searchData[self.additionalData.kind+'Id'] = self.additionalData.id;
		if(self.page != "Batch")
			self.delegate['search'+self.page+'s'].call(self.delegate, searchData);
		else
			self.delegate['search'+self.page+'es'].call(self.delegate, searchData);
	};
	function loadTableView(){
		tableController.cleanTable();
		tableController.view.removeView();
		self.makeSearch({});
		currentDataKeys = [];
	};
	function prepareTableView(){
		if(self.page != "Batch")
			self.removeDetailMenu();
		detailController.view.removeView();
		tableController.view.appendToView(self.view);
		if(self.page != "Batch")
			self.updateMenu(pages.indexOf(self.page.toLowerCase()));
		else
			self.updateMenu(pages.length-1);
	};
	//creation
	function createVisualizationButtons(){
		if(typeof buttonsContainer == "undefined" || typeof buttonsContainer.find == "undefined"){
			buttonsContainer  = $('<div class="visualButtons-container"></div>');
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
	this.createDetailMenu = function(edit){
		self.removeDetailMenu();
		var buttonCotnainer = $('<div class="detailButton-container"></div>');
		var backBtn         = $('<button class="back-button"></button>');
		self.view.addSubview(buttonCotnainer);
		buttonCotnainer.append(backBtn);
		backBtn.text('Volver');
		if(edit === true){
			var editBtn = $('<button class="edit-button"></button>');
			buttonCotnainer.append(editBtn);
			editBtn.text('Editar');
		};
	};
	this.removeDetailMenu = function(){
		var buttonCotnainer = self.view.container().find('.detailButton-container');
		buttonCotnainer.remove();
	};
	//Data obtaining
	this.getAddressString = function(address){
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
		detailId = $(this).parents('tr').data('id');
		self.delegate.disableEvents();
		if(self.page == "Product")
			self.changePage('/Batches/'+detailId);
		else
			self.changePage('/Detail/'+self.page.toLowerCase()+'/'+detailId);
	};
 	function onClickDelete(){
 		console.log('delete');
 	};
 	function onClickBack(){
		var prevPage = $.cookie('lamejorcita.prevPage')?  $.cookie('lamejorcita.prevPage'): '';
		var index = self.page != "Batch"? detailController.pagenum: pages.length-1;
		if($.trim(prevPage) != "" && prevPage != $.cookie('lamejorcita.page') && prevPage.indexOf('Detail') == -1)
			self.changePage(prevPage);
		else
			self.triggerOption(index);
	};
	//Enable Disable
	this.enableEvents = function(){
		var detailBtn = tableController.view.container().find('.detail-button');
		var deleteBtn = tableController.view.container().find('.delete-button');
		var backBtn = self.view.container().find('.detailButton-container .back-button');

		detailBtn.unbind('click');
		deleteBtn.unbind('click');
		backBtn.unbind('click');

		detailBtn.bind('click',onClickDetail);
		deleteBtn.bind('click',onClickDelete);
		backBtn.bind('click', onClickBack);
		
		searchController.enableEvents();
		detailController.enableEvents();
	};
	this.disableEvents = function(){
		var backBtn = self.view.container().find('.button-container .back-button');
		searchController.disableEvents();
		detailController.disableEvents();
		tableController.view.container().find('button').unbind('click');
		backBtn.unbind('click');
	};
	//delegate
	this.changePage = function(hashpage){
		self.delegate.changePage(hashpage);
	};
	this.enableAllEvents = function(){
		self.delegate.enableEvents();
	};
	//options
	this.triggerOption = function(index){
		self.delegate.triggerOption(index);
	};
	MainController.prototype._init_.call(this);
};