function PointsService (argument) {
	var self = this;
	this.searchPoints = function(searchData){
		console.log(searchData);
	};
};
PointsService.prototype = new Service();