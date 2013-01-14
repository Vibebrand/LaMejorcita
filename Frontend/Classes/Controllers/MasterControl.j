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
	CPView mainViewController @accessors;
	NavigationController navigationController @accessors;
}
-(BOOL)validationRule{
	return true;
}
-(void) validateHash{
	[[self navigationController] validateHash];
}
-(void) changeHash: (CPArray) arguments{
	[[self navigationController] changeHash: arguments];
}
//Standard
-(void) loadLoginPage{
	console.log('loadLoginPage');
}
//Logged
-(void) loadStocksPage{
	console.log('loadStocksPage');
}
-(void) loadPointsPage{
	console.log('loadPointsPage');
}
-(void) loadSellersPage{
	console.log('loadSellersPage');
}
-(void) loadSalesPage{
	console.log('loadSalesPage');
}
@end
