

function MasterControl(){
	var self            = this;
	var appContainer    = $('.app-container');
	var headerContainer = $('header');

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
		self.navigationController.addLoggedUrl('/Detail/:detailId', loadDetailPage);
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
	function loadStockPage(){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadStockPage();
	};
	function loadPOSPage(){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadPOSPage();
	};
	function loadSellersPage(){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadSellersPage();
	};		
	function loadSalesPage(){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadSalesPage();
	};
	function loadProductsPage(){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadProductsPage();
	};
	function loadDetailPage(detailId){
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
		self.mainController.loadDetailPage(detailId);
	};
	//Stock
	this.searchStocks = function(searchData){
		self.stockService.searchStocks(searchData);
	};
	this.setStocks = function(stocks){
		self.mainController.setStocks(stocks);
	};
	//POS
	this.searchPOS = function(searchData){
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
	//Enable Disable
	this.enableEvents = function(){
		self.mainController.enableEvents();
	};
	this.disableEvents = function(){
		self.mainController.disableEvents();
	};
	_init_();
};