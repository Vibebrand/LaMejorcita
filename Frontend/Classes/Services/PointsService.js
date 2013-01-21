function PointsService (argument) {
	var self = this;
	this.searchPoints = function(searchData){
		console.log(searchData);
		var salepoints = [];
		for (var i = 0; i < 15; i++) {
			var salepoint = {
				_id: "sdfadsasalepoint"+i,
				district: "Colonia "+i,
				address: "Dirección "+i,
				joinDate: "2013/01/01",
				phone: "1234567",
				email: "salepoint"+i+"@mail.com",
				maxSaleNumber: 1000,
				minSaleNumber: 50,
				geoposition: {
					latitude: "21.8818",
					longitude: "-102.2913"
				},
				fridge: {
					serial : "afsdll0132fridge"+i,
					temperature: -10,
					status: "bien"
				},
				manager:{
					_id:"asfdo90qwqewr"+i,
					name: "Guy Fawkes",
					curp: 'PIIG720116BV1'
				},
				stock: {
					_id			: "safdsafdsa0fd"+i,
					name        :"Bodega "+i,
					businessName:"Negocio "+i,
					district 	:"Colonia "+i,
					address     :"Dirección "+i,
					manager     :{
						_id	 : "asfdo90qwqewr"+i,
						name : "Guy Fawkes",
						curp : 'PIIG720116BV'+i,
						email: "faukes@mail.com"
					},
					phone      	:"123456"+i,
					geoposition: {
						latitude: "21.8818",
						longitude: "-102.2913"
					}
				}
			};
			salepoints.push(salepoint);
		};
		console.log(salepoints);
		self.delegate.setSalePoints(salepoints);
	};
};
PointsService.prototype = new Service();