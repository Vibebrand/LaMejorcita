

function MasterControl(){
	var self            = this;
	var appContainer    = $('.app-container');
	var headerContainer = $('header');

	this.navigationController = null;
	this.headerController     = null;
	this.loginController      = null;
	this.messageController    = null;
	this.mainController       = null;

	this.userService = null;
	this.stockService = null;

	function _init_() {
		self.navigationController = new NavigationController();
		self.navigationController.setOptions({
			cookiePrefix: 'lamejorcita',
			loginValidation: validationRule
		});
		self.navigationController.addUnloggedUrl('', loadLoginPage);
		self.navigationController.addLoggedUrl('', self.changePage, '/Stocks');
		self.navigationController.addLoggedUrl('/Stocks', loadMainView, 'Stock');
		self.navigationController.addLoggedUrl('/Points', loadMainView, 'Point');
		self.navigationController.addLoggedUrl('/Sellers', loadMainView, 'Seller');
		self.navigationController.addLoggedUrl('/Sales', loadMainView, 'Sale');
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
	
	function loadMainView (page) {
		self.mainController.page = page;
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
	};
	//Stock
	this.searchStocks = function(searchData){
		self.stockService.searchStocks(searchData);
	};
	this.setStocks = function(stocks){
		self.mainController.setStocks(stocks);
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