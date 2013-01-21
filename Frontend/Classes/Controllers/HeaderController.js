HeaderController.prototype = new ViewController();
HeaderController.prototype._init_ = function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('header-container');
};
function HeaderController(){
	var self      = this;
	this.delegate = null;
	this.viewDidLoad = function(){
		var logo = $('<div class="logo"></div>');
		var username = $('<span class="username-text"></span>');
		var logoutBrn  = $('<button class="logout"></button>');
		logo.text('Logo');
		username.text('Admin');
		logoutBrn.text('Salir');

		this.view.addSubview(logo);
		this.view.addSubview(username);
		this.view.addSubview(logoutBrn);
	};
	HeaderController.prototype._init_ .call(this);
};