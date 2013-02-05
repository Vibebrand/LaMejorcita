function POSService (argument) {
	var self = this;
	this.searchPOS = function(searchData){
		console.log(searchData);
		var posData = [];
		for (var i = 0; i < 15; i++) {
			var pos = {
				_id: "sdfadsasalepoint"+i,
				name: "Negocio",
				phone: "1234567",
				email: "salepoint"+i+"@mail.com",
				registationDate: "2013/01/01",
				geoposition: {
					latitude: "21.8818",
					longitude: "-102.2913"
				},
				fridge: {
					serial : String("afsdll0132fridge"+i).toUpperCase(),
					temperature: -10,
					status: true
				},
				representative:{
					name: "Rep Guy",
					curp: 'QWER123456HQWERT12',
					email: "rep.guy@mail.com"
				},
				address: {
					street: "Calle "+i,
					district: "Colonia "+i,
					intNum: "",
					extNum: String(i+1)
				},
				stock: {
					_id			: "safdsafdsa0fd"+i,
					name        :"Bodega "+i,
					businessName:"Negocio "+i
				}
			};
			posData.push(pos);
		};
		console.log(posData);
		self.delegate.setTableData(posData);
	};
	this.getPosDetail = function(posId, callbacks){
		console.log(posId);
		var date = new Date();
		var pos = {
			_id: "sdfadsasalepoint0",
			name: "Negocio "+date.getHours() +" "+date.getMinutes()+" "+date.getSeconds(),
			phone: "1234567",
			email: "salepoint0@mail.com",
			registationDate: "2013/01/01",
			geoposition: {
				latitude: "21.8818",
				longitude: "-102.2913"
			},
			fridge: {
				serial : String("afsdll0132fridge0").toUpperCase(),
				temperature: -10,
				status: true
			},
			representative:{
				name: "Rep Guy",
				curp: 'QWER123456HQWERT12',
				email: "rep.guy@mail.com"
			},
			address: {
				street: "Calle ",
				district: "Colonia ",
				intNum: "",
				extNum: String(10)
			},
			stock: {
				_id			: "safdsafdsa0fd0",
				name        :"Bodega 0",
				businessName:"Negocio 0"
			}
		};
		console.log(pos);
		self.callsHandler.makeCallbacks({
						calls: callbacks.successCall, 
						params: pos , 
						handlers: [self, self.delegate]
					});
	};
	this.addPos = function(dataToSend){
		console.log(dataToSend);
		self.delegate.successfulAddition();
	};
};
POSService.prototype = new Service();