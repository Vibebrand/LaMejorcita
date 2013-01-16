Importer.importfile('Classes/Views/Prototypes/View.js');
Importer.importfile('Classes/Services/Prototypes/Service.js');
Importer.importfile('Classes/Controllers/Prototypes/ViewController.js');

Importer.importfile('Classes/Controllers/CallbacksHandler.js');
Importer.importfile('Classes/Controllers/NavigationController.js');

Importer.importfile('Classes/Controllers/MasterControl.js');
Importer.importfile('Classes/Controllers/LoginController.js');
Importer.importfile('Classes/Controllers/HeaderController.js');

$(document).ready(function(){Importer.loadImports(main);});

function main(){
	var navigationController = new NavigationController();
	var masterControl        = new MasterControl();
	var loginController      = new LoginController();
	var headerController     = new HeaderController();

	masterControl.navigationController = navigationController;
	masterControl.loginController      = loginController;
	masterControl.headerController     = headerController;

	masterControl.createNavigation();
	navigationController.load();
};