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
	this.addStockRow = function(stock){
		var row = $('<tr></tr>');
		var deleteBtn = $('<button class="delete"></button>');
		var detailBtn = $('<button class="detail"></button>');
		this.body.append(row);
		createCellItem.call(row, stock.name);
		createCellItem.call(row, stock.businessName);
		createCellItem.call(row, stock.address);
		createCellItem.call(row, stock.manager);
		createCellItem.call(row, detailBtn);
		createCellItem.call(row, deleteBtn);
		deleteBtn.text('-');
		detailBtn.text('Detalle');
		row.data('id', stock._id);
	};
	function getStockDetail(){
		console.log('detail');
	};
	function deleteStock(){
		console.log('delete');
	};
	function createCellItem(value){
		var cell = $('<td></td>');
		cell.html(value);
		this.append(cell);
	};
	//Enable Disable
	this.enableEvents = function(){
		var table = this.view.container();
		var deleteBtns = table.find('.delete');
		var detailBtns = table.find('.detail');
		deleteBtns.unbind('click');
		detailBtns.unbind('click');
		deleteBtns.bind('click', deleteStock);
		detailBtns.bind('click', getStockDetail);
	};
	this.disableEvents = function(){
		var table = this.view.container();
		var deleteBtns = table.find('.delete');
		var detailBtns = table.find('.detail');
		deleteBtns.unbind('click');
		detailBtns.unbind('click');
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