Importer.importfile('Classes/Views/Login.js');
function LoginController(){
	function LoginController(){
		var self      = this;
		this.view     = new Login();
		this.delegate = null;
		this.view.setClass('login-wrapper');
		
	}
	LoginController.prototype = new ViewController();
	return new LoginController();
};
