
function Login () {
	console.log(this);
	var self = this;
	Login.prototype._init_.call(this);
};
Login.prototype = new View();
Login.prototype._init_ = function(){
};