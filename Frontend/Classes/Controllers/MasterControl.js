function MasterControl(){
	var self            = this;
	var appContainer    = $('.app-container');
	var headerContainer = $('header');

	this.navigationController = null;
	this.headerController     = null
	this.loginController      = null
	
	this.createNavigation = function(){
		this.navigationController.setOptions({
			cookiePrefix: 'lamejorcita',
			loginValidation: validationRule
		});
		this.navigationController.addUnloggedUrl('', loadLoginPage);
	};
	function validationRule(){
		return $.cookie('lamejorcita.login')? true: false;
	};
	function loadLoginPage () {
		self.headerController.view.appendToView(headerContainer);
		self.loginController.view.appendToView(appContainer);
	};
};