function StockService(){
	var self = this;
	this.searchStocks = function(searchData){
		$.ajax({
		  url: 'Mocks/Stocks.json',
		  type: 'GET',
		  dataType: 'json',
		  data: searchData,
		  complete: function(xhr, textStatus) {
		    //called when complete
		  },
		  success: function(data, textStatus, xhr) {
		    self.delegate.setStocks(data);
		  },
		  error: function(xhr, textStatus, errorThrown) {
		    //called when there is an error
		  }
		});
		
	};
};
StockService.prototype = new Service();