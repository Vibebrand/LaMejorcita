function TableController() {
	var self = this;
	this.createStockTable = function() {
		this.view.setClass('stock-table');
		this.body.empty();
		this.header.empty();
		var headers = ['Nombre','Razón Social','Dirección','Responsable'];
		var row = $('<tr></tr>'); 
		this.header.append(row);
		for (var i = 0; i < headers.length; i++)
			createCellItem.call(row, headers[i]);
	};
	function createCellItem(value){
		var cell = $('<td></td>');
		cell.html(value);
		this.append(cell);
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