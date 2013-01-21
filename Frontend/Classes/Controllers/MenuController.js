function MenuController (argument) {
	var self = this;
	var pageHashs = ['/Stocks', '/Points' , '/Sellers', '/Sales', '/Distribution'];
	this.viewDidLoad = function(){
		var options = ['Bodegas', 'Puntos de venta', 'Vendedores','Ventas', 'Distribución'];
		for (var i = 0; i < options.length; i++){
			var classname = "";
			if(!$.cookie('lamejorcita.option') && i === 0)
				classname  = "selected";

			if(Number($.cookie("lamejorcita.option")) === i)
				classname  = "selected";
			
			createOptionItem.call(self,options[i], i, classname);
		};
		self.enableEvents();
	};
	function createOptionItem (value, id, classname){
		var li = $('<li class="option-item"></li>');
		self.view.addSubview(li);
		li.data('href', '#'+pageHashs[id]);
		li.data('id', id);
		li.addClass(classname)
		li.text(value);
	};
	//Events
	function onClickOption(){
		self.view.container().find('li.option-item').removeClass('selected');
		$(this).addClass('selected');
		$.cookie('lamejorcita.option', $(this).data('id'));
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