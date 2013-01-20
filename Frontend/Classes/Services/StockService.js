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
		console.log(searchData);
		var stocks = [];
		for (var i = 0; i < 15; i++) {
			var stock = {
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
				phone      	:"123456"+i
			};
			stocks.push(stock)
		};
		self.delegate.setStocks(stocks);
	};
};
StockService.prototype = new Service();