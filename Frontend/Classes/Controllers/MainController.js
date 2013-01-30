Importer.importfile('Classes/Controllers/SearchController.js');
Importer.importfile('Classes/Controllers/TableController.js');
Importer.importfile('Classes/Controllers/DetailController.js');
Importer.importfile('Classes/Controllers/AdditionController.js');
MainController.prototype = new ViewController();
MainController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('main-container');
};
function MainController () {
	var buttonsContainer;
	var infoContainer;
	var current;
	var editionId;
	var self               = this;
	var pagecount          = 0;
	var objects            = 15;
	var tableController    = null;
	var detailController   = null;
	var searchController   = null;
	var additionController = null;
	var pages              = ["stock","pos","seller","sale","product"];
	var currentDataKeys    = [];
	this.currentData       = [];
	this.messageController = null;
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
			detailController          = new DetailController();
			detailController.delegate = self;
		};
		if(!additionController){
			additionController          = new AdditionController();
			additionController.delegate = self;
			additionController.messages = self.delegate.messageController;
		};
		searchController.view.appendToView(self.view);
		tableController.view.appendToView(this.view);
	};
	this.updateMenu = function(index){
		self.delegate.updateMenu(index);
	};
	//Stocks
	this.loadStockPage = function(){
		searchController.showSearch();
		searchController.showAddButton();
		if(this.page != "Stock"){
			this.page     = "Stock";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var editBtn = $('<button class="edit-button">Editar</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'name', 			 'className': 'name', 'value':'Nombre'});
			tableController.tableHeaders.push({'identifier': 'address', 		 'className': 'address', 'value':'Dirección'});
			tableController.tableHeaders.push({'identifier': 'address.district', 'className': 'district', 'value':'Colonia'});
			tableController.tableHeaders.push({'identifier': 'manager.name', 	 'className': 'manager', 'value':'Responsable'});
			tableController.tableHeaders.push({'identifier': 'phone', 			 'className': 'phone', 'value':'Teléfono'});
			tableController.tableHeaders.push({'identifier': 'detail', 			 'className': 'detail', 'value':'', 'itemPrototype': detailBtn});
			tableController.tableHeaders.push({'identifier': 'edit', 			 'className': 'edit', 'value':'', 'itemPrototype': editBtn});
			tableController.tableHeaders.push({'identifier': 'delete', 			 'className': 'delete', 'value':'', 'itemPrototype': deleteBtn});
			tableController.view.setClass('stock-table');
			loadTableView();
		};
		removeBatchView();
		createVisualizationButtons();
		prepareTableView();
	};
	this.setStocks = function(stocks){
		self.currentData = stocks;
		tableController.loadTable(true);
	};
	//Sale points
	this.loadPOSPage = function() {
		searchController.showSearch();
		searchController.showAddButton();
		if(self.page != "POS"){
			self.page = "POS";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var editBtn = $('<button class="edit-button">Editar</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'fridge.status', 		'className': 'status', 'value':'Estado'});
			tableController.tableHeaders.push({'identifier': 'fridge.serial', 		'className': 'serial', 'value':'Serial'});
			tableController.tableHeaders.push({'identifier': 'address', 			'className': 'address', 'value':'Dirección'});
			tableController.tableHeaders.push({'identifier': 'address.district', 	'className': 'district', 'value':'Colonia'});
			tableController.tableHeaders.push({'identifier': 'representative.name', 'className': 'representative', 'value':'Representante'});
			tableController.tableHeaders.push({'identifier': 'phone', 				'className': 'phone', 'value':'Teléfono'});
			tableController.tableHeaders.push({'identifier': 'detail', 				'className': 'detail', 'value':'', 'itemPrototype': detailBtn});
			tableController.tableHeaders.push({'identifier': 'edit', 				'className': 'edit', 'value':'', 'itemPrototype': editBtn});
			tableController.tableHeaders.push({'identifier': 'delete', 				'className': 'delete', 'value':'', 'itemPrototype': deleteBtn});
			tableController.view.setClass('pos-table');
			loadTableView();
		};
		removeBatchView();
		createVisualizationButtons
		prepareTableView();
	};
	this.setPOSData = function(posdata){
		self.currentData = posdata;
		tableController.loadTable(true);
	};
	//Sellers
	this.loadSellersPage = function() {
		removeVisualizationButtons();
		searchController.showSearch();
		if(self.page != "Seller"){
			self.page = "Seller";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			var editBtn = $('<button class="edit-button">Editar</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'name', 	   'className': 'name', 'value':'Nombre'});
			tableController.tableHeaders.push({'identifier': 'phone', 	   'className': 'phone', 'value':'Teléfono'});
			tableController.tableHeaders.push({'identifier': 'email', 	   'className': 'email', 'value':'Correo electrónico'});
			tableController.tableHeaders.push({'identifier': 'stock.name', 'className': 'stock', 'value':'Bodega'});
			tableController.tableHeaders.push({'identifier': 'detail', 	   'className': 'detail', 'value':'', 'itemPrototype': detailBtn});
			tableController.tableHeaders.push({'identifier': 'edit', 	   'className': 'edit', 'value':'', 'itemPrototype': editBtn});
			tableController.tableHeaders.push({'identifier': 'delete', 	   'className': 'delete', 'value':'', 'itemPrototype': deleteBtn});
			tableController.view.setClass('sellers-table');
			loadTableView();
		};
		removeBatchView();
		searchController.showAddButton();
		prepareTableView();
	};
	this.setSellers = function(sellers) {
		self.currentData = sellers;
		tableController.loadTable(true);
	};
	//Sales
	this.loadSalesPage = function() {
		searchController.showSearch();
		searchController.hideAddButton();
		if(self.page != "Sale"){
			self.page = "Sale";
			var detailBtn = $('<button class="detail-button">Ver mas</button>');
			tableController.view.setClass('sales-table');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'salepoint.fridge.status', 'className': 'status', 'value':'Estado'});
			tableController.tableHeaders.push({'identifier': 'date', 					'className': 'date', 'value':'Fecha'});
			tableController.tableHeaders.push({'identifier': 'time', 					'className': 'time', 'value':'Hora'});
			tableController.tableHeaders.push({'identifier': 'salepoint.fridge.serial', 'className': 'serial', 'value':'Punto de venta'});
			tableController.tableHeaders.push({'identifier': 'products.count', 			'className': 'count', 'value':'Cantidad'});
			tableController.tableHeaders.push({'identifier': 'products.amount', 		'className': 'amount', 'value':'Monto'});
			tableController.tableHeaders.push({'identifier': 'detail', 					'className': 'detail', 'value':'', 'itemPrototype': detailBtn});
			tableController.view.setClass('sale-table');
			loadTableView();
		};
		removeBatchView();
		createVisualizationButtons();
		prepareTableView();
	};
	this.setSales = function(sales){
		self.currentData = sales;
		tableController.loadTable(true);
	};
	//Products
	this.loadProductsPage = function() {
		searchController.showSearch();
		searchController.showAddButton();
		if(self.page != "Product"){
			self.page = "Product";
			var batchBtn = $('<button class="batch-button">Lotes</button>');
			var editBtn = $('<button class="edit-button">Editar</button>');
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'name', 			'className': 'name', 'value':'Nombre'});
			tableController.tableHeaders.push({'identifier': 'salePrice', 		'className': 'salePrice', 'value':'Precio'});
			tableController.tableHeaders.push({'identifier': 'registationDate', 'className': 'registationDate','value':'Fecha de registro'});
			tableController.tableHeaders.push({'identifier': 'count', 			'className': 'count', 'value':'Cantidad'});
			tableController.tableHeaders.push({'identifier': 'batch', 			'className': 'batch', 'value':'', 'itemPrototype': batchBtn});
			if(typeof self.additionalData == "undefined"){
				tableController.tableHeaders.push({'identifier': 'edit', 		'className': 'edit', 'value':'', 'itemPrototype': editBtn});
				tableController.tableHeaders.push({'identifier': 'delete', 		'className': 'delete', 'value':'', 'itemPrototype': deleteBtn});
			};
			tableController.view.setClass('products-table');
			loadTableView();
		};
		removeBatchView();
		removeVisualizationButtons();
		prepareTableView();
	};
	this.setProducts = function(products){
		self.currentData = products;
		tableController.loadTable(true);
	};
	//Batches
	this.loadBatchesPage = function(){
		searchController.showSearch();
		searchController.showAddButton();
		if(self.page != "Batch"){
			self.page = "Batch";
			var deleteBtn = $('<button class="delete-button">-</button>');
			tableController.tableHeaders = [];
			tableController.tableHeaders.push({'identifier': 'batch.expiration', 'className': 'expiration', 'value':'Lote'});
			tableController.tableHeaders.push({'identifier': 'batch.count', 	 'className': 'count', 'value':'Cantidad'});
			tableController.tableHeaders.push({'identifier': 'delete', 			 'className': 'delete', 'value':'', 'itemPrototype': deleteBtn});
			tableController.view.setClass('batches-table');
			self.createDetailMenu();
			loadTableView();
		};
		createProductDetail();
		prepareTableView();
		removeVisualizationButtons();
	};
	function getObjectKeys(objects){
		for (var object in objects)
			currentDataKeys.push(object);
	};
	function createProductDetail(){
		if(typeof infoContainer == "undefined"){
			infoContainer = $('<div class="productInfo-container"></div>');
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
		};
		self.view.addSubview(infoContainer);
	};
	function createBatchItem(count, expiration){
	};
	function removeBatchView(){
		if(typeof infoContainer != "undefined")
			infoContainer.detach();
	};
	this.setProductDetail = function(product){
		setTimeout(function(){
			if(typeof infoContainer != "undefined"){
				var pname = infoContainer.find('.name .value');
				var salePrice = infoContainer.find('.salePrice .value');
				pname.text(product.name);
				salePrice.text('$ '+product.salePrice.toFixed(2));
			}else
				setTimeout(arguments.callee, 50);
		},50);
		self.enableAllEvents();
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

		removeBatchView();
		searchController.hideSearch();
		searchController.hideAddButton();
		removeVisualizationButtons();
		detailController.view.removeView();
		tableController.view.removeView();
		additionController.view.removeView();

		self.deleteSearch();
		self.updateMenu($.cookie('lamejorcita.option'));
		detailController.createDetailMenu();
		detailController.view.appendToView(self.view);
	};
	this.getDetail = function(page, id, callbacks){
		var getCall = self.delegate["get"+page.toCapitalize()+"Detail"];
		if(typeof getCall == "function") getCall.call(self.delegate, id, callbacks);
	};
	this.setDetail = function(data){
		detailController.setDetail(data);
	};
	//Addition
	this.loadAdditionPage = function(data){
		removeBatchView();
		removeVisualizationButtons();
		self.removeDetailMenu();
		self.createDetailMenu();

		self.page = "Addition";
		additionController.data = data;
		searchController.hideSearch();
		searchController.hideAddButton();
		detailController.view.removeView();
		tableController.view.removeView();
		
		self.deleteSearch();
		self.updateMenu($.cookie('lamejorcita.option'));
		additionController.view.appendToView(self.view);
	};
	this.getStocksforAddition= function(){
		self.delegate.getStocksforAddition();
	};
	this.getProductsforAddition= function(){
		self.delegate.getProductsforAddition();
	};
	this.setStocksforAddition = function(data){
		additionController.setStocksforAddition(data);
	};
	this.setProductsforAddition = function(data){
		additionController.setProductsforAddition(data);
	};
	this.setEditionData = function(editData){
		additionController.setEditionData(editData);
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
			stringValue = currentDataKeys[index];
		if(identifier == "batch.count")
			stringValue = self.currentData[currentDataKeys[index]];

		if(identifier === "address")
			stringValue =  self.getAddressString(celldata[identifier]);
		if(identifier.indexOf("fridge.status") != -1)
			stringValue =  getFridgeStatus(stringValue);
		if(identifier.indexOf("salePrice") != -1 || identifier.indexOf("amount") != -1 )
			stringValue = getPrice(stringValue);

		return stringValue;
	};
	this.tableLoaded = function() {
		self.enableAllEvents();
	};
	this.makeSearch = function(additional){
		self.delegate.disableEvents();
		var searchData  = $.extend({},{}, additional);
		searchData.objects = objects;
		searchData.page = pagecount;
		if($.cookie('lamejorcita.keywords'))
			searchData.keywords = $.cookie('lamejorcita.keywords');
		if(typeof self.additionalData == "object"){
			if(typeof self.additionalData.id != "undefined")
				searchData[self.additionalData.kind+'Id'] = self.additionalData.id;
			if(typeof self.additionalData.productId != "undefined")
				searchData['productId']= self.additionalData.productId;
		};
		if(self.page != "Batch")
			self.delegate['search'+self.page+'s'].call(self.delegate, searchData);
		else
			self.delegate['search'+self.page+'es'].call(self.delegate, searchData);
	};
	function loadTableView(){
		currentDataKeys = [];
		tableController.cleanTable();
		tableController.view.removeView();
		self.makeSearch({});
	};
	function prepareTableView(){
		if(self.page != "Batch")
			self.removeDetailMenu();
		detailController.view.removeView();
		tableController.view.appendToView(self.view);
		additionController.view.removeView();
		if(self.page != "Batch")
			self.updateMenu(pages.indexOf(self.page.toLowerCase()));
		else
			self.updateMenu(pages.length-1);
	};
	this.reloadTable = function(){
		currentDataKeys = [];
		tableController.cleanTable();
		self.makeSearch({});
	};
	//Creation
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
	this.createDetailMenu = function(addEdition){
		self.removeDetailMenu();
		var buttonCotnainer = $('<div class="detailButton-container"></div>');
		var backBtn         = $('<button class="back-button"></button>');
		self.view.addSubview(buttonCotnainer);
		buttonCotnainer.append(backBtn);
		backBtn.text('Volver');
		if(addEdition === true){
			var editBtn = $('<button class="edit-button"></button>');
			buttonCotnainer.append(editBtn);
			editBtn.text('Editar');
		};
	};
	this.removeDetailMenu = function(){
		var buttonCotnainer = self.view.container().find('.detailButton-container');
		buttonCotnainer.remove();
	};
	function createDeleteModalbox(){
		$('#mask').show();
		var deleteForm = $('<div class="delete-form"></div>');
		var message    = $('<span class="message"></span>');
		var acceptBtn  = $('<button class="accept"></button>');
		var cancelBtn  = $('<button class="cancel"></button>');
		deleteForm.append(message);
		deleteForm.append(acceptBtn);
		deleteForm.append(cancelBtn);
		self.messageController.addViewAsMessage.call($('body'),{
			view 		: deleteForm,
			className	: 'delete-modalbox',
			animation	: 'fadeIn',
			speed		: 'fast'
		});
		message.text('¿Esta seguro de querer borrar este dato?');
		acceptBtn.text('Aceptar');
		cancelBtn.text('Cancelar');
		cancelBtn.bind('click', onClickCancel);
		acceptBtn.bind('click', deleteRow);
	};
	//Data obtaining
	this.getAddressString = function(address){
		var addressText = address.street+" #"+address.extNum;
		if(address.intNum != "")
			addressText+= " int. "+address.intNum;
		return addressText;
	};
	function getFridgeStatus(fridgeStatus){
		return  fridgeStatus ? "✔" : "✘";
	};
	function getPrice(stringValue){
		return "$ "+Number(stringValue).toFixed(2);
	};
	//Edition Addition
	self.addData = function(kind, data){
		var addCall = self.delegate['add'+kind];
		if(typeof addCall == "function")
			addCall.call(self.delegate, data);
	};
	this.successfulAddition = function(){
		onClickBack();
	};
	this.successfulRemoval = function(){
		if(typeof current == "object" && typeof current.find != "undefined"){
			var cancelBtn = $('.delete-modalbox button.cancel');
			cancelBtn.trigger('click');
			setTimeout(function(){
				current.slideUp('fast', current.remove);
			},300);
		};
	};
	this.successfulProductAddition = function(){
		additionController.successfulProductAddition();
	};
	this.failedProductAddition = function(){
		additionController.failedProductAddition();
	};
	//Events
	function onClickDetail(){
		var detailId = $(this).parents('tr').data('id');
		self.delegate.disableEvents();
		self.changePage('/Detail/'+self.page.toLowerCase()+'/'+detailId);
		return;
	};
	function onClickBatch(){
		var detailId = $(this).parents('tr').data('id');
		self.delegate.disableEvents();
		if(typeof self.additionalData == "undefined" ){
			self.changePage('/Batches/'+detailId);
			return;
		};
		if(typeof self.additionalData == "object" && typeof self.additionalData.id != "undefined"){
			self.changePage('/Batches/'+detailId+'/'+self.additionalData.kind.toLowerCase()+'/'+self.additionalData.id);
			return;
		};
		return;
	};
 	function onClickDelete(){
 		var deleteCall = self.delegate['delete'+self.page];
 		if(typeof deleteCall == "function"){
 			self.delegate.disableEvents();
	 		current = $(this).parents('tr');
	 		createDeleteModalbox();
 		};
 	};
 	function onClickBack(){
		var prevPage = $.cookie('lamejorcita.prevPage')?  $.cookie('lamejorcita.prevPage'): '';
		var index = self.page != "Batch"? detailController.pagenum: pages.length-1;
		if($.trim(prevPage) != "" && prevPage != $.cookie('lamejorcita.page') && prevPage.indexOf('Detail') == -1)
			self.changePage(prevPage);
		else
			self.triggerOption(index);
	};
	this.onClickAdd = function(){
		self.delegate.disableEvents();
		if(self.page == "Product"){
			additionController.data = {kind: 'product', method: 'insert'}
			additionController.loadProductView();
		}else
			self.changePage('/Insert/'+self.page.toLowerCase());
	};
	function onClickEdit(){
		self.delegate.disableEvents();
		var editionId = $(this).parents('tr').data('id');
		var page = (typeof self.page == "undefined")? detailController.page: self.page;
		editionId = (typeof editionId == "undefined")? detailController.currentId : editionId;
		if(self.page == "Product"){
			additionController.data = {id: editionId, kind: page.toLowerCase(), method: 'edit'};
			additionController.editProduct();
		}else
			self.changePage('/Edit/'+page.toLowerCase()+'/'+editionId);
	};
	function onClickCancel(){
		var element = $(this).parents('.delete-modalbox')
		element.fadeOut('fast', element.remove);
		$('#mask').hide();
		self.enableAllEvents();
	};
	function deleteRow(){
		if(typeof current == "object" && typeof current.find != "undefined"){
			$(this).unbind('click');
			var id         = current.data('id')
			var deleteCall = self.delegate['delete'+self.page];
			var deleteData = {};
			if(self.page.toLowerCase() == "batch"){
	 			deleteData.expirationDate = id;
	 			deleteData.productId = self.additionalData.productId
	 			if(typeof self.additionalData.kind != "undefined" && typeof self.additionalData.id != "undefined")
	 				deleteData[self.additionalData.kind+'Id'] = self.additionalData.id;
	 		}else
	 			deleteData.id = id;

	 		if (typeof deleteCall == "function")
	 			deleteCall.call(self.delegate, deleteData);
		};
	};
	//Enable Disable
	this.enableEvents = function(){
		var detailBtn = tableController.view.container().find('.detail-button');
		var deleteBtn = tableController.view.container().find('.delete-button');
		var backBtn   = self.view.container().find('.detailButton-container .back-button');
		var batchBtn  = tableController.view.container().find('.batch-button');
		var editBtn   = self.view.container().find('.edit-button');

		detailBtn.unbind('click');
		deleteBtn.unbind('click');
		backBtn.unbind('click');
		batchBtn.unbind('click');
		editBtn.unbind('click');

		detailBtn.bind('click',onClickDetail);
		deleteBtn.bind('click',onClickDelete);
		backBtn.bind('click', onClickBack);
		batchBtn.bind('click', onClickBatch);
		editBtn.bind('click', onClickEdit);
		
		searchController.enableEvents();
		detailController.enableEvents();
		additionController.enableEvents();
	};
	this.disableEvents = function(){
		var backBtn = self.view.container().find('.button-container .back-button');
		tableController.view.container().find('button').unbind('click');

		backBtn.unbind('click');

		searchController.disableEvents();
		detailController.disableEvents();
		additionController.disableEvents();
	};
	//delegate
	this.changePage = function(hashpage){
		self.delegate.changePage(hashpage);
	};
	this.enableAllEvents = function(){
		self.delegate.enableEvents();
	};
	this.deleteSearch = function(){
		searchController.deleteSearch();
	};
	//options
	this.triggerOption = function(index){
		self.delegate.triggerOption(index);
	};
	MainController.prototype._init_.call(this);
};