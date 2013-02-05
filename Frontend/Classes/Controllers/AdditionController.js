Importer.importfile('Classes/Services/TextValidationService.js');
AdditionController.prototype = new ViewController();
AdditionController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.view.setClass('addition-container');
};
function  AdditionController(){
	this.data;
	var stocksData;
	var usersData;
	var products;
	var editionData;
	var self         = this;
	var validations  = new TextValidationService();
	this.messages    = null;
	this.currentData = null;
	this.viewDidLoad = function(){
		var viewCall = self['load'+self.data.kind.toCapitalize()+'View'];
		var methodCall = self['prepare'+self.data.kind.toCapitalize()+self.data.method.toCapitalize()+'ion'];
		if(typeof viewCall == "function") viewCall.call(self);
		if(typeof methodCall == "function")setTimeout(methodCall, 0);
		self.delegate.updateMenuWithString(self.data.kind);
	};
	//Stock
	function loadStockView(){
		var container = self.view.container();
		container.empty();
		var submitBtn = $('<button class="send-button">Enviar</button>');
		var stockDiv = createField({
			field: 'stock-inputs',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'inputs', tag:'div'}],
			container: container
		});
		var address = createField({
			field: 'address-inputs',
			title: {classname: 'title', value: 'Dirección'}, 
			value: [{classname: 'inputs', tag:'div'}],
			container: container
		});
		createField({title: null ,field: 'name-input', container: stockDiv, value:[{placeholder:'Nombre del negocio'}]});
		createField({title: null ,field: 'minSale-input', container: stockDiv, value:[{placeholder:'Mínimo número de ventas'}]});
		createField({title: null ,field: 'maxSale-input', container: stockDiv, value:[{placeholder:'Máximo número de ventas'}]});

		createField({title: null ,field: 'street-input', 	container: address, value:[{placeholder:'Calle'}]});
		createField({title: null ,field: 'extNum-input', 	container: address, value:[{placeholder:'Número exterior'}]});
		createField({title: null ,field: 'intNum-input', 	container: address, value:[{placeholder:'Número interior'}]});
		createField({title: null ,field: 'district-input', container: address, value:[{placeholder:'Colonia'}]});

		createField({
			field: 'manager-input',
			title: {classname: 'title', value: 'Responsable'}, 
			value: [{tag: 'div', classname: 'selector', value:''}],
			container: container,
		});

		container.append(submitBtn);
		self.delegate.getUsersForAddition();
	};
	function prepareStockInsertion(){
		if(typeof usersData  != "undefined")
			self.delegate.enableAllEvents();
		else
			setTimeout(arguments.callee, 50);
	};
	function prepareStockEdition(){
		if(typeof usersData  != "undefined"){
			var callbacks = createEditionCalls();
			self.delegate.getDetail(self.data.kind, self.data.id, callbacks);
		}else
			setTimeout(arguments.callee, 50);
	};
	function setStockData(stock){
		var container  = self.view.container();
		var sname     = container.find('.name-input .value');
		var sstreet   = container.find('.street-input .value');
		var sextNum   = container.find('.extNum-input .value');
		var sintNum   = container.find('.intNum-input .value');
		var sdistrict = container.find('.district-input .value');
		var minSale   = container.find('.minSale-input .value');
		var maxSale   = container.find('.maxSale-input .value');
		var smanager  = container.find('.manager-input');
		sname.val(stock.name);
		sstreet.val(stock.address.street);
		sextNum.val(stock.address.extNum);
		sintNum.val(stock.address.intNum);
		sdistrict.val(stock.address.district);
		minSale.val(stock.minSale);
		maxSale.val(stock.maxSale);
		smanager.find('#'+stock.manager._id).trigger('click');
		self.delegate.enableAllEvents();
	};
	this.setUsersForAddition = function(users){
		usersData      = [];
		var container = self.view.container();
		var selector  = container.find('.manager-input .selector');
		for (var i = 0; i < users.length; i++) {
			usersData.push({
				id		: users[i]._id,
				value 	: users[i].name,
				data	: users[i]._id
			});
		};
		selector.customDropdown({
			placeholder : 'Elegir usuario',
			options 	: usersData,
			optionList	: 'selector-options',
			optionItem	: 'selector-option',
		});
	};
	//POS
	function loadPosView(){
		var container = self.view.container();
		var submitBtn = $('<button class="send-button">Enviar</button>');
		container.empty();
		var pos = createField({
			field: 'pos-inputs',
			title: {classname: 'title', value: 'Punto de venta'}, 
			value: [{classname: 'inputs', tag:'div', placeholder: ''}],
			container: container
		});
		var representative = createField({
			field: 'representative-inputs',
			title: {classname: 'title', value: 'Representante'}, 
			value: [{classname: 'inputs', tag:'div', placeholder: ''}],
			container: container
		});
		createField({
			field: 'stock-input',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'selector', value:'', tag:'div'}],
			container: container
		});
		var fridge = createField({
			field: 'fridge-inputs',
			title: {classname: 'title', value: 'Refrigerador'}, 
			value: [{classname: 'inputs', tag:'div', placeholder: ''}],
			container: container
		});
		var address = createField({
			field: 'address-inputs',
			title: {classname: 'title', value: 'Dirección'}, 
			value: [{classname: 'inputs', tag:'div', placeholder: ''}],
			container: container
		});
		createField({title: null ,field: 'name-input', 	container: representative, value:[{placeholder:'Nombre'}]});
		createField({title: null ,field: 'email-input', container: representative, value:[{placeholder:'Correo electrónico'}]});
		createField({title: null ,field: 'curp-input', container: representative, value:[{placeholder:'CURP'}]});

		createField({title: null ,field: 'name-input', 	container: pos, value:[{placeholder:'Nombre de negocio'}]});
		createField({title: null ,field: 'email-input', container: pos, value:[{placeholder:'Correo electrónico'}]});
		createField({title: null ,field: 'phone-input', container: pos, value:[{placeholder:'Teléfono'}]});

		createField({title: null ,field: 'serial-input', 	container: fridge, value:[{placeholder:'Serial'}]});

		createField({title: null ,field: 'street-input', 	container: address, value:[{placeholder:'Calle'}]});
		createField({title: null ,field: 'extNum-input', 	container: address, value:[{placeholder:'Número exterior'}]});
		createField({title: null ,field: 'intNum-input', 	container: address, value:[{placeholder:'Número interior'}]});
		createField({title: null ,field: 'district-input',  container: address, value:[{placeholder:'Colonia'}]});
		container.append(submitBtn);
		self.delegate.getStocksforAddition();
	};
	function preparePosInsertion(){
		if(typeof stocksData  != "undefined"){
			self.delegate.enableAllEvents();
		}else
			setTimeout(arguments.callee, 50);
	};
	function preparePosEdition(){
		if(typeof stocksData  != "undefined"){
			var callbacks = createEditionCalls();
			self.delegate.getDetail(self.data.kind, self.data.id, callbacks);
		}else
			setTimeout(arguments.callee, 50);
	};
	function setPosData(pos){
		var container = self.view.container();
		var pname     = container.find('.pos-inputs .name-input .value');
		var pemail    = container.find('.pos-inputs .email-input .value');
		var pphone    = container.find('.pos-inputs .phone-input .value');
		var rname     = container.find('.representative-inputs .name-input .value');
		var remail    = container.find('.representative-inputs .email-input .value');
		var rcurp     = container.find('.representative-inputs .curp-input .value');
		var serial    = container.find('.serial-input .value');
		var sdropdown = container.find('.stock-input');
		var street    = container.find('.street-input .value');
		var extNum    = container.find('.extNum-input .value');
		var intNum    = container.find('.intNum-input .value');
		var district  = container.find('.district-input .value');

		pname.val(pos.name);
		pemail.val(pos.email);
		pphone.val(pos.phone);
		rname.val(pos.representative.name);
		remail.val(pos.representative.email);
		rcurp.val(pos.representative.curp);
		serial.val(pos.fridge.serial);
		street.val(pos.address.street);
		extNum.val(pos.address.extNum);
		intNum.val(pos.address.intNum);
		district.val(pos.address.district);

		sdropdown.find('#'+pos.stock._id).trigger('click');
		self.delegate.enableAllEvents();
	};
	//Seller
	function loadSellerView(){
		var container = self.view.container();
		var submitBtn = $('<button class="send-button">Enviar</button>');
		container.empty();
		var sellerDiv = createField({
			field: 'seller-inputs',
			title: {classname: 'title', value: 'Vendedor'}, 
			value: [{classname: 'inputs', tag:'div'}],
			container: container
		});
		createField({
			field: 'stock-input',
			title: {classname: 'title', value: 'Bodega'}, 
			value: [{classname: 'selector', value:'', tag:'div'}],
			container: container
		});
		createField({title: null ,field: 'name-input', 	container: sellerDiv, value:[{placeholder:'Nombre'}]});
		createField({title: null ,field: 'curp-input', 	container: sellerDiv, value:[{placeholder:'CURP'}]});
		createField({title: null ,field: 'email-input', container: sellerDiv, value:[{placeholder:'Correo electrónico'}]});
		createField({title: null ,field: 'phone-input', container: sellerDiv, value:[{placeholder:'Teléfono'}]});
		createField({title: null ,field: 'device-input', container: sellerDiv, value:[{placeholder:'Código de dispositivo'}]});
		container.append(submitBtn);
		self.delegate.getStocksforAddition();
	};
	function prepareSellerInsertion(){
		if(typeof stocksData  != "undefined"){
			self.delegate.enableAllEvents();
		}else
			setTimeout(arguments.callee, 50);
	};
	function prepareSellerEdition(){
		if(typeof stocksData  != "undefined"){
			var callbacks = createEditionCalls();
			self.delegate.getDetail(self.data.kind, self.data.id, callbacks);
		}else
			setTimeout(arguments.callee, 50);
	};
	function setSellerData(seller){
		var container = self.view.container();
		var sname     = container.find('.name-input .value');
		var curp      = container.find('.curp-input .value');
		var email     = container.find('.email-input .value');
		var phone     = container.find('.phone-input .value');
		var device    = container.find('.device-input .value');
		var sdropdown = container.find('.stock-input');

		sname.val(seller.name);
		curp.val(seller.curp);
		email.val(seller.email);
		phone.val(seller.phone);
		device.val(seller.device);
		
		sdropdown.find('#'+seller.stock._id).trigger('click');
		self.delegate.enableAllEvents();
	};
	//User
	function loadUserView(){
		var container = self.view.container();
		var submitBtn = $('<button class="send-button">Enviar</button>');
		container.empty();

		var userInputs = createField({
			field: 'user-inputs',
			title: {classname: 'title', value: 'Datos de usuario'}, 
			value: [{classname: 'inputs', tag:'div', placeholder: ''}],
			container: container
		});
		createField({title: null ,field: 'name-input', 	container: userInputs, value:[{placeholder:'Nombre(s)'}]});
		createField({title: null ,field: 'surname-input', 	container: userInputs, value:[{placeholder:'Apellido(s)'}]});
		createField({title: null ,field: 'curp-input', 	container: userInputs, value:[{placeholder:'CURP'}]});
		createField({title: null ,field: 'email-input', container: userInputs, value:[{placeholder:'Correo electrónico'}]});
		createField({title: null ,field: 'phone-input', container: userInputs, value:[{placeholder:'Teléfono'}]});
		createField({title: null ,field: 'password-input', container: userInputs, value:[{placeholder:'Escriba la contraseña', type: 'password'}]});
		createField({title: null ,field: 'repassword-input', container: userInputs, value:[{placeholder:'Repita la contraseña', type: 'password'}]});
		container.append(submitBtn);
	};
	this.prepareUserInsertion = function(){
		self.delegate.enableAllEvents();
	};
	this.prepareUserEdition = function(){
		var callbacks = createEditionCalls();
		self.delegate.getDetail(self.data.kind, self.data.id, callbacks);
	};
	this.setUserData = function(user){
		self.currentData = user;
		var container  = self.view.container();
		var uname      = container.find('.name-input .value');
		var usurname   = container.find('.surname-input .value');
		var ucurp      = container.find('.curp-input .value');
		var uemail     = container.find('.email-input .value');
		var uphone     = container.find('.phone-input .value');
		var password   = container.find('.password-input .value');
		var repassword = container.find('.repassword-input .value');

		usurname.parents('.surname-input').hide();
		uname.val(user.name);
		ucurp.val(user.curp);
		uemail.val(user.email);
		uphone.val(user.phone);
		password.val(user.password);
		repassword.val(user.password);
		
		self.delegate.enableAllEvents();
	};
	//Products
	function editProduct(){
		var callbacks = createEditionCalls();
		self.delegate.getDetail(self.data.kind, self.data.id, callbacks);
	};
	function loadProductView(){
		var productForm = $('<div class="product-form"></div>');
		var acceptBtn 	= $('<button class="accept">Aceptar</button>');
		var cancelBtn 	= $('<button class="cancel">Cancelar</button>');
		$('#mask').show();
		self.messages.addViewAsMessage.call($('body'),{
			view 		: productForm,
			className	: 'product-modalbox',
			animation	: 'fadeIn',
			speed		: 'fast'
		});
		createField({
			field: 'name-input',
			title: {classname: 'title', value: 'Nombre'}, 
			value: [{classname: 'value', value:''}],
			tagname: 'input',
			container: productForm
		});
		createField({
			field: 'salePrice-input',
			title: {classname: 'title', value: 'Precio de venta'}, 
			value: [{classname: 'value', value:''}],
			tagname: 'input',
			container: productForm
		});
		productForm.append(acceptBtn);
		productForm.append(cancelBtn);

		acceptBtn.bind('click', onClickSend);
		cancelBtn.bind('click', onClickCancel);
		productForm.find('input').bind('focusin', onFocusIn);
	};
	function setProductData(product){
		var productForm = $('.product-modalbox .product-form');
		var nameInput = productForm.find('.name-input .value');
		var salePriceInput = productForm.find('.salePrice-input .value');
		nameInput.val(product.name);
		salePriceInput.val(product.salePrice.toFixed(2));
	};
	this.successfulProductAddition = function(){
		var data = typeof self.data == "undefined"? '': self.data;
		var form  = $('.product-form');
		var cancelBtn = form.find('button.cancel');
		var message = data.method == "insert"? 'La información se guardo correctamente.': 'La información se edito correctamente.';
		self.messages.createMessage.call(form, {
			message  : message,
			className: 'success-message'
		});
		setTimeout(function(){
			cancelBtn.trigger('click');
			setTimeout(self.delegate.reloadTable,50);
		},1500);
	};
	this.failedProductAddition = function(){
		var form  = $('.product-form');
		var acceptBtn = form.find('button.accept');
		self.messages.createMessage.call(form, {
			message:'El producto se guardo correctamente.',
			className: 'success-message',
			delay:1500
		});
		acceptBtn.bind('click', onClickSend);
	};
	//Batch
	this.prepareBatchInsertion = function(){
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
			value: [{classname: 'selector', value:'', tag:'div'}],
			container: container
		});
		batchContainer.append(batchesInput);
		createField({
			field: 'notes-input',
			title: {classname: 'title', value: 'Notas', tag: 'textarea'}, 
			value: [{classname: 'value', value:''}],
			container: batchContainer
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
		var options = $.extend(true,{},{
			field: 'field', 
			title: {classname: 'title', value: '', tag:'h3'}, 
			value: [{classname: 'value', value: '', placeholder:'' ,tag:'input', type: 'text'}], 
			container: $('<div></div>'),
		},options);
		var field  =  $('<div></div>');
		var values = [];                                                
		if (options.title != null){
			var title = $('<'+options.title.tag+'></'+options.title.tag+'>');
			title.attr('class', options.title.classname);
			title.text(options.title.value);
			field.append(title);
		};
		options.container.append(field);
		field.attr('class', options.field);
		for (var i = 0; i < options.value.length; i++) {
			var valueData = options.value[i];
			var type = valueData.tag == "input"? 'type="'+valueData.type+'"': '';
			var value =  $('<'+valueData.tag+' '+type+'></'+valueData.tag+'>');
			values.push(value);
			field.append(value);
			value.attr('class', valueData.classname);
			if(valueData.tag == "input"){
				value.val(valueData.value);
				value.attr('placeholder', valueData.placeholder);
			}else
				value.text(valueData.value);
		};
		return values.length > 1? values: values[0];
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
	this.setEditionData = function(editData){
		var loadCall = self['load'+self.data.kind.toCapitalize()+'View'];
		var setCall = self['set'+self.data.kind.toCapitalize()+'Data']
		if(self.data.kind.toLowerCase() == "product")
			if(typeof loadCall == "function") loadCall.call(self);
		if(typeof setCall  == "function") setCall.call(self, editData);
	};
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
	function createBatchJson(){
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
	function createProductJson(){
		var form      = $('.product-form');
		var pname     = $.trim(form.find('.name-input .value').val());
		var salePrice = $.trim(form.find('.salePrice-input .value').val()).replace('$','');
		var productData = {
			name 	 : pname,
			salePrice: salePrice
		};
		return JSON.stringify(productData);
	};
	function createUserJson(){
		var container    = self.view.container();
		var userData ={
			name 		: $.trim(container.find('.name-input .value').val())+' '+$.trim(container.find('.surname-input .value').val()),
			curp 		: $.trim(container.find('.curp-input .value').val()),
			email 		: $.trim(container.find('.email-input .value').val()),
			phone 		: $.trim(container.find('.phone-input .value').val()),
			password 	: $.trim(container.find('.password-input .value').val())
		};
		return JSON.stringify(userData);
	};
	function createEditionCalls(){
		var callbacks = {};
		var failCalls = [];
		var successCalls = [];
		successCalls.push({call: 'setEditionData'});
		failCalls.push({
			call: 'createGlobalMessage',
			params: {
				message:'No se pudieron obtener la información para editar.',
				className: 'error-message',
				delay: 2500
			}
		});
		callbacks.successCall = successCalls;
		callbacks.failCall = failCalls;
		return callbacks;
	};
	function createStockJson(){
		var container  = self.view.container();
		var newStock =
		{
			name     : container.find('.name-input .value').val(),
			manager  : container.find('.manager-input .selected-item').data('customdropdown.data'),
			address: {
				street   : container.find('.street-input .value').val(),
				extNum   : container.find('.extNum-input .value').val(),
				intNum   : container.find('.intNum-input .value').val(),
				district : container.find('.district-input .value').val()
			}
		};
		return JSON.stringify(newStock);
	};
	function createPosJson(){
		var container  = self.view.container();
		var newPos ={
			name	: $.trim(container.find('.pos-inputs .name-input .value').val()),
			email	: $.trim(container.find('.pos-inputs .email-input .value').val()),
			phone	: $.trim(container.find('.pos-inputs .phone-input .value').val()),
			representative:{
				name	: $.trim(container.find('.representative-inputs .name-input .value').val()),
				email	: $.trim(container.find('.representative-inputs .email-input .value').val()),
				curp	: $.trim(container.find('.representative-inputs .curp-input .value').val())
			},
			fridge:{
				serial: $.trim(container.find('.serial-input .value').val())
			},
			address: {
				street   : $.trim(container.find('.street-input .value').val()),
				extNum   : $.trim(container.find('.extNum-input .value').val()),
				intNum   : $.trim(container.find('.intNum-input .value').val()),
				district : $.trim(container.find('.district-input .value').val())
			},
			stock: container.find('.stock-input .selected-item').data('customdropdown.data')
		};
		return JSON.stringify(newPos);
	};
	function createSellerJson(){
		var container  = self.view.container();
		var newSeller = {
			name	: $.trim(container.find('.name-input .value').val()),
			email	: $.trim(container.find('.email-input .value').val()),
			phone	: $.trim(container.find('.phone-input .value').val()),
			curp	: $.trim(container.find('.curp-input .value').val()),
			stock: container.find('.stock-input .selected-item').data('customdropdown.data')
		};
		return JSON.stringify(newSeller);
	};
	//Events
	function onClickSend(){
		var jsonCall = self['create'+self.data.kind.toCapitalize()+'Json'];
		var validationCall = self['validate'+self.data.kind.toCapitalize()];
		if(typeof validationCall != "undefined" && validationCall.call(self)){
			var jsonData ="";
			var dataToSend = {};
			if(typeof jsonCall == "function")
				jsonData = jsonCall.call(self);
			if(typeof self.data != "undefined" && typeof self.data.id == "string")
				dataToSend.id = self.data.id;
			dataToSend.data = jsonData;
			self.delegate.addData(self.data.kind.toCapitalize(), dataToSend);
		};
	};
	function onFocusIn(){
		var input = $(this);
		var container = $(this).parents('*[class$="-input"]');
		container.find('.error-message').remove();
	};
	function onClickCancel(){
		var element = $(this).parents('.product-modalbox');
		element.fadeOut('fast', element.remove);
		$('#mask').hide();
		self.delegate.enableAllEvents();
	};
	//Validation
	function validateStock(){
		var count      = 0;
		var container  = self.view.container();
		var sname     = container.find('.name-input .value');
		var minSale   = container.find('.minSale-input .value');
		var maxSale   = container.find('.maxSale-input .value');
		var smanager  = container.find('.manager-input');

		if(typeof smanager.find('.selected-item').data('customdropdown.data') == "undefined"){
			count++;
			self.messages.createMessage.call(smanager , {
				message:'Por favor seleccione un representante de bodega.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(sname.val(), null, false)){
			count++;
			self.messages.createMessage.call(sname.parents('*[class$="input"]') , {
				message:'Por favor ingrese un nombre de bodega válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(maxSale.val(), new RegExp("^[0-9]+$"), false)){
			count++;
			self.messages.createMessage.call(maxSale.parents('*[class$="input"]') , {
				message:'Por favor ingrese un número de ventas máximo válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(minSale.val(), new RegExp("^[0-9]+$"), false)){
			count++;
			self.messages.createMessage.call(minSale.parents('*[class$="input"]') , {
				message:'Por favor ingrese un número de ventas mínimo válido.',
				className: 'error-message'
			});
		};
		if(!validateAddress())
			count++;
		return count < 1;
	};
	function validateUser(){
		var count      = 0;
		var container  = self.view.container();
		var uname      = container.find('.name-input .value');
		var usurname   = container.find('.surname-input .value');
		var ucurp      = container.find('.curp-input .value');
		var uemail     = container.find('.email-input .value');
		var uphone     = container.find('.phone-input .value');
		var password   = container.find('.password-input .value');
		var repassword = container.find('.repassword-input .value');
		if(!validations.validateWithPattern(uname.val(), null, false)){
			self.messages.createMessage.call(uname.parents('.name-input'), {
				message:'Nombre no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(usurname.val(), null, true)){
			self.messages.createMessage.call(usurname.parents('.surname-input'), {
				message:'Apellido no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateCurp(ucurp.val(), false)){
			self.messages.createMessage.call(ucurp.parents('.curp-input'), {
				message:'CURP no válida.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateEmail(uemail.val(), false)){
			self.messages.createMessage.call(uemail.parents('.email-input'), {
				message:'Correo electrónico no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validatePhone(uphone.val(), false)){
			self.messages.createMessage.call(uphone.parents('.phone-input'), {
				message:'Teléfono no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(password.val(), null, false)){
			self.messages.createMessage.call(password.parents('.password-input'), {
				message:'Por favor ingrese una contraseña.',
				className: 'error-message'
			});
			password.val('');
			repassword.val('');
			count++;
		};
		if(!validations.validateWithPattern(repassword.val(), null, false)){
			self.messages.createMessage.call(repassword.parents('.repassword-input'), {
				message:'Por favor ingrese la contraseña nevamente.',
				className: 'error-message'
			});
			password.val('');
			repassword.val('');
		};
		if ($.trim(password.val()) != $.trim(repassword.val())) {
			self.messages.createMessage.call(password.parents('.password-input'), {
				message:'Por favor ingrese una contraseña.',
				className: 'error-message'
			});
			self.messages.createMessage.call(repassword.parents('.repassword-input'), {
				message:'Por favor ingrese la misma contraseña nevamente.',
				className: 'error-message'
			});
			password.val('');
			repassword.val('');
			count++;
		};
		return count < 1;
	};
	function validateProduct(){
		var count = 0;
		var form  = $('.product-form');
		var pname = form.find('.name-input .value');
		var salePrice = form.find('.salePrice-input .value');
		if(!validations.validateWithPattern(pname.val(), null, false)){
			self.messages.createMessage.call(pname.parents('.name-input'), {
				message:'Nombre de producto no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(salePrice.val(), new RegExp("^\\$?[0-9]+(\\.([0-9]{1})?[0-9]{1})?$"), false)){
			self.messages.createMessage.call(salePrice.parents('.salePrice-input'), {
				message:'Precio de producto no válido.',
				className: 'error-message'
			});
			count++;
		};
		if(count < 1){
			var acceptBtn = form.find('button.accept');
			acceptBtn.unbind('click');
		};
		return count < 1;
	};
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
	function validatePos(){
		var count     = 0;
		var container = self.view.container();
		var pname = container.find('.pos-inputs .name-input .value');
		var pemail = container.find('.pos-inputs .email-input .value');
		var pphone = container.find('.pos-inputs .phone-input .value');
		var rname = container.find('.representative-inputs .name-input .value');
		var remail = container.find('.representative-inputs .email-input .value');
		var rcurp = container.find('.representative-inputs .curp-input .value');
		var serial = container.find('.serial-input .value');
		var stockItem = container.find('.stock-input .selected-item');
		if(typeof stockItem.data('customdropdown.data') == "undefined"){
			self.messages.createMessage.call(container.find('.stock-input'), {
				message:'Por favor seleccione una bodega.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(pname.val(), null, false)){
			count++;
			self.messages.createMessage.call(pname.parents('*[class$="input"]') , {
				message:'Por favor ingrese un nombre de negocio válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateEmail(pemail.val(), false)){
			count++;
			self.messages.createMessage.call(pemail.parents('*[class$="input"]') , {
				message:'Por favor ingrese un correo electrónico válido.',
				className: 'error-message'
			});
		};
		if(!validations.validatePhone(pphone.val(), false)){
			count++;
			self.messages.createMessage.call(pphone.parents('*[class$="input"]') , {
				message:'Por favor ingrese un teléfono válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(rname.val(), null, false)){
			count++;
			self.messages.createMessage.call(rname.parents('*[class$="input"]') , {
				message:'Por favor ingrese un nombre de negocio válido.',
				className: 'error-message'
			});
		};
		
		if(!validations.validateEmail(remail.val(), false)){
			count++;
			self.messages.createMessage.call(remail.parents('*[class$="input"]') , {
				message:'Por favor ingrese un correo electrónico válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateCurp(rcurp.val(), false)){
			count++;
			self.messages.createMessage.call(rcurp.parents('*[class$="input"]') , {
				message:'Por favor ingrese una CURP válida.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(serial.val(), null, false)){
			count++;
			self.messages.createMessage.call(serial.parents('*[class$="input"]') , {
				message:'Código de refrigerador no valido.',
				className: 'error-message'
			});
		};
		if(!validateAddress())
			count++;
		return count < 1;
	};
	function validateSeller(){
		var count     = 0;
		var container = self.view.container();
		var stockItem = container.find('.stock-input .selected-item');
		var sname     = container.find('.name-input .value');
		var curp      = container.find('.curp-input .value');
		var email     = container.find('.email-input .value');
		var phone     = container.find('.phone-input .value');
		var device    = container.find('.device-input .value');

		if(typeof stockItem.data('customdropdown.data') == "undefined"){
			self.messages.createMessage.call(container.find('.stock-input'), {
				message:'Por favor seleccione una bodega.',
				className: 'error-message'
			});
			count++;
		};
		if(!validations.validateWithPattern(sname.val(), null, false)){
			count++;
			self.messages.createMessage.call(sname.parents('*[class$="input"]') , {
				message:'Por favor ingrese un nombre válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(device.val(), null, false)){
			count++;
			self.messages.createMessage.call(device.parents('*[class$="input"]') , {
				message:'Código de dispositivo no valido.',
				className: 'error-message'
			});
		};
		if(!validations.validateEmail(email.val(), false)){
			count++;
			self.messages.createMessage.call(email.parents('*[class$="input"]') , {
				message:'Por favor ingrese un correo electrónico válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateCurp(curp.val(), false)){
			count++;
			self.messages.createMessage.call(curp.parents('*[class$="input"]') , {
				message:'Por favor ingrese una CURP válida.',
				className: 'error-message'
			});
		};
		if(!validations.validatePhone(phone.val(), false)){
			count++;
			self.messages.createMessage.call(phone.parents('*[class$="input"]') , {
				message:'Por favor ingrese un teléfono válido.',
				className: 'error-message'
			});
		};
		return count < 1;
	};
	function validateAddress(){
		var count     = 0;
		var container = self.view.container();
		var street    = container.find('.street-input .value');
		var extNum    = container.find('.extNum-input .value');
		var intNum    = container.find('.intNum-input .value');
		var district  = container.find('.district-input .value');
		if(!validations.validateWithPattern(extNum.val(), new RegExp("^[0-9]+$"), false)){
			count++;
			self.messages.createMessage.call(extNum.parents('*[class$="input"]') , {
				message:'Por favor ingrese un número exterior válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(intNum.val(), new RegExp("^[0-9]+$"), true)){
			count++;
			self.messages.createMessage.call(intNum.parents('*[class$="input"]') , {
				message:'Por favor ingrese un número interior válido.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(street.val(), null, false)){
			count++;
			self.messages.createMessage.call(street.parents('*[class$="input"]') , {
				message:'Por favor ingrese un calle válida.',
				className: 'error-message'
			});
		};
		if(!validations.validateWithPattern(district.val(), null, false)){
			count++;
			self.messages.createMessage.call(district.parents('*[class$="input"]') , {
				message:'Por favor ingrese una colonia válida.',
				className: 'error-message'
			});
		};
		return count < 1;
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
	//Creation
	this.createBatchJson        = createBatchJson;
	this.createProductJson      = createProductJson;
	this.createUserJson         = createUserJson;
	this.createStockJson        = createStockJson;
	this.createPosJson          = createPosJson;
	this.createSellerJson       = createSellerJson;
	//Data
	this.setProductData         = setProductData;
	this.editProduct            = editProduct;
	this.setStockData           = setStockData;
	this.setPosData             = setPosData;
	this.setSellerData          = setSellerData;
	//Page
	this.loadProductView        = loadProductView;
	this.loadUserView           = loadUserView;
	this.loadStockView          = loadStockView;
	this.loadPosView            = loadPosView;
	this.loadSellerView         = loadSellerView;
	//Prepare
	this.prepareStockInsertion  = prepareStockInsertion;
	this.prepareSellerInsertion = prepareSellerInsertion;
	this.prepareSellerEdition = prepareSellerEdition;
	this.prepareStockEdition    = prepareStockEdition;
	this.preparePosInsertion    = preparePosInsertion;
	this.preparePosEdition      = preparePosEdition;
	//Validations
	this.validateProduct        = validateProduct;
	this.validateBatch          = validateBatch;
	this.validateUser           = validateUser;
	this.validateStock          = validateStock;
	this.validatePos            = validatePos;
	this.validateSeller = validateSeller
	this.validateAddress        = validateAddress;
	AdditionController.prototype._init_.call(this);
};