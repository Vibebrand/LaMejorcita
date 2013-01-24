function UserService(){
	var self = this;
	
	this.login =function(userdata){
		console.log(userdata);
		$.cookie('lamejorcita.login' , true);
		window.location.reload();
	};

	this.searchSellers = function(searchData){
		console.log(searchData);
		var sellers = [];
		for (var i = 0; i < 15; i++) {
			var seller = {
				_id:"asfdo90qwqewr"+i,
				name: "Sales Guy",
				curp: 'PIIG720116BV1',
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
		self.delegate.setSellers(sellers);
	};
	this.getSellerDetail = function(sellerId){
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
};
UserService.prototype = new Service();