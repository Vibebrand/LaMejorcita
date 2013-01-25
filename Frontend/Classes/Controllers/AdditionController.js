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
	};
	this.loadBatchView = function(){
		var batchContainer = self.view.container();
		createField({
			field: 'stock',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'selector', value:''}],
			container: batchContainer,
			tagname: 'div'
		});
		createField({
			field: 'notes',
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
		console.log(options.container);
		
	};
	AdditionController.prototype._init_.call(this);
};