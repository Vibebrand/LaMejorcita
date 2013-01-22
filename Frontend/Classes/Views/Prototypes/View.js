
View.prototype._init_ = function(){
	
};
function View () {

	var container = $('<div></div>');
	self.controller = null;

	this.addSubview = function(aView) {
		if(typeof aView != "undefined" && typeof aView.addSubview != "undefined")
			this.container().append(aView.container());
		if(typeof aView.find != "undefined")
			this.container().append(aView);
	};
	this.appendToView = function(aView) {
		if(this.container().parent().length < 1){
			if(typeof aView != "undefined" && typeof aView.addSubview != "undefined")
				aView.container().append(this.container());
			if(typeof aView.find != "undefined")
				aView.append(this.container());
			this.controller.viewDidLoad();
		};
	};
	this.removeView = function() {
		container.remove();
	};
	this.setClass = function(classname) {
		if(typeof classname == "string")
			this.container().attr('class' , classname);
	};
	this.container = function() {
		return container;
	};
	this.replaceContainerWith = function(aView){
		if(typeof aView.find != "undefined"){
			container.replaceWith(aView);
			container = aView;
		}
	};
	View.prototype._init_.call(this);
};