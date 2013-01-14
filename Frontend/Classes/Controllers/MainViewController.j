
/*
 * MainViewController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPViewController.j>
@import <AppKit/CPScrollView.j>
@import <AppKit/CPView.j>
@import "../Views/MainView.j"
@import "../Controllers/MenuViewController.j"
@import "../Controllers/HeaderViewController.j"
@import "../Controllers/StocksViewController.j"

@implementation MainViewController : CPViewController
{
    id delegate @accessors;
    CPScrollView containerView @accessors;
	HeaderViewController headerViewController @accessors;
	MenuViewController  menuViewController @accessors;
    CPViewController currentController;
}
- (id)initWithSize: (CGRect)aFrame{
    self = [super init];
    if (self){
        var width         = aFrame.size.width - 200;
        var height        = aFrame.size.height - 100;
        currentController = [[CPViewController alloc] init];
        containerView     = [[CPScrollView alloc] initWithFrame: CGRectMake(200, 100, width, height)];
    	[containerView setAutoresizingMask:  CPViewWidthSizable | CPViewHeightSizable];
    	[containerView setAutohidesScrollers:YES];
    	[self setView: [[MainView alloc] initWithFrame: aFrame]];
    	[[self view] addSubview: containerView];

    }
    return self;
}
-(void) createStocksPage{
    if(![currentController isKindOfClass: StocksViewController]){
        var stockViewController = [[StocksViewController alloc] init];
        [stockViewController setDelegate: self];
        [containerView setDocumentView: [stockViewController view]];
        currentController = stockViewController;
        [menuViewController updateMenu];
    }
}
-(void) loadPointsPage{
    [containerView setDocumentView: [[CPView alloc] init]];
    currentController = [[CPViewController alloc] init];
}
-(void) loadSellersPage{
    [containerView setDocumentView: [[CPView alloc] init]];
    currentController = [[CPViewController alloc] init];
}
-(void) loadSalesPage{
    [containerView setDocumentView: [[CPView alloc] init]];
    currentController = [[CPViewController alloc] init];
}

-(void) changeHash: (CPArray) arguments{
	[[self delegate] changeHash: arguments];
}
-(void) loadLoginPage{

}
//Stocks
-(void)setStockData: (CPArray) stocks{
    if([currentController isKindOfClass: StocksViewController])
        [currentController setStockData: stocks];
}
-(void) getStocksData{
    [delegate getStocksData];
}
@end
