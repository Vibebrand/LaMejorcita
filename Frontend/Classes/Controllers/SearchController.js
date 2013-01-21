SearchController.prototype = new ViewController();
SearchController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var  input = $('<input type="text"/>');
	var searchBtn = $('<button class="search-button"></button>');
	var addBtn = $('<button class="add-button"></button>');
	searchBtn.text('Buscar');
	addBtn.text('+');
	this.view.addSubview(input);
	this.view.addSubview(searchBtn);
	this.view.addSubview(addBtn);
	this.view.setClass('search-container');
};
function SearchController () {
	var self = this;
	SearchController.prototype._init_.call(this);
};