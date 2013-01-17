function StockService(){
	var self = this;
	this.searchStocks = function(searchData){
		console.log(searchData);
	};
};
StockService.prototype = new Service();