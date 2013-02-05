Importer.importfile('Classes/Controllers/MenuController.js');
function MasterControl(){
	var self            = this;
	var appContainer    = $('.app-container');
	var headerContainer = $('header');
	var menuController = null;

	this.navigationController = null;
	this.headerController     = null;
	this.loginController      = null;
	this.messageController    = null;
	this.mainController       = null;
	
	this.userService   = null;
	this.stockService  = null;
	this.salesService  = null;
	this.posService = null;

	function _init_() {
		if(!menuController){
			menuController          = new MenuController();
			menuController.delegate = self;
		};
		self.navigationController = new NavigationController();
		self.navigationController.setOptions({
			cookiePrefix: 'lamejorcita',
			loginValidation: validationRule
		});
		self.navigationController.addUnloggedUrl('', loadLoginPage);
		self.navigationController.addLoggedUrl('', self.changePage, '/Stocks');

		self.navigationController.addLoggedUrl('/Stocks', 	loadStockPage);
		self.navigationController.addLoggedUrl('/POS', 		loadPOSPage);
		self.navigationController.addLoggedUrl('/Sellers', 	loadSellersPage);
		self.navigationController.addLoggedUrl('/Sales', 	loadSalesPage);
		self.navigationController.addLoggedUrl('/Products', loadProductsPage);
		self.navigationController.addLoggedUrl('/Users', loadUsersPage);
		self.navigationController.addLoggedUrl('/Batches/:productId', loadBatchesPage);

		self.navigationController.addLoggedUrl('/Detail/:kind/:id', loadDetailPage);
		self.navigationController.addLoggedUrl('/Insert/:kind', loadInsertionPage);
		self.navigationController.addLoggedUrl('/Edit/:kind/:id', loadEditionPage);

		self.navigationController.addLoggedUrl('/POS/:kind/:id', 		loadPOSPage);
		self.navigationController.addLoggedUrl('/Sellers/:kind/:id', 	loadSellersPage);
		self.navigationController.addLoggedUrl('/Sales/:kind/:id', 	loadSalesPage);
		self.navigationController.addLoggedUrl('/Products/:kind/:id', loadProductsPage);
		self.navigationController.addLoggedUrl('/Batches/:productId/:kind/:id', loadBatchesPage);
	};
	function validationRule(){
		return $.cookie('lamejorcita.login')? true: false;
	};
	this.changePage = function(hashurl) {
		self.navigationController.changePage(hashurl);
	};
	//Login
	function loadLoginPage () {
		self.headerController.view.removeView();
		self.loginController.view.appendToView(appContainer);
	};
	this.login = function(userdata) {
		self.userService.login(userdata);
	};
	function loadMainView(){
		self.headerController.view.appendToView(headerContainer);
		menuController.view.appendToView(appContainer);
		self.mainController.view.appendToView(appContainer);
	};
	function loadStockPage(){
		var data; 
		loadMainView();
		self.mainController.additionalData =data;
		self.mainController.loadStockPage();
	};
	function loadPOSPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadPOSPage();
	};
	function loadSellersPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadSellersPage();
	};		
	function loadSalesPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadSalesPage();
	};
	function loadProductsPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadProductsPage();
	};
	function loadUsersPage(){
		loadMainView();
		self.mainController.loadUsersPage();
	};
	function loadBatchesPage(data){
		loadMainView();
		self.mainController.additionalData =  typeof data =="object" ? data: {productId: data};
		self.mainController.loadBatchesPage();
	};
	function loadDetailPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadDetailPage(data);
	};
	function loadInsertionPage(data) {
		loadMainView();
		var data = typeof data == "string"? {kind: data}: data;
		data['method'] = 'insert'
		self.mainController.loadAdditionPage(data);
	};
	function loadEditionPage(data){
		loadMainView();
		var data = typeof data == "string"? {kind: data}: data;
		data['method'] = 'edit'
		self.mainController.loadAdditionPage(data);
	};
	//Stock
	this.searchStocks = function(searchData){
		self.stockService.searchStocks(searchData);
	};
	//POS
	this.searchPOSs = function(searchData){
		self.posService.searchPOS(searchData);
	};
	//Sellers
	this.searchSellers = function(searchData){
		self.userService.searchSellers(searchData);
	};
	//Sales
	this.searchSales = function(searchData){
		self.salesService.searchSales(searchData);
	};
	//Products
	this.searchProducts = function(searchData){
		self.stockService.searchProducts(searchData);
	};
	this.setProductDetail = function(data){
		self.mainController.setProductDetail(data);
	};
	//Users
	this.searchUsers = function(data){
		self.userService.searchUsers(data);
	};
	//Batches
	this.searchBatches = function(searchData){
		self.stockService.searchBatches(searchData);
	};
	this.setBatches = function(batches){
		self.mainController.setBatches(batches);
	};
	//General
	this.createGlobalMessage = function(options){
		self.messageController.createMessage.call($('body'), options);
	};
	this.deleteSearch = function(){
		self.mainController.deleteSearch();
	};
	this.setTableData = function(tableData){
		self.mainController.setTableData(tableData);
	};
	//Detail
	this.getStockDetail = function(stockId, callbacks){
		self.stockService.getStockDetail(stockId, callbacks);
	};
	this.getPosDetail = function(posId, callbacks){
		self.posService.getPosDetail(posId, callbacks);
	};
	this.getSellerDetail = function(sellerId, callbacks){
		self.userService.getSellerDetail(sellerId, callbacks);
	};
	this.getSaleDetail = function(saleId, callbacks){
		self.salesService.getSaleDetail(saleId, callbacks);
	};
	this.getProductDetail = function(productId, callbacks){
		self.stockService.getProductDetail(productId, callbacks);
	};
	this.getUserDetail = function(userId, callbacks){
		self.userService.getUserDetail(userId, callbacks);
	};
	this.setDetail = function(data){
		self.mainController.setDetail(data);
	};
	//Addition
	this.getStocksforAddition= function(){
		self.stockService.getStocksforAddition();
	};
	this.getProductsforAddition= function(){
		self.stockService.getProductsforAddition();
	};
	this.setStocksforAddition = function(data){
		self.mainController.setStocksforAddition(data);
	};
	this.setProductsforAddition = function(data){
		self.mainController.setProductsforAddition(data);
	};
	this.getUsersForAddition = function(){
		self.userService.getUsersForAddition();
	};
	this.setUsersForAddition = function(users){
		self.mainController.setUsersForAddition(users);
	};
	this.successfulAddition = function(){
		self.mainController.successfulAddition();
	};
	//Addition
	this.addStock = function(dataToSend){
		self.stockService.addStock(dataToSend);
	};
	this.addBatch = function(dataToSend){
		self.stockService.addBatch(dataToSend);
	};
	this.addUser = function(dataToSend){
		self.userService.addUser(dataToSend);
	};
	this.addProduct = function(data){
		self.stockService.addProduct(data);
	};
	this.addPos = function(dataToSend){
		self.posService.addPos(dataToSend);
	};
	this.addSeller = function(dataToSend){
		self.userService.addSeller(dataToSend);
	};

	this.successfulProductAddition = function(){
		self.mainController.successfulProductAddition();
	};
	this.failedProductAddition = function(){
		self.mainController.failedProductAddition();
	};
	this.setEditionData = function(editData){
		self.mainController.setEditionData(editData);
	};
	//Deletion
	this.deleteBatch = function(deleteData){
		self.stockService.deleteBatch(deleteData);
	};
	this.deleteProduct = function(deleteData){
		self.stockService.deleteProduct(deleteData);
	};
	this.successfulRemoval = function(){
		self.mainController.successfulRemoval();
	};
	//menu view
	this.updateMenu = function(index){
		menuController.changeOption(index);
	};
	this.triggerOption = function(index){
		menuController.triggerOption(index);
	};
	//Enable Disable
	this.enableEvents = function(){
		self.mainController.enableEvents();
		menuController.enableEvents();
	};
	this.disableEvents = function(){
		self.mainController.disableEvents();
		menuController.disableEvents();
	};
	_init_();
};