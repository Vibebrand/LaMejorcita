Importer.importfile('Classes/Controllers/Prototypes/ViewController.js');
Importer.importfile('Classes/Views/Prototypes/View.js');
Importer.importfile('Classes/Services/Prototypes/Service.js');

Importer.importfile('Classes/Controllers/CallbacksHandler.js');
Importer.importfile('Classes/Controllers/NavigationController.js');

Importer.importfile('Classes/Controllers/MasterControl.js');
Importer.importfile('Classes/Controllers/LoginController.js');
Importer.importfile('Classes/Controllers/HeaderController.js');
Importer.importfile('Classes/Controllers/MessageController.js');

Importer.importfile('Classes/Services/UserService.js');
Importer.importfile('Classes/Services/StockService.js');

$(document).ready(function(){Importer.loadImports(main);});
function main(){	
	
	var masterControl     = new MasterControl();
	var loginController   = new LoginController();
	var headerController  = new HeaderController();
	var messageController = new MessageController();
	var userService       = new UserService();
	var stockService      = new StockService();

	loginController.delegate  = masterControl;
	headerController.delegate = masterControl;
	
	userService.delegate      = masterControl;
	stockService.delegate     = masterControl;

	loginController.messageController = messageController;

	masterControl.loginController   = loginController;
	masterControl.headerController  = headerController;
	masterControl.messageController = messageController;
	masterControl.userService       = userService;
	masterControl.stockService      = stockService;

	navigationController.load();
};