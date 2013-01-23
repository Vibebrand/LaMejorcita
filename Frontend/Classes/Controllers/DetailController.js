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
		var container         = self.view.container();
		var businessnameValue = container.find('.businessname .value');
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
		self.detailTitle.text('Información');
		self.view.container().remove('.info-container');
		
		var infoContainer = $('<div class="info-container "></div>');

		var stockname     = $('<div class="stockname"></div>');
		var businessname  = $('<div class="businessname"></div>');
		var manager       = $('<div class="manager"></div>');
		var address       = $('<div class="address"></div>');
		var phone         = $('<div class="phone"></div>');
		
		var managerText   = $('<h3 class="text"></h3>');

		var managerName       = $('<span class="name"></span>');
		var managerCurp       = $('<span class="curp"></span>');
		var managerEmail      = $('<span class="email"></span>');
		
		var managerNameText   = $('<h4 class="text"></h4>');
		var managerEmailText  = $('<h4 class="text"></h4>');
		var managerCurpText   = $('<h4 class="curp"></h4>');
		
		var managerNameValue  = $('<span class="value"></span>');
		var managerEmailValue = $('<span class="value"></span>');
		var managerCurpValue  = $('<span class="value"></span>');
		
		var nameText          = $('<h3 class="text"></h3>');
		var businessnameText  = $('<h3 class="text"></h3>');
		var addressText       = $('<h3 class="text"></h3>');
		var phoneText         = $('<h3 class="text"></h3>');
		
		var nameValue         = $('<span class="value"></span>');
		var businessnameValue = $('<span class="value"></span>');
		var addressValue      = $('<span class="value"></span>');
		var phoneValue        = $('<span class="value"></span>');

		self.view.addSubview(infoContainer);

		infoContainer.append(stockname);
		infoContainer.append(businessname);
		infoContainer.append(manager);
		infoContainer.append(address);
		infoContainer.append(phone);

		stockname.append(nameText);
		businessname.append(businessnameText);
		address.append(addressText);
		phone.append(phoneText);

		stockname.append(nameValue);
		businessname.append(businessnameValue);
		address.append(addressValue);
		phone.append(phoneValue);

		manager.append(managerText);
		manager.append(managerName);
		manager.append(managerEmail);
		manager.append(managerCurp);

		nameText.text('Nombre');
		businessnameText.text('Razón social');
		managerText.text('Responsable');
		phoneText.text('Teléfono');
		addressText.text('Dirección');
	};
	//POS detail
	this.loadPOSDetail = function(){
		createPOSView();
		//self.delegate.getDetail(self.page, self.detailId);
	};
	this.setPOSDetail = function(pos){
		self.detailTitle.text('Información');
		self.view.container().remove('.info-container');
	};
	function createPOSView(){
		self.detailTitle.text('Información');
		self.view.container().remove('.info-container');
		var infoContainer = $('<div class="info-container "></div>');
	

	};
	//Seller detail
	//Sale detail
	//Product detail
	//General
	self.setDetail = function(data){
		var setCall = self['set'+self.page+'Detail'];
		if(typeof setCall =="function") setCall.call(self, data);
		self.delegate.enableEvents();
	};
	//Events
	function onClickBack(){
		var prevPage = $.cookie('lamejorcita.prevPage')?  $.cookie('lamejorcita.prevPage'): '';
		var index = self.page;
		if($.trim(prevPage) != "")
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