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
function TableController (argument) {
	var self = this;
	this.delegate;
	this.tableHeaders = [];
	this.cellPrototypes = [];
	this.viewDidLoad = function(){
		createHeaders();
	};
	function createHeaders(){
		var row     = $('<tr></tr>');
		self.header.append(row);
		for (var i = 0; i < self.tableHeaders.length; i++){
			if(self.tableHeaders[i].constructor === Object &&typeof self.tableHeaders[i].identifier != "undefined")
				createCellItem.call(row, self.tableHeaders[i].value);
			else if(typeof self.tableHeaders[i] == "string")
				createCellItem.call(row, self.tableHeaders[i]);
		};
	};
	function createCellItem(value){
		var cell = $('<td></td>');
		cell.html(value);
		this.append(cell);
	};
	this.loadTable = function(){
		if(typeof self.delegate != "undefined"&& typeof self.delegate.getTableCount === "function"&& typeof self.delegate.rowsNumber() === "number"){
			for (var i = 0; i < self.delegate.rowsNumber(); i++) {
				
			};
		};
	};

	/*function createCellItem(value){
		var cell = $('<td></td>');
		cell.html(value);
		this.append(cell);
	};
	this.addStockRow = function(stock){
		var row = $('<tr></tr>');
		var deleteBtn = $('<button class="delete"></button>');
		var detailBtn = $('<button class="detail"></button>');
		this.body.append(row);
		createCellItem.call(row, stock.name);
		createCellItem.call(row, stock.manager);
		createCellItem.call(row, stock.phone);
		createCellItem.call(row, detailBtn);
		createCellItem.call(row, deleteBtn);
		deleteBtn.text('-');
		detailBtn.text('Detalle');
		row.data('id', stock._id);
	};
	//Events
	function getStockDetail(){
		console.log('detail');
	};
	function deleteStock(){
		console.log('delete');
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
	};*/
	TableController.prototype._init_.call(this);
};