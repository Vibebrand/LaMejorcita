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
				name: "Guy Fawkes",
				curp: 'PIIG720116BV1',
				email: "faukes@mail.com",
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
						email: "faukes@mail.com"
					},
					phone      	:"123456"+i
				}
			};
			sellers.push(seller);
		};
		console.log(sellers);
		self.delegate.setSellers(sellers);
	};
};
UserService.prototype = new Service();