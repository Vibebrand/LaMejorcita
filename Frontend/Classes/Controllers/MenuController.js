function MenuController (argument) {
	var self = this;
	var pageHashs = ['/Stocks', '/Poitns' , '/Sellers', '/Sales'];
	this.viewDidLoad = function(){
		var options = ['Bodegas', 'Puntos de venta', 'Vendedores','Ventas'];
		for (var i = 0; i < options.length; i++)
			createOptionItem.call(self,options[i], i);
	};
	function createOptionItem (value, id){
		var li = $('<li class="option-item"></li>');
		var link = $('<a></a>');
		li.append(link);
		self.view.addSubview(li);
		link.attr('href', '#'+pageHashs[id]);
		link.text(value);
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