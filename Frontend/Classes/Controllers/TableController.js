function TableController() {
	var self = this;
	this.createStockTable = function() {
		this.view.setClass('stock-table');
		
	};
	this.cleanData = function() {
		
	};
	TableController.prototype._init_.call(this);
};
TableController.prototype = new ViewController();
TableController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var table = $('<table></table>');
	this.body = $('<tbody></tbody>');
	this.header = $('<thead></thead>');

	this.view.replaceContainerWith(table);
	this.view.addSubview(this.header);
	this.view.addSubview(this.body);
};