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
	this.viewDidLoad = function(){
		var container = self.view.container();
		var input     =  container.find('.search-wrapper input');
		input.val($.cookie('lamejorcita.keywords'));
	};
	this.hideAddButton = function(){
		var container = self.view.container();
		var addBtn    = container.find('.add-button');
		addBtn.removeData('click');
		addBtn.hide();
	};
	this.hideSearch = function(){
		var container  = self.view.container();
		var searchWrap = container.find('.search-wrapper');
		var searchBtn  = searchWrap.find('.search-button');
		searchBtn.removeData('click');
		searchWrap.hide();
	};
	this.showAddButton = function(){
		var container = self.view.container();
		var addBtn    = container.find('.add-button');
		addBtn.data('click', true);
		addBtn.show();
	};
	this.showSearch = function(){
		var container = self.view.container();
		var searchWrap = container.find('.search-wrapper');
		var searchBtn = searchWrap.find('.search-button');
		searchBtn.data('click', true);
		searchWrap.show();
	};
	//Events
	function onClickSearch(){
		var container = self.view.container();
		var searchBtn = container.find('.search-wrapper .search-button');
		var keywords     =  $.trim(container.find('.search-wrapper input').val());
		var oldkeywords = $.cookie('lamejorcita.keywords')? $.cookie('lamejorcita.keywords') :'';
		if(keywords != oldkeywords){
			$.cookie('lamejorcita.keywords', keywords);
			self.delegate.makeSearch();
		};
		if(keywords == "")
			$.cookie('lamejorcita.keywords',null);
	};
	//Enable Disable
	this.enableEvents = function() {
		var container = self.view.container();
		var addBtn    = container.find('.add-button');
		var searchBtn = container.find('.search-button');
		addBtn.unbind('click');
		searchBtn.unbind('click');
		if(addBtn.data('click') == true)
			addBtn.bind('click', self.delegate.onClickAdd);
		if(searchBtn.data('click') == true)
			searchBtn.bind('click', onClickSearch);
	};
	this.disableEvents = function() {
		var container = self.view.container();
		container.find('button').unbind('click');
	};
	SearchController.prototype._init_.call(this);
};