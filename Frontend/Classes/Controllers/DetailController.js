DetailController.prototype = new ViewController();
DetailController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.pageFunctions = [this.loadStockDetail];
	var backButton     = $('<button class="back-button"></button>');
	var title     = $('<h2></h2>');
	backButton.text('volver');
	
	this.view.addSubview(backButton);
	this.view.addSubview(title);

	this.view.setClass('detail-container');
	
	this.backButton = backButton;
	this.detailTitle = title;
};
function DetailController (argument) {
	var self = this;
	this.detailId = null;
	this.pagenum = 0;
	this.page = "Stock"
	this.currentData = {};
	this.viewDidLoad = function(){
		var loadCall = self['load'+self.page+'Detail'];
		if(typeof loadCall == "function")loadCall.call(self);
	};
	//Stock Detail
	this.loadStockDetail = function(){
		createStockView();
		self.delegate.getDetail(self.page, self.detailId);
	};
	this.setStockDetail = function(stock){
		this.currentData = stock;
		var container         = self.view.container();
		var businessnameValue = container.find('.businessName .value');
		var addressValue      = container.find('.address .value');
		var nameValue         = container.find('.stockname .value');
		var phoneValue        = container.find('.phone .value');
		var manNameValue      = container.find('.manager .name');
		var manEmailValue     = container.find('.manager .email');
		var manCurpValue      = container.find('.manager .curp');

		businessnameValue.text(stock.businessName);
		addressValue.text(stock.address.district+' '+self.delegate.getAddressString(stock.address));
		nameValue.text(stock.name);
		phoneValue.text(stock.phone);
		manNameValue.text(stock.manager.name);
		manEmailValue.text(stock.manager.email);
		manCurpValue.text(stock.manager.curp);
	};
	function createStockView(){
		var infoContainer = $('<div class="info-container  stockDetail"></div>');
		removeInfoContainer();
		self.detailTitle.text('Información');
		createField({
			field: 'stockname',
			title:{classname:'title', value: 'Nombre'},
			container: infoContainer
		});
		createField({
			field: 'businessName',
			title:{classname:'title', value: 'Razón social'},
			container: infoContainer
		});
		createField({
			field: 'manager',
			title:{classname:'title', value: 'Responsable'},
			value: [{classname:'name', value:''},{classname:'curp', value:''},{classname:'email', value:''}],
			container: infoContainer
		});
		createField({
			field: 'address',
			title:{classname:'title', value: 'Dirección'},
			container: infoContainer
		});
		createField({
			field: 'phone',
			title:{classname:'title', value: 'Teléfono'},
			container: infoContainer
		});
		self.view.addSubview(infoContainer);
	};
	//POS detail
	this.loadPosDetail = function(){
		createPOSView();
		self.delegate.getDetail(self.page, self.detailId);
	};
	this.setPosDetail = function(pos){
		self.currentData = pos;
		var container    = self.view.container();
		var businessnames = container.find('.posInfo .posname .title');
		var address = container.find('.address .value');
		var phone = container.find('.phone .value');
		var email = container.find('.email .value');
		var temperature = container.find('.fridgeInfo  .temperature .value');
		var serial = container.find('.fridgeInfo  .serial .value');
		var fstatus = container.find('.fridgeInfo  .status .value');
		var rname = container.find('.representative .name');
		var remail = container.find('.representative .email');
		var rcurp = container.find('.representative .curp');

		businessnames.text(pos.name);
		address.text(pos.address.district+' '+self.delegate.getAddressString(pos.address));
		phone.text(pos.phone);
		email.text(pos.email);
		temperature.text(pos.fridge.temperature+'°C');
		serial.text(pos.fridge.serial);
		fstatus.text(pos.fridge.status? '✔':'✘');
		rname.text(pos.representative.name);
		remail.text(pos.representative.email);
		rcurp.text(pos.representative.curp);
	};
	function createPOSView(){
		var infoContainer = $('<div class="info-container posDetail"></div>');
		var posInfo       = $('<div class="posInfo"></div>');
		var fridgeInfo    = $('<div class="fridgeInfo"></div>');
		removeInfoContainer();
		self.detailTitle.text('Información');
		self.view.addSubview(infoContainer);
		infoContainer.append(fridgeInfo);
		infoContainer.append(posInfo);

		createField({
			field: 'posname',
			container: posInfo
		});
		createField({
			field: 'representative',
			title:{classname:'title', value: 'Representante'},
			value: [{classname:'name', value:''},{classname:'curp', value:''},{classname:'email', value:''}],
			container: posInfo
		});
		createField({
			field: 'address',
			title:{classname:'title', value: 'Dirección'},
			container: posInfo
		});
		createField({
			field: 'email',
			title:{classname:'title', value: 'Correo electrónico'},
			container: posInfo
		});
		createField({
			field: 'phone',
			title:{classname:'title', value: 'Teléfono'},
			container: posInfo
		});

		createField({
			field: 'serial',
			title:{classname:'title', value: 'Refrigerador'},
			container: fridgeInfo
		});
		createField({
			field: 'status',
			title:{classname:'title', value: 'Estado'},
			container: fridgeInfo
		});
		createField({
			field: 'temperature',
			title:{classname:'title', value: 'Temperatura'},
			container: fridgeInfo
		});
	};
	//Seller detail

	//Sale detail
	//Product detail
	//General
	function  createField(options){
		var options = $.extend({},{
			field: 'field', 
			title: {classname: 'title', value: ''}, 
			value: [{classname: 'value', value: ''}], 
			container: $('<div></div>')
		},options);
		var field =  $('<div></div>');
		var title = $('<h3></h3>');
		field.append(title);
		field.attr('class', options.field);
		title.attr('class', options.title.classname);
		title.text(options.title.value);
		
		for (var i = 0; i < options.value.length; i++) {
			var value =  $('<span></span>');
			field.append(value);
			value.attr('class', options.value[i].classname);
			value.text(options.value[i].value);
		};
		options.container.append(field);
	};
	self.setDetail = function(data){
		var setCall = self['set'+self.page+'Detail'];
		if(typeof setCall =="function") setCall.call(self, data);
		self.delegate.enableEvents();
	};
	function removeInfoContainer(){
		var container = self.view.container().find('.info-container');
		container.remove();
	};
	//Events
	function onClickBack(){
		var prevPage = $.cookie('lamejorcita.prevPage')?  $.cookie('lamejorcita.prevPage'): '';
		var index = self.pagenum;
		if($.trim(prevPage) != "" && prevPage != $.cookie('lamejorcita.page'))
			self.delegate.changePage(prevPage);
		else
			self.delegate.triggerOption(index);
	};
	//Disable Enable
	this.enableEvents = function(){
		this.backButton.unbind('click');
		this.backButton.bind('click', onClickBack);
	};
	this.disableEvents = function(){
		this.backButton.unbind('click');
	};
	DetailController.prototype._init_.call(this);
};