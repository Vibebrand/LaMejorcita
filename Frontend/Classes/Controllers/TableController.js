TableController.prototype = new ViewController();
TableController.prototype._init_= function(){
	ViewController.prototype._init_.call(this);
	var table = $('<table></table>');
	this.container = $('<tbody></tbody>');
	this.header = $('<thead></thead>');
	this.footer = $('<tfoot></tfoot>');
	this.view.replaceContainerWith(table);
	this.view.addSubview(this.header);
	this.view.addSubview(this.container);
	this.view.addSubview(this.footer);
};
function TableController (argument) {
	var self = this;
	this.tableHeaders = [];
	this.viewDidLoad = function(){
		createHeaders();
	};
	this.cleanTable = function(){
		self.container.empty();
	};
	function createHeaders(){
		var rowheader     = $('<tr></tr>');
		self.header.empty();
		self.header.append(rowheader);
		for (var i = 0; i < self.tableHeaders.length; i++){
			if(self.tableHeaders[i].constructor === Object &&typeof self.tableHeaders[i].identifier != "undefined")
				createCellItem.call(rowheader, self.tableHeaders[i].value);
			else if(typeof self.tableHeaders[i] == "string")
				createCellItem.call(rowheader, self.tableHeaders[i]);
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
			self.delegate.tableLoaded();
		};
	};
	function createRow(index){
		var row     = $('<tr></tr>');
		self.container.append(row);
		for (var i = 0; i < self.tableHeaders.length; i++) {
			var tableheader = self.tableHeaders[i];
			var cellValue = getCellData(index, tableheader.identifier,tableheader.itemPrototype, row);
			createCellItem.call(row, cellValue);
		};
	};
	function getCellData( index, identifier, itemPrototype, row){
		if(typeof itemPrototype === "undefined")
			return self.delegate.getCellData(index, identifier, row);
		
		if(typeof itemPrototype === "object" && typeof itemPrototype.clone === "function")
			return itemPrototype.clone(true);
	};
	this.getStringData = function(identifier, dataobject) {
		if(typeof identifier != "undefined" && typeof dataobject != "undefined"){
			var keys = identifier.split('.');
			identifier = keys[1];
			if(identifier != "undefined" && keys.length >= 2){
				for (var i = 2; i < keys.length; i++) 
					identifier+='.'+keys[i];
			};
			if(typeof dataobject[keys[0]] != "object")
				return dataobject[keys[0]];
			if(typeof dataobject[keys[0]] === "object")
				return self.getStringData(identifier, dataobject[keys[0]]);
		};
	};
	TableController.prototype._init_.call(this);
};