function MasterControl(){
	var self                  = this;
	this.appContainer = $('.app-container');
	this.headerContainer = $('header');

	this.navigationController = null;
	
	this.createNavigation = function(){
		this.navigationController.setOptions({
			cookiePrefix: 'lamejorcita',
			loginValidation: validationRule
		});
		this.navigationController.addUnloggedUrl('', loadLoginPage);
	}
	function validationRule(){
		return $.cookie('lamejorcita.login')? true: false;
	};
	function loadLoginPage () {
		self.headerContainer.append(self.headerController.view.container());
	}
};