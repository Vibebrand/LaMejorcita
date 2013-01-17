function UserService(){
	var self = this;
	this.delegate = null;
	this.login =function(userdata){
		console.log(userdata);
		$.cookie('lamejorcita.login' , true);
		window.location.reload();
	};
};
UserService.prototype = new Service();