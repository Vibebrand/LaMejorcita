function Login() {
	function Login() {
		var username;
		var password;
		var submitBtn;
		this.drawView = function() {
			username = $('<input type="text" placeholder="Nombre de Usuario"/>');
			password = $('<input type="password" placeholder="Contraseña"/>');
			submitBtn = $('<button></button>');
			submitBtn.text('Enviar');
			this.container().append(username);
			this.container().append(password);
			this.container().append(submitBtn);
		};
		this.drawView();
	};
	Login.prototype = new View();
	return new Login();
};
