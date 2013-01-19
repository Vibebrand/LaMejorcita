function UserService(){
	var self = this;
	
	this.login =function(userdata){
		console.log(userdata);
		$.cookie('lamejorcita.login' , true);
		window.location.reload();
	};

	this.searchSellers = function(searchData){
		console.log(searchData);
	};
};
UserService.prototype = new Service();