function View () {
	var container = $('<div></div>');
	this.addSubview = function(aView) {
		if(typeof aView != "undefined" && aView.prototype == View)
			this.container().append(aView.container());
		if(typeof aView.find != "undefined")
			this.container().append(aView);
	};
	this.addParentView = function(aView) {
		if(!this.container().parent()){
			if(typeof aView != "undefined" && aView.prototype == View)
				aView.container().append(this.container());
			if(typeof aView.find != "undefined")
				aView.append(this.container());
		};
	}
	this.setClass = function(classname) {
		if(typeof classname == "string")
			this.container().attr('class' , classname);
	};
	this.container = function() {
		return container;
	};
}