Importer.importfile('Classes/Views/Login.js');
function LoginController(){
	function LoginController(){
		var self = this;
		this.view = new Login();
		this.view.setClass('login-section');
		
	}
	LoginController.prototype = new ViewController();
	return new LoginController();
};
