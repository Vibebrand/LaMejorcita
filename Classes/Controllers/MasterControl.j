/*
 * MasterControl.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <Foundation/CPObject.j>
@import <AppKit/CPViewController.j>
@import "../Controllers/NavigationController.j"

@implementation MasterControl : CPObject{
	CPView _mainViewController;
	NavigationController _navigationControler;
}
-(BOOL)validationRule{
	return true;
}
-(void) loadPage: (CPString) page{
	switch(page){
		case "stocks":
			[[self mainViewController] createStocksPage];
		break;
	}
}
-(void) validateHash{
	[[self navigationController] validateHash];
}
-(void) changeHash: (CPArray) arguments{
	[[self navigationController] changeHash: arguments];
}
//Getters && Setters
-(void) setMainViewController: (CPViewController)aViewController{
	_mainViewController = aViewController;
}
-(void) mainViewController{
	return _mainViewController;
}
-(void)setNavigationController: (NavigationController) aController{
	_navigationControler = aController;
}
-(void)navigationController{
	return _navigationControler;
}
@end
