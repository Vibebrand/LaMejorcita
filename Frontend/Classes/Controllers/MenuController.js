function MenuController (argument) {
	var self = this;
	var pageHashs = ['/Stocks', '/POS' , '/Sellers', '/Sales', '/Products'];
	this.viewDidLoad = function(){
		var options = ['Bodegas', 'Puntos de venta', 'Vendedores','Ventas', 'Products'];
		for (var i = 0; i < options.length; i++)
			createOptionItem.call(self,options[i], i);
		self.enableEvents();
	};
	function createOptionItem (value, id){
		var li = $('<li class="option-item"></li>');
		self.view.addSubview(li);
		li.data('href', '#'+pageHashs[id]);
		li.data('id', id);
		li.text(value);
	};
	this.changeOption = function(index){
		var options = self.view.container().find('li.option-item');
		options.removeClass('selected');
		$(options[index]).addClass('selected');
		$.cookie('lamejorcita.option', index);
	};
	//Events
	function onClickOption(){
		self.changeOption($(this).data('id'));
		self.delegate.changePage($(this).data('href'));
		if(!$(this).hasClass('selected'))
			self.delegate.disableEvents();
	};
	//Enable Disable
	this.enableEvents = function(){
		var options = this.view.container().find('li.option-item');
		options.unbind('click');
		options.bind('click', onClickOption);
	};
	this.disableEvents = function(){
		var options = this.view.container().find('li.option-item');
		options.unbind('click');
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