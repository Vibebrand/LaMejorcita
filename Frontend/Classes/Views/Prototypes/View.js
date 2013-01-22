
View.prototype._init_ = function(){
	
};
function View () {

	var container = $('<div></div>');
	var removing;
	self.controller = null;

	this.addSubview = function(aView) {
		if(typeof aView != "undefined" && typeof aView.addSubview != "undefined")
			this.container().append(aView.container());
		if(typeof aView.find != "undefined")
			this.container().append(aView);
	};
	this.appendToView = function(aView) {
		addView.call(this,aView);
	};
	this.removeView = function() {
		container.detach();
	};
	this.setClass = function(classname) {
		if(typeof classname == "string")
			this.container().attr('class' , classname);
	};
	this.container = function() {
		return container;
	};
	function addView(aView){
		if(this.container().parent().length < 1){
			if(typeof aView != "undefined" && typeof aView.addSubview != "undefined")
				aView.container().append(this.container());
			if(typeof aView.find != "undefined")
				aView.append(this.container());
			this.controller.viewDidLoad();
		};
	};
	this.replaceContainerWith = function(aView){
		if(typeof aView.find != "undefined"){
			container.replaceWith(aView);
			container = aView;
		}
	};
	View.prototype._init_.call(this);
};