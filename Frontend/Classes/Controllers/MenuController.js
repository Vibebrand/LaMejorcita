MenuController.prototype = new ViewController();
MenuController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var list = $('<nav></nav>');
	this.view.replaceContainerWith(list);
	this.view.setClass('menu-list');
};
function MenuController (argument) {
	var self = this;
	var pageHashs = ['/Stocks', '/POS' , '/Sellers', '/Sales', '/Products', '/Users'];
	this.viewDidLoad = function(){
		var options = ['Bodegas', 'Puntos de venta', 'Vendedores','Ventas', 'Productos', 'Usuarios'];
		for (var i = 0; i < options.length; i++)
			createOptionItem.call(self,options[i], i);
		self.enableEvents();
	};
	function createOptionItem (value, id){
		var ref = $('<a class="option-item"></a>');
		self.view.addSubview(ref);
		ref.data('href', '#'+pageHashs[id]);
		ref.data('id', id);
		ref.text(value);
	};
	this.changeOption = function(index){
		var options = self.view.container().find('a.option-item');
		options.removeClass('selected');
		$(options[index]).addClass('selected');
		$.cookie('lamejorcita.option', index);
	};
	this.triggerOption = function(index){
		var options = self.view.container().find('a.option-item');
		$(options[index]).trigger('click');
	};
	//Events
	function onClickOption(){
		if(!$(this).hasClass('selected')){
			self.delegate.disableEvents();
			self.delegate.deleteSearch();
		};
		self.changeOption($(this).data('id'));
		self.delegate.changePage($(this).data('href'));
	};
	//Enable Disable
	this.enableEvents = function(){
		var options = this.view.container().find('a.option-item');
		options.unbind('click');
		options.bind('click', onClickOption);
	};
	this.disableEvents = function(){
		var options = this.view.container().find('a.option-item');
		options.unbind('click');
	};
	MenuController.prototype._init_.call(this);
};