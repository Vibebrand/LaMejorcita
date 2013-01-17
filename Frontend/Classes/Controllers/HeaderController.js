function HeaderController(){
	function HeaderController(){
		var self      = this;
		this.delegate = null;
		this.view.setClass('header-wrapper');


	};
	HeaderController.prototype = new ViewController();
	return new HeaderController();
}
