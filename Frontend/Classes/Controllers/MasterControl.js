

function MasterControl(){

	var self            = this;
	var appContainer    = $('.app-container');
	var headerContainer = $('header');

	this.navigationController = null;
	this.headerController     = null;
	this.loginController      = null;
	this.messageController    = null;

	function _init_() {
		
		if(this.navigationController == null)
			this.navigationController = new NavigationController();
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
	_init_();
};