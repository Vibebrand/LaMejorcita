
Importer.importfile('Classes/Services/TextValidationService.js');
Importer.importfile('Classes/Views/Login.js');


function LoginController(){
	
	var self      = this;
	var username  = null;
	var password  = null;
	var submitBtn = null;
	this.view = new Login();
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
	
};
LoginController.prototype = new ViewController();

	

