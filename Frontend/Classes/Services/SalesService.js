function SalesService (argument) {
	var self = this;
	this.searchSales = function(searchData){
		console.log(searchData);
		var sales = [];
		for (var i = 0; i < 15; i++){
			var sale = {
				_id: "_sdafsadfdsa0"+i,
				date: "2013/01/01",
				seller: {
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
				},
				observations: "Observación"+i,
				products:{
					products: [],
					count:5
				},
				geoposition: {
					latitude: "21.8818",
					longitude: "-102.2913"
				},
				salePoint:{
					_id: "sdfadsasalepoint"+i,
					district: "Colonia "+i,
					address: "Dirección "+i,
					joinDate: "2013/01/01",
					phone: "1234567",
					maxSaleNumber: 1000,
					minSaleNumber: 50,
					geoposition: {
						latitude: "21.8818",
						longitude: "-102.2913"
					},
					fridge: {
						serial : "afsdll0132fridge"+i,
						temperature: -10,
						status: true
					},
					manager:{
						_id:"asfdo90qwqewr"+i,
						name: "Guy Fawkes",
						curp: 'PIIG720116BV1',
						email: "faukes@mail.com"
					}
				}
			};
			sales.push(sale);
		};
		console.log(sales);
	};
};
SalesService.prototype = new Service();