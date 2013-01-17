

Importer.importfile('Classes/Services/TextValidationService.js');

function LoginController(){
	var self      = this;
	this.username  = null;
	this.password  = null;
	this.submitBtn = null;

	this.delegate              = null;
	this.messageController     = null;
	this.textValidationService = null;

	function onKeyDown(event){
		if(event.keyCode === 13)
			submitBtn.trigger('click');
	};
	function validateFiles() {
		var count = 0;
		var inputs = section.find('input');
		for (var i = 0; i < inputs.length; i++) {
			if($.trim(inputs[i].value) === "")
				count++;
		};
		return count < 1;
	};
	LoginController.prototype._init_.call(this);
};
LoginController.prototype = new ViewController();
LoginController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.username = $('<input type="text"/>');
	this.password = $('<input type="password"/>');
	this.submitBtn = $('<button class="enter-button"></button>');

	this.username.attr('placeholder','Nombre de usuario');
	this.password.attr('placeholder','Contraseña');
	this.submitBtn.text('Entrar');

	this.view.addSubview(this.username);
	this.view.addSubview(this.password);
	this.view.addSubview(this.submitBtn);
};

	

