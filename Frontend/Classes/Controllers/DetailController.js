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
	function createStockView(){
		self.detailTitle.text('Información');
		self.view.container().remove('.info-container');

		var stockname = $('<div class="name"></div>');
		var businessname = $('<div class="businessname"></div>');
		var manager = $('<div class="manager"></div>');
		var address = $('<div class="address"></div>');
		var infoContainer = $('<div class="info-container "></div>');

		var nameText = $('<h4 class="text"></h4>');
		var businessnameText = $('<h4 class="text"></h4>');
		var managerText = $('<h4 class="text"></h4>');
		var addressText = $('<h4 class="text"></h4>');

		var nameValue = $('<span class="value"></span>');
		var businessnameValue = $('<span class="value"></span>');
		var managerValue = $('<span class="value"></span>');
		var addressValue = $('<span class="value"></span>');

		self.view.addSubview(infoContainer);

		infoContainer.append(stockname);
		infoContainer.append(businessname);
		infoContainer.append(manager);
		infoContainer.append(address);

		stockname.append(nameText);
		businessname.append(businessnameText);
		manager.append(managerText);
		address.append(addressText);

		stockname.append(nameValue);
		businessname.append(businessnameValue);
		manager.append(managerValue);
		address.append(addressValue);

		nameText.text('Nombre');
		businessnameText.text('Razón Social');
		managerText.text('Responsable');
		addressText.text('Dirección');
	};
	this.setStockDetail = function(stock){
		var container = self.view.container();
		var nameValue = container.find('.name .value');
		var businessnameValue = container.find('.businessname .value');
		var managerValue = container.find('.manager .value');
		var addressValue = container.find('.address .value');
		nameValue.text(stock.name);
		businessnameValue.text(stock.businessName);
		managerValue.text(stock.manager.name);
		addressValue.text(stock.address.district+' '+self.delegate.getAddressString(stock.address));
	};
	//POS detail
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