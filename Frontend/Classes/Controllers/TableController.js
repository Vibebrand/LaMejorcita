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
	this.tableHeaders = [];
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
		if(typeof self.delegate != "undefined"&& typeof self.delegate.rowsNumber === "function"&& typeof self.delegate.rowsNumber() === "number"){
			for (var i = 0; i < self.delegate.rowsNumber(); i++)
				createRow(i);
		};
	};
	function createRow(index){
		var row     = $('<tr></tr>');
		self.header.append(row);
		for (var i = 0; i < self.tableHeaders.length; i++) {
			var tableheader = self.tableHeaders[i];
			var cellValue = getCellData(tableheader.identifier, index, tableheader.itemPrototype);
			createCellItem.call(row,cellValue);
		};
	};
	function getCellData(identifier, index ,itemPrototype){
		if(typeof itemPrototype === "undefined")
			return self.delegate.getCellData(identifier, index);
		if(typeof itemPrototype === "object" && typeof itemPrototype.clone === "function")
			return itemPrototype.clone(true);
	};
	TableController.prototype._init_.call(this);
};