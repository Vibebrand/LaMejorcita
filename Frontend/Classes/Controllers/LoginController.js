
Importer.importfile('Classes/Services/TextValidationService.js');
LoginController.prototype = new ViewController();
LoginController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.username = $('<input type="text"/>');
	this.password = $('<input type="password"/>');
	this.submitBtn = $('<button class="enter-button"></button>');

	this.username.attr('placeholder','Nombre de usuario');
	this.password.attr('placeholder','Contraseña');
	this.submitBtn.text('Entrar');

	this.view.setClass('login-container');
	this.view.addSubview(this.username);
	this.view.addSubview(this.password);
	this.view.addSubview(this.submitBtn);
	this.enableViewEvents();
};
function LoginController(){
	var self      = this;
	this.username  = null;
	this.password  = null;
	this.submitBtn = null;

	this.delegate              = null;
	this.messageController     = null;
	this.textValidationService = null;
	this.enableViewEvents = function() {
		self.submitBtn.bind('click', onClickSubmit);
		$(document).bind('keydown.login', function(event){onKeyDown(event)});
	};
	function onClickSubmit() {
		if(validateFiles())
			self.delegate.login(createData());
	};
	function onKeyDown(event){
		if(event.keyCode === 13)
			self.submitBtn.trigger('click');
	};
	function validateFiles() {
		var count = 0;
		var inputs = self.view.container().find('input');
		for (var i = 0; i < inputs.length; i++) {
			if($.trim(inputs[i].value) === "")
				count++;
		};
		return count < 1;
	};
	function createData() {
		return {
			"username": self.username.val(),
			"password": self.password.val()
		};
	};
	LoginController.prototype._init_.call(this);
};

	

