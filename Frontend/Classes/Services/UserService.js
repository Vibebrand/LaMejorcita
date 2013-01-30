function UserService(){
	var self = this;
	
	this.login =function(userdata){
		console.log(userdata);
		$.cookie('lamejorcita.login' , true);
		window.location.reload();
	};
	this.addUser = function(dataToSend){
		console.log(dataToSend);
		self.delegate.successfulAddition();
	};
	//Lists
	this.searchUsers = function(data){
		console.log(data);
		var users = [];
		for (var i = 0; i < 5; i++) {
			var user = {
				_id:"asfdo90qwqewr"+i,
				name: "User"+(i+1)+" Guy",
				curp: 'PIIG720116BV'+(i+1),
				email: "user"+(i+1)+".guy@mail.com",
				phone:"977733"+i,
				type: 'manager'
			};
			users.push(user);
		};
		console.log(users);
		self.delegate.setTableData(users);
	};
	this.searchSellers = function(searchData){
		console.log(searchData);
		var sellers = [];
		for (var i = 0; i < 15; i++) {
			var seller = {
				_id:"asfdo90qwqewr"+i,
				name: "Sales"+i+" Guy",
				curp: 'PIIG720116BV'+i,
				email: "sales.guy@mail.com",
				device: 'safdsafdevicesdf'+i+'20',
				phone:"123456"+i,
				stock:{
					_id			: "safdsafdsa0fd"+i,
					name        :"Bodega "+i,
					businessName:"Negocio "+i,
					address: {
						street: "Calle "+i,
						district: "Colonia "+i,
						intNum: "",
						extNum: String(i+1)
					},
					manager     :{
						_id	 : "asfdo90qwqewr"+i,
						name : "Guy Fawkes",
						curp : 'PIIG720116BV'+i,
						email: "sales.guy@mail.com"
					},
					phone      	:"123456"+i
				}
			};
			sellers.push(seller);
		};
		console.log(sellers);
		self.delegate.setTableData(sellers);
	};
	//Details
	this.getSellerDetail = function(sellerId, callbacks){
		var seller = {
			_id:"asfdo90qwqewr0",
			name: "Sales Guy",
			curp: 'PIIG720116BV1',
			email: "sales.guy@mail.com",
			device: 'safdsafdevicesdf020',
			phone:"9787621",
			stock:{
				_id			: "safdsafdsa0fd0",
				name        :"Bodega ",
				businessName:"Negocio "
			}
		};
		self.delegate.setDetail(seller);
	};
	this.getUserDetail = function(userId, callbacks){
		console.log(userId);
		var date = new Date();
		var user = {
			_id:"asfdo90qwqewr0",
			name: "User"+date.getSeconds()+" Guy",
			curp: 'PIIG720116BV'+date.getSeconds(),
			email: "user"+date.getSeconds()+".guy@mail.com",
			phone:"9777330",
			type: 'manager'
		};
			
		console.log(user);
		self.delegate.setDetail(user);
	};
};
UserService.prototype = new Service();