Importer.importfile('Classes/Controllers/Prototypes/ViewController.js');
Importer.importfile('Classes/Views/Prototypes/View.js');
Importer.importfile('Classes/Services/Prototypes/Service.js');

Importer.importfile('Classes/Controllers/CallbacksHandler.js');
Importer.importfile('Classes/Controllers/NavigationController.js');
Importer.importfile('Classes/Controllers/MasterControl.js');

Importer.importfile('Classes/Controllers/LoginController.js');
Importer.importfile('Classes/Controllers/HeaderController.js');
Importer.importfile('Classes/Controllers/MainController.js');
Importer.importfile('Classes/Controllers/MessageController.js');

Importer.importfile('Classes/Services/UserService.js');
Importer.importfile('Classes/Services/StockService.js');
Importer.importfile('Classes/Services/POSService.js');
Importer.importfile('Classes/Services/SalesService.js');

$(document).ready(function(){Importer.loadImports(main);});
function main(){
	var masterControl     = new MasterControl();
	var loginController   = new LoginController();
	var headerController  = new HeaderController();
	var messageController = new MessageController();
	var userService       = new UserService();
	var stockService      = new StockService();
	var mainController    = new MainController();
	var posService        = new POSService();
	var salesService      = new SalesService();

	loginController.delegate  = masterControl;
	headerController.delegate = masterControl;
	mainController.delegate   = masterControl;
	
	userService.delegate  = masterControl;
	stockService.delegate = masterControl;
	salesService.delegate = masterControl;
	posService.delegate   = masterControl;

	masterControl.loginController    = loginController;
	masterControl.mainController     = mainController;
	masterControl.headerController   = headerController;
	masterControl.messageController  = messageController;

	loginController.messageController = masterControl.messageController;

	masterControl.userService   = userService;
	masterControl.stockService  = stockService;
	masterControl.salesService  = salesService;
	masterControl.posService = posService;

	masterControl.navigationController.load();
};
String.prototype.toCapitalize = function(){ 
   return this.toLowerCase().replace(/^.|\s\S/g, function(a) { return a.toUpperCase(); });
};