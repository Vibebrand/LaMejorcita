

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
		self.navigationController.addLoggedUrl('', changePage, '/Stocks');
		self.navigationController.addLoggedUrl('/Stocks', loadStockPage);
	};
	function validationRule(){
		return $.cookie('lamejorcita.login')? true: false;
	};
	function changePage(hashurl) {
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
	//Stock
	function loadStockPage () {
		self.mainController.page = 'Stock';
		self.headerController.view.appendToView(headerContainer);
		self.mainController.view.appendToView(appContainer);
	};
	this.searchStocks = function(searchData){
		self.stockService.searchStocks(searchData);
	};
	_init_();
};