Importer.importfile('Classes/Services/TextValidationService.js');
AdditionController.prototype = new ViewController();
AdditionController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('addition-container');
};
function  AdditionController(){
	var stocksData;
	var products;
	var self        = this;
	var validations = new TextValidationService();
	self.data;
	this.messages = null;
	this.viewDidLoad = function(){
		var viewCall = self['load'+self.data.kind.toCapitalize()+'View'];
		var methodCall = self['prepare'+self.data.method.toCapitalize()+self.data.kind.toCapitalize()];
		if(typeof viewCall == "function") viewCall.call(self);
		if(typeof methodCall == "function")setTimeout(methodCall, 50);
	};
	//Batch
	this.prepareInsertBatch = function(){
		if(typeof stocksData  != "undefined" && typeof productsData != "undefined" ){
			createBatchItem();
			self.delegate.enableAllEvents();
		}else
			setTimeout(arguments.callee, 50);
	};
	this.loadBatchView = function(){
		var batchContainer = self.view.container();
		var addBatchBtn  = $('<button class="addBatch-button">+</button>');
		var batchesInput = $('<div class="batches-input"></div>');
		var batchlist = $('<ul class="batch-list"></ul>');
		var submitBtn = $('<button class="send-button">Enviar</button>');
		batchContainer.empty();
		createField({
			field: 'stock-input',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'selector', value:''}],
			container: batchContainer,
			tagname: 'div'
		});
		batchContainer.append(batchesInput);
		createField({
			field: 'notes-input',
			title: {classname: 'title', value: 'Notas'}, 
			value: [{classname: 'value', value:''}],
			container: batchContainer,
			tagname: 'textarea'
		});
		batchesInput.append(batchlist);
		batchesInput.append(addBatchBtn);
		batchContainer.append(submitBtn);
		addBatchBtn.bind('click', createBatchItem);
		self.delegate.getStocksforAddition();
		self.delegate.getProductsforAddition();
	};
	//Creation
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
	function createBatchItem(){
		var batchContainer = self.view.container();
		var batchlist = batchContainer.find('.batch-list');
		if(batchlist.find('li .product-selector').length  < productsData.length){
			var today = new Date();
			var batchItem = $('<li class="batch-item"></li>');
			var productSelector = $('<div class="product-selector"></div>');
			var quantity = $('<input class="quantity" placeholder="Cantidad"/>');
			var expirationDate = $('<input placeholder="Fecha de caducidad" class="expiration"/>');
			var deleteBtn = $('<button class="deleteBatch-button">-</button>');

			batchlist.append(batchItem);
			batchItem.append(productSelector);
			batchItem.append(expirationDate);
			batchItem.append(quantity);
			batchItem.append(deleteBtn);

			expirationDate.datepicker({
				yearRange: '1990:'+today.getFullYear,
				changeMonth: true,
				changeYear: true ,
				dateFormat: "yy/mm/dd"
			});
			productSelector.customDropdown({
				placeholder : 'Elegir productos',
				options 	: productsData,
				optionList	: 'selector-options',
				optionItem	: 'selector-option',
			});
			deleteBtn.bind('click', deleteBatchList);

			batchItem.find('input, textarea').bind('lamejorcita.focusin', onFocusIn);
		};
	};
	function deleteBatchList(){
		var batchItem = $(this).parents('li');
		batchItem.remove();
	};
	//Data
	this.setStocksforAddition = function(stocks){
		stocksData      = [];
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
		productsData  = [];
		for (var i = 0; i < products.length; i++) {
			productsData.push({
				id		: products[i]._id,
				value 	: products[i].name,
				data	: products[i]._id
			});
		};
	};
	this.createBatchJson = function(){
		var container    = self.view.container();
		var batchItems = container.find('.batch-list .batch-item');
		var batchData ={
			"stockId"	  : container.find('.stock-input .selected-item').data('customdropdown.data'),
			"observations": $.trim(container.find('.notes-input .value').val()),
			"batches"	  : []
		};
		for (var i = 0; i < batchItems.length; i++) {
			var batchItem  =  $(batchItems[i]);
			var batch = {
				productId	  : batchItem.find('.product-selector .selected-item').data('customdropdown.data'),
				expirationDate: $.trim(batchItem.find('.expiration').val()),
				count		  : $.trim(batchItem.find('.quantity').val())
			};
			batchData.batches.push(batch);
		};
		return JSON.stringify(batchData);
	};
	//Events
	function onClickSend(){
		var jsonCall = self['create'+self.data.kind.toCapitalize()+'Json'];
		if(validateBatch()){
			var jsonData ="";
			if(typeof jsonCall == "function")
				jsonData = jsonCall.call(self);
			self.delegate.addData(self.data.kind.toCapitalize(), {data: jsonData});
		};
	};
	function onFocusIn(){
		var input = $(this);
		var container = $(this).parents('*[class$="-input"]');
		container.find('.error-message').remove();
	};
	//Validation
	function validateBatch(){
		var count = 0;
		var container = self.view.container();
		var stockItem = container.find('.stock-input .selected-item');
		var notesInput = container.find('.notes-input .value');
		if(!validateBatchList())
			count++;
		if(typeof stockItem.data('customdropdown.data') == "undefined"){
			self.messages.createMessage.call(container.find('.stock-input'), {
				message:'Por favor seleccione una bodega.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(notesInput.val(), null, false)){
			self.messages.createMessage.call(notesInput.parents('.notes-input'), {
				message:'Por favor ingrese una nota.',
				className: 'error-message'
			});
			count++;
		};
		return count < 1;
	};
	function validateBatchList(){
		var container = self.view.container();
		var batchItems = container.find('.batch-list .batch-item');
		var valid = true;
		for (var i = 0; i < batchItems.length; i++) {
			var batchItem  =  $(batchItems[i]);
			var product    = batchItem.find('.product-selector .selected-item').data('customdropdown.data')
			var expiration = batchItem.find('.expiration').attr('value');
			var quantity = batchItem.find('.quantity').attr('value');
			var test1 = validations.validateDate(expiration, false);
			var test2 = validations.validateWithPattern(quantity, new RegExp("^[0-9]+$"), false);
			if(!test1 || !test2 || typeof product == "undefined"){
				self.messages.createMessage.call(batchItem , {
					message:'Datos no validos, por favor ingrese los datos correctos del lote.',
					className: 'error-message'
				});
				valid = false;
			};
		};
		return valid;
	};
	//Enable Disable
	this.enableEvents = function(){
		var container = self.view.container();
		var submitBtn = container.find('.send-button');
		var inputs = container.find('input, textarea');
		submitBtn.unbind('click');
		inputs.unbind('focusin.lamejorcita');
		submitBtn.bind('click', onClickSend);
		inputs.bind('focusin.lamejorcita', onFocusIn);
	};
	this.disableEvents = function(){
		var container = self.view.container();
		var submitBtn = container.find('.send-button');
		var inputs = container.find('inpus, textarea');
		submitBtn.unbind('click');
		inputs.unbind('focusin.lamejorcita');
	};
	AdditionController.prototype._init_.call(this);
};