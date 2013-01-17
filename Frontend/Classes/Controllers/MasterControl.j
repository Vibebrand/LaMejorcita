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
@import "../Services/StockService.j"

@implementation MasterControl : CPObject
{
	CPView mainViewController @accessors;
	NavigationController navigationController @accessors;
	StockService stockService @accessors;
}
-(id) init{
	self = [super init];
	if(self){
	}
	return self;
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
	[mainViewController loadLoginPage];
}

//Logged
-(void) loadStocksPage{
	[mainViewController createStocksPage];
}
-(void) loadPointsPage{
	[mainViewController loadPointsPage];
}
-(void) loadSellersPage{
	[mainViewController loadSellersPage];
}
-(void) loadSalesPage{
	[mainViewController loadSalesPage];
}
-(void)getStocksData{
	[stockService getStocksData];
}
//Stock
-(void)setStockData: (CPArray) stocks{
	[mainViewController setStockData: stocks];
}
@end
