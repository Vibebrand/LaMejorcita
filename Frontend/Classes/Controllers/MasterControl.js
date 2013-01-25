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
		self.navigationController.addLoggedUrl('/Batches/:productId', loadBatchesPage);

		self.navigationController.addLoggedUrl('/Detail/:kind/:id', loadDetailPage);
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
	function loadBatchesPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadBatchesPage();
	};
	function loadDetailPage(data){
		loadMainView();
		self.mainController.additionalData =  data;
		self.mainController.loadDetailPage(data);
	};
	//Stock
	this.searchStocks = function(searchData){
		self.stockService.searchStocks(searchData);
	};
	this.setStocks = function(stocks){
		self.mainController.setStocks(stocks);
	};
	//POS
	this.searchPOSs = function(searchData){
		self.posService.searchPOS(searchData);
	};
	this.setPOSData = function(posdata){
		self.mainController.setPOSData(posdata);
	};
	//Sellers
	this.searchSellers = function(searchData){
		self.userService.searchSellers(searchData);
	};
	this.setSellers = function(sellers) {
		self.mainController.setSellers(sellers);
	};
	//Sales
	this.searchSales = function(searchData){
		self.salesService.searchSales(searchData);
	};
	this.setSales = function(sales){
		self.mainController.setSales(sales);
	};
	//Products
	this.searchProducts = function(searchData){
		self.stockService.searchProducts(searchData);
	};
	this.setProducts = function(products){
		self.mainController.setProducts(products);
	};
	this.setProductDetail = function(data){
		self.mainController.setProductDetail(data);
	};
	//Batches
	this.searchBatches = function(searchData){
		self.stockService.searchBatches(searchData);
	};
	this.setBatches = function(batches){
		self.mainController.setBatches(batches);
	};
	//Detail
	this.getStockDetail = function(stockId){
		self.stockService.getStockDetail(stockId);
	};
	this.getPosDetail = function(posId){
		self.posService.getPosDetail(posId);
	};
	this.getSellerDetail = function(sellerId){
		self.userService.getSellerDetail(sellerId);
	};
	this.getSaleDetail = function(saleId){
		self.salesService.getSaleDetail(saleId);
	};
	this.getProductDetail = function(productId){
		self.stockService.getProductDetail(productId);
	};
	this.setDetail = function(data){
		self.mainController.setDetail(data);
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