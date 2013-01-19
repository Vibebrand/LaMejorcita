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
					name: "Guy Fawkes"
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
				fridge: {
					status: true,
					temperature: 10
				},
				salePoint:{
					_id:"sadfdsafdpo"+i
				}
			};
			sales.push(sale);
		};
		console.log(sales);
	};
};
SalesService.prototype = new Service();