function SalesService (argument) {
	var self = this;
	this.searchSales = function(searchData){
		console.log(searchData);
		var sales = [];
		for (var i = 0; i < 15; i++){
			var sale = {
				_id: "_sdafsadfdsa0"+i,
				date: "2013/01/01",
				time: "13:30:33",
				observations: "Observación"+i,
				device: 'safdsafdevicesdf'+i+'20',
				products:{
					products: [{},{},{},{},{}],
					amount:75
				},
				geoposition: {
					latitude: "21.8818",
					longitude: "-102.2913"
				},
				seller: {
					_id:"asfdo90qwqewr"+i,
					name: "Guy Fawkes",
					curp: 'PIIG720116BV1',
					stock:{
						_id			: "safdsafdsa0fd"+i,
						name        :"Bodega "+i,
						businessName:"Negocio "+i,
						phone      	:"123456"+i,
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
						geoposition: {
							latitude: "21.8818",
							longitude: "-102.2913"
						}
					}
				},
				salepoint:{
					_id: "sdfadsasalepoint"+i,
					district: "Colonia "+i,
					address: {
						street: "Calle "+i,
						district: "Colonia "+i,
						intNum: "",
						extNum: String(i+1)
					},
					joinDate: "2013/01/01",
					phone: "1234567",
					geoposition: {
						latitude: "21.8818",
						longitude: "-102.2913"
					},
					fridge: {
						serial : String("afsdll0132fridge"+i).toUpperCase(),
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
		self.delegate.setSales(sales);
	};
};
SalesService.prototype = new Service();