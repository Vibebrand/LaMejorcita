SearchController.prototype = new ViewController();
SearchController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var  input = $('<input type="text"/>');
	var searchWrap = $('<div class="search-wrapper"></div>');
	var searchBtn = $('<button class="search-button"></button>');
	var addBtn = $('<button class="add-button"></button>');

	searchWrap.append(input);
	searchWrap.append(searchBtn);
	searchBtn.text('Buscar');
	addBtn.text('+');

	this.view.addSubview(searchWrap);
	this.view.addSubview(addBtn);

	this.view.setClass('search-container');
};
function SearchController () {
	var self = this;
	this.hideAddButton = function(){
		var container = self.view.container();
		var addBtn = container.find('.add-button');
		addBtn.hide();
	};
	this.hideSearch = function(){
		var container = self.view.container();
		var searchWrap = container.find('.search-wrapper');
		searchWrap.hide();
	};
	this.showAddButton = function(){
		var container = self.view.container();
		var addBtn = container.find('.add-button');
		addBtn.show();
	};
	this.showSearch = function(){
		var container = self.view.container();
		var searchWrap = container.find('.search-wrapper');
		searchWrap.show();
	};
	this.enableEvents = function() {
		
	};
	this.disableEvents = function() {
		
	};
	SearchController.prototype._init_.call(this);
};