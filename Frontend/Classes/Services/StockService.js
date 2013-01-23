function StockService(){
	var self = this;
	this.searchStocks = function(searchData){
		/*$.ajax({
		  url: 'Mocks/Stocks.json',
		  type: 'GET',
		  dataType: 'json',
		  data: searchData,
		  timeout: self.timelimit,
		  complete: function(xhr, textStatus) {
		    //called when complete
		  },
		  success: function(data, textStatus, xhr) {
		    self.delegate.setStocks(data);
		  },
		  error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		  }
		});*/
		//console.log(searchData);
		var stocks = [];
		for (var i = 0; i < 15; i++) {
			var stock = {
				_id			: "safdsafdsa0fd"+i,
				name        :"Bodega "+i,
				businessName:"Negocio "+i,
				phone      	:"123456"+i,
				maxSale: 1000,
				minSale: 50,
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
			};
			stocks.push(stock)
		};
		//console.log(stocks);
		self.delegate.setStocks(stocks);
	};
	this.getStockDetail = function(stockId){
		var stock = {
			_id			: "safdsafdsa0fd",
			name        :"Bodega ",
			businessName:"Negocio ",
			phone      	:"123456",
			maxSale: 1000,
			minSale: 50,
			address: {
				street: "Calle ",
				district: "Colonia ",
				intNum: "",
				extNum: 10
			},
			manager     :{
				_id	 : "asfdo90qwqewr1",
				name : "Guy Fawkes",
				curp : 'PIIG720116BV0',
				email: "faukes@mail.com"
			},
			geoposition: {
				latitude: "21.8818",
				longitude: "-102.2913"
			}
		};
		console.log(stock);
		self.delegate.setDetail(stock);
	};

	this.searchProducts = function(searchData){
		console.log(searchData);
		var products = [];
		for (var i = 0; i < 5; i++) {
			var product = {
				_id 			: "sadfdsadfprod"+i,
				name 			: "Producto"+i,
				salePrice 		: (8/(i+1))*10,
				count			: 15,
				registationDate :"2013/13/01"
			};
			products.push(product);
		};
		console.log(products);
		self.delegate.setProducts(products);
	};
};
StockService.prototype = new Service();