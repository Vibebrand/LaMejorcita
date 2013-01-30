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
					count: 3,
					amount: 45
				},
				geoposition: {
					latitude: "21.8818",
					longitude: "-102.2913"
				},
				seller: {
					_id:"asfdo90qwqewr"+i,
					name: "Sales Guy",
				},
				salepoint:{
					_id: "sdfadsasalepoint"+i,
					name: "Negocio",
					fridge: {
						serial : String("afsdll0132fridge"+i).toUpperCase(),
						temperature: -10,
						status: true
					}
				}
			};
			sales.push(sale);
		};
		console.log(sales);
		self.delegate.setTableData(sales);
	};
	this.getSaleDetail = function(saleId){
		var date = new Date();
		var sale = {
			_id: "_sdafsadfdsa00",
			date: "2013/01/01",
			time: "13:30:33",
			observations: "Observación "+date.getHours() +" "+date.getMinutes()+" "+date.getSeconds(),
			device: 'safdsafdevicesdf020',
			products:[
				{
					name 			: "Producto0",
					salePrice 		: 15.0,
					count			: 1
				},
				{
					name 			: "Producto1",
					salePrice 		: 15.0,
					count			: 1
				},
				{
					name 			: "Producto2",
					salePrice 		: 15.0,
					count			: 1
				}
			],
			geoposition: {
				latitude: "21.8818",
				longitude: "-102.2913"
			},
			seller: {
				_id:"asfdo90qwqewr0",
				name: "Sales Guy",
			},
			salepoint:{
				_id: "sdfadsasalepoint0",
				name: "Negocio",
				fridge: {
					serial : String("afsdll0132fridge0").toUpperCase(),
					temperature: -10,
					status: true
				}
			}
		};
		console.log(sale);
		self.delegate.setDetail(sale);
	};
};
SalesService.prototype = new Service();