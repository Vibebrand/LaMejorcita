function StockService(){
	var self = this;
	this.searchStocks = function(searchData){
		var stocks = [];
		for (var i = 0; i < 15; i++) {

			var stock = {
				_id			: "safdsafdsa0fd"+i,
				name        :"Bodega "+i,
				businessName:"Negocio "+i,
				phone      	:"97778"+i,
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
		console.log(stocks);
		self.delegate.setStocks(stocks);
	};
	this.searchProducts = function(searchData){
		console.log(searchData);
		var products = [];
		for (var i = 0; i < 5; i++) {
			var product = {
				_id 			: "sadfdsadfprod"+i,
				name 			: "Producto"+i,
				salePrice 		: 15.0,
				count			: 3900,
				registationDate :"2013/01/13"
			};
			products.push(product);
		};
		console.log(products);
		self.delegate.setProducts(products);
	};
	this.getStockDetail = function(stockId, callbacks){
		var date = new Date();
		var stock = {
			_id			: "safdsafdsa0fd",
			name        :"Bodega "+date.getHours() +" "+date.getMinutes()+" "+date.getSeconds(),
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
		self.callsHandler.makeCallbacks({
						calls: callbacks.successCall, 
						params: stock , 
						handlers: [self, self.delegate]
					});
	};
	this.getProductDetail = function(productId, callbacks){
		console.log(productId);
		var date = new Date();
		var product = {
			_id 			: "sadfdsadfprod0",
			name 			: "Producto prueba "+date.getHours() +":"+date.getMinutes()+":"+date.getSeconds(),
			salePrice 		: 15.0,
			count			: 3900,
			registationDate :"2013/01/13"
		};
		console.log(product);
		self.callsHandler.makeCallbacks({
						calls: callbacks.successCall, 
						params: product , 
						handlers: [self, self.delegate]
					});
	};
	this.searchBatches = function(searchData, callbacks){
		console.log(searchData);
		var date = new Date();
		var product = {
			_id 			: "sadfdsadfprod0",
			name 			: "Producto prueba "+date.getHours() +":"+date.getMinutes()+":"+date.getSeconds(),
			salePrice 		: 15.0,
			batches:{
				"2013/05/01": 1500,
				"2013/05/02": 1200,
				"2013/05/03": 1200,
				"2013/05/04": 1200
			}
		};
		self.delegate.setBatches(product.batches);
		self.delegate.setProductDetail(product);
	};
	//Edition Insertion
	this.addBatch = function(dataToSend){
		console.log(dataToSend);
		self.delegate.successfulAddition();
	};
	this.addProduct = function(dataToSend){
		console.log(dataToSend);
		self.delegate.successfulProductAddition();
	};
	//Deletion
	this.deleteBatch = function(deleteData){
		console.log('Batch');
		console.log(deleteData);
		self.delegate.successfulRemoval();
		self.delegate.enableEvents();
	};
	this.deleteProduct = function(deleteData){
		console.log('Product');
		console.log(deleteData);
		self.delegate.successfulRemoval();
		self.delegate.enableEvents();
	};
	//Additional data
	this.getStocksforAddition= function(){
		var stocks = [];
		for (var i = 0; i < 15; i++) {
			var stock = {_id: "safdsafdsa0fd"+i, name:"Bodega "+i, businessName:"Negocio "+i};
			stocks.push(stock)
		};
		self.delegate.setStocksforAddition(stocks);
	};
	this.getProductsforAddition= function(){
		var products = [];
		for (var i = 0; i < 5; i++) {
			var product = {_id: "sadfdsadfprod"+i, name: "Producto"+i};
			products.push(product);
		};
		self.delegate.setProductsforAddition(products);
	};
};
StockService.prototype = new Service();