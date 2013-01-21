function POSService (argument) {
	var self = this;
	this.searchPOS = function(searchData){
		console.log(searchData);
		var posData = [];
		for (var i = 0; i < 15; i++) {
			var pos = {
				_id: "sdfadsasalepoint"+i,
				address: {
					street: "Calle "+i,
					district: "Colonia "+i,
					intNum: "",
					extNum: String(i+1)
				},
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
					serial : String("afsdll0132fridge"+i).toUpperCase(),
					temperature: "-10 C",
					status: true
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
			posData.push(pos);
		};
		console.log(posData);
		self.delegate.setPOSData(posData);
	};
};
POSService.prototype = new Service();