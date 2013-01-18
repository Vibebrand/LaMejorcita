function MenuController (argument) {
	var self = this;
	var pageHashs = ['/Stocks', '/Points' , '/Sellers', '/Sales'];
	this.viewDidLoad = function(){
		var options = ['Bodegas', 'Puntos de venta', 'Vendedores','Ventas'];
		for (var i = 0; i < options.length; i++)
			createOptionItem.call(self,options[i], i);
		self.enableEvents();
	};
	function createOptionItem (value, id){
		var li = $('<li class="option-item"></li>');
		self.view.addSubview(li);
		li.data('href', '#'+pageHashs[id]);
		li.text(value);
	};
	//Events
	function onClickOption(){
		self.delegate.changePage($(this).data('href'));
	};
	//Enable Disable
	this.enableEvents = function(){
		var li = this.view.container().find('li.option-item');
		li.unbind('click');
		li.bind('click', onClickOption);
	};
	this.disableEvents = function(){
		var li = this.view.container().find('li.option-item');
		li.unbind('click');
	};
	MenuController.prototype._init_.call(this);
};
MenuController.prototype = new ViewController();
MenuController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var list = $('<ul></ul>');
	this.view.replaceContainerWith(list);
	this.view.setClass('menu-list');
};