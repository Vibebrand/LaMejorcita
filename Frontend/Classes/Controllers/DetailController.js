DetailController.prototype = new ViewController();
DetailController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	this.pageFunctions = [this.loadStockDetail];
	var title     = $('<h2></h2>');
	var infoContainer = $('<div class="info-container"><div>');
	var linksContainer= $('<div class="links-container"></div>');

	this.view.addSubview(title);
	this.view.addSubview(infoContainer);
	this.view.addSubview(linksContainer);
	this.view.setClass('detail-container');

	this.detailTitle    = title;
	this.infoContainer  = infoContainer;
	this.linksContainer = linksContainer;
};
function DetailController(){
	var self = this;
	var infoContainer = null;
	var linksContainer = null;
	this.currentId = null;
	this.pagenum = 0;
	this.page = "Stock"
	this.currentData = {};
	this.viewDidLoad = function(){
		infoContainer = self.infoContainer;
		linksContainer = self.linksContainer;
		var loadCall = self['load'+self.page+'Detail'];
		if(typeof loadCall == "function")loadCall.call(self);
	};
	this.createDetailMenu = function(){
		if(self.page == "Sale")
			self.delegate.createDetailMenu(false);
		else
			self.delegate.createDetailMenu(true);
	};
	//Stock Detail
	this.loadStockDetail = function(){
		createStockView();
		self.delegate.getDetail(self.page, self.currentId);
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

		createLinkBtn({
			text: 'Puntos de Venta',
			href: '/POS/stock/'+self.currentData._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Inventario',
			href: '/Products/stock/'+self.currentData._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Vendedores',
			href: '/Sellers/stock/'+self.currentData._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Ventas',
			href: '/Sales/stock/'+self.currentData._id,
			container: linksContainer
		});
	};
	function createStockView(){
		infoContainer.empty(); linksContainer.empty();
		self.detailTitle.text('Bodega');
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
	};
	//POS detail
	this.loadPosDetail = function(){
		createPOSView();
		self.delegate.getDetail(self.page, self.currentId);
	};
	this.setPosDetail = function(pos){
		self.currentData  = pos;
		var container     = self.view.container();
		var businessnames = container.find('.posInfo .posname .title');
		var address       = container.find('.address .value');
		var phone         = container.find('.phone .value');
		var email         = container.find('.email .value');
		var temperature   = container.find('.fridgeInfo-container .temperature .value');
		var serial        = container.find('.fridgeInfo-container .serial .value');
		var fstatus       = container.find('.fridgeInfo-container  .status .value');
		var rname         = container.find('.representative .name');
		var remail        = container.find('.representative .email');
		var rcurp         = container.find('.representative .curp');

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

		createLinkBtn({
			text: 'Vendedores',
			href: '/Sellers/pos/'+self.currentData._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Ventas',
			href: '/Sales/pos/'+self.currentData._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Bodega',
			href: '/Detail/stock/'+self.currentData.stock._id,
			container: linksContainer
		});
	};
	function createPOSView(){
		infoContainer.empty(); linksContainer.empty();
		self.detailTitle.text('Punto de venta');
		var posInfo       = $('<div class="posInfo-container"></div>');
		var fridgeInfo    = $('<div class="fridgeInfo-container"></div>');
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
	this.loadSellerDetail = function(){
		createSellerView();
		self.delegate.getDetail(self.page, self.currentId);
	};
	this.setSellerDetail = function(seller){
		self.currentData = seller;
		var container    = self.view.container();
		var sname        = container.find('.name .value');
		var curp         = container.find('.curp .value');
		var email        = container.find('.email .value');
		var phone        = container.find('.phone .value');
		var stock        = container.find('.stock .value');
		sname.text(seller.name);
		curp.text(seller.curp);
		email.text(seller.email);
		phone.text(seller.phone);
		stock.text(seller.stock.name);

		createLinkBtn({
			text: 'Bodega',
			href: '/Detail/stock/'+self.currentData.stock._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Ventas',
			href: '/Sales/seller/'+self.currentData._id,
			container: linksContainer
		});
	};
	function createSellerView(){
		infoContainer.empty(); linksContainer.empty();
		self.detailTitle.text('Vendedor');
		createField({
			field: 'name',
			title:{classname:'title', value: 'Nombre'},
			container: infoContainer
		});
		createField({
			field: 'curp',
			title:{classname:'title', value: 'CURP'},
			container: infoContainer
		});
		createField({
			field: 'email',
			title:{classname:'title', value: 'Correo electrónico'},
			container: infoContainer
		});
		createField({
			field: 'phone',
			title:{classname:'title', value: 'Teléfono'},
			container: infoContainer
		});
		createField({
			field: 'stock',
			title:{classname:'title', value: 'Bodega'},
			container: infoContainer
		});
	};
	//Sale detail
	this.loadSaleDetail = function(){
		createSaleView();
		self.delegate.getDetail(self.page, self.currentId);
	};
	this.setSaleDetail = function(sale){
		self.currentData = sale;
		var container    = self.view.container();
		var datetime = container.find('.datetime .value');
		var seller = container.find('.seller .value');
		var device = container.find('.device .value');
		var posName = container.find('.pos .name');
		var posfridge = container.find('.pos .fridge');
		var observations = container.find('.observations .value');
		var productslist = container.find('.products-list');

		datetime.text(sale.date+' '+sale.time);
		seller.text(sale.seller.name);
		device.text(sale.device);
		posName.text(sale.salepoint.name);
		posfridge.text(sale.salepoint.fridge.serial);
		observations.text(sale.observations);
		for (var i = sale.products.length - 1; i >= 0; i--)
			createProductItem.call(productslist, sale.products[i]);

		createLinkBtn({
			text: 'Vendedor',
			href: '/Detail/seller/'+self.currentData.seller._id,
			container: linksContainer
		});
		createLinkBtn({
			text: 'Punto de venta',
			href: '/Detail/pos/'+self.currentData.salepoint._id,
			container: linksContainer
		});
		
	};
	function createProductItem(product){
		var productItem = $('<li class="product-item"></li>');
		var count = $('<span class="count"></span>');
		var price = $('<span class="price"></span>');
		var pname = $('<span class="name"></span>');
		this.append(productItem);
		productItem.append(pname);
		productItem.append(price);
		productItem.append(count);

		count.text(product.count);
		price.text('$ '+product.salePrice.toFixed(2));
		pname.text(product.name);
	};
	function createSaleView(){
		infoContainer.empty(); linksContainer.empty();
		self.detailTitle.text('Información');
		var productslist = $('<ul class="products-list"></ul>');
		var saleinfo = $('<div class="saleinfo-container"></div>');
		infoContainer.append(saleinfo);
		infoContainer.append(productslist);
		createField({
			field: 'datetime',
			title:{classname:'title', value: 'Fecha'},
			container: saleinfo
		});
		createField({
			field: 'seller',
			title:{classname:'title', value: 'Vendedor'},
			container: saleinfo
		});
		createField({
			field: 'device',
			title:{classname:'title', value: 'Dispositivo'},
			container: saleinfo
		});
		createField({
			field: 'pos',
			title:{classname:'title', value: 'Punto de venta'},
			value: [{classname:'name', value:''},{classname:'fridge', value:''}],
			container: saleinfo
		});
		createField({
			field: 'observations',
			title:{classname:'title', value: 'Observaciones'},
			container: saleinfo
		});
	};
	//General
	self.setDetail = function(data){
		var setCall = self['set'+self.page+'Detail'];
		if(typeof setCall =="function") setCall.call(self, data);
		self.delegate.enableAllEvents();
	};
	this.createField = function createField(options){
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
	function createLinkBtn(options){
		var options = $.extend({},{
			text: 'Button link',
			classname: 'link-button',
			container: ""
		},options);
		if(options.container.constructor === $ && typeof options.container.find != "undefined"){
			var  linkBtn  = $('<button></button>'); 
			linkBtn.attr('class', options.classname);
			linkBtn.text(options.text);
			if(typeof options.href == "string")
				linkBtn.data('href', options.href);
			options.container.append(linkBtn);
		};
	};
	//Events
	function onClickLinkBtn(){
		var linkBtn = $(this);
		self.delegate.changePage(linkBtn.data('href'));
	};
	//Disable Enable
	this.enableEvents = function(){
		if(linksContainer != null){
			var linkBtns = linksContainer.find('.link-button');
			linkBtns.unbind('click');
			linkBtns.bind('click', onClickLinkBtn);
		};
	};
	this.disableEvents = function(){
		if(linksContainer != null){
			var linkBtns = linksContainer.find('.link-button');
			linkBtns.unbind('click');
		};
	};
	DetailController.prototype._init_.call(this);
};