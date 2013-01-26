AdditionController.prototype = new ViewController();
AdditionController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('addition-container');
};
function  AdditionController(){
	var self = this;
	self.page = "Stock"
	this.viewDidLoad = function(){
		var viewCall = self['load'+self.data.kind.toCapitalize()+'View'];
		if(typeof viewCall == "function") viewCall.call(self);
		self.delegate.getStocksforAddition();
		self.delegate.getProductsforAddition();
		self.delegate.enableAllEvents();
		
	};
	this.loadBatchView = function(){
		var batchContainer = self.view.container();
		batchContainer.empty();
		createField({
			field: 'stock-input',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'selector', value:''}],
			container: batchContainer,
			tagname: 'div'
		});
		createField({
			field: 'notes-input',
			title: {classname: 'title', value: 'Notas'}, 
			value: [{classname: 'value', value:''}],
			container: batchContainer,
			tagname: 'textarea'
		});
	};
	function createField(options){
		var options = $.extend({},{
			field: 'field', 
			title: {classname: 'title', value: ''}, 
			value: [{classname: 'value', value: ''}], 
			container: $('<div></div>'),
			tagname: 'span'
		},options);
		var field =  $('<div></div>');
		var title = $('<h3></h3>');
		options.container.append(field);
		field.append(title);
		field.attr('class', options.field);
		title.attr('class', options.title.classname);
		title.text(options.title.value);
		for (var i = 0; i < options.value.length; i++) {
			var value =  $('<'+options.tagname+'></'+options.tagname+'>');
			field.append(value);
			value.attr('class', options.value[i].classname);
			value.text(options.value[i].value);
		};
	};
	this.setStocksforAddition = function(stocks){
		var stocksData      = [];
		var container = self.view.container();
		var selector  = container.find('.stock-input .selector');
		for (var i = 0; i < stocks.length; i++) {
			stocksData.push({
				id		: stocks[i]._id,
				value 	: stocks[i].businessName,
				data	: stocks[i]._id
			});
		};
		selector.customDropdown({
			placeholder : 'Elegir Bodega',
			options 	: stocksData,
			optionList	: 'selector-options',
			optionItem	: 'selector-option',
		});
	};
	this.setProductsforAddition = function(products){
		var data  = [];
		for (var i = 0; i < products.length; i++) {
			data.push({
				id		: products[i]._id,
				value 	: products[i].name,
				data	: products[i]._id
			});
		};
		self.products = data;
	};
	AdditionController.prototype._init_.call(this);
};