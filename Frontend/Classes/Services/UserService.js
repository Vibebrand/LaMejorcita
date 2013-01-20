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
				stock:{
					"_id"			:"safdsafdsa0fd"+i,
					"name"         	:"Bodega "+i,
					"businessName" 	:"Negocio "+i,
					"address"      	:"Dirección "+i,
					"manager"      	:"Responsable "+i,
					"phone"     	:"Telefono "+i
				},
				device: 'safdsafdevicesdf'+i+'20'
			};
			sellers.push(seller);
		};
		console.log(sellers);
	};
};
UserService.prototype = new Service();