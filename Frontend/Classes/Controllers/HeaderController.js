function HeaderController(){
	function HeaderController(){
		var self = this;
		this.view.setClass('header-section');

	}
	HeaderController.prototype = new ViewController();
	return new HeaderController();
}
