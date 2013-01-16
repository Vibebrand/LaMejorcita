
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
    CPScrollView menuContainer @accessors;
    CPScrollView mainContainer @accessors;
	HeaderViewController headerViewController @accessors;
	MenuViewController  menuViewController @accessors;

    CPViewController currentController;
    CGRect fame;
}
- (id)initWithSize: (CGRect)aFrame{
    self = [super init];
    if (self){
        var margintTop = 80;
        var marginLeft = 200;
        var width         = CGRectGetWidth(aFrame) - marginLeft;
        var height        = CGRectGetHeight(aFrame) - margintTop;

        currentController = [[CPViewController alloc] init];
        mainContainer     = [[CPScrollView alloc] initWithFrame: CGRectMake(marginLeft, margintTop, width, height)];
        menuContainer     = [[CPScrollView alloc] initWithFrame: CGRectMake(0, margintTop, marginLeft, height)];

    	[mainContainer setAutoresizingMask:CPViewWidthSizable | CPViewHeightSizable];
        [mainContainer setAutohidesScrollers:YES];
        [menuContainer setAutoresizingMask:CPViewHeightSizable];
        [menuContainer setAutohidesScrollers:YES];
        frame = aFrame;
    }
    return self;
}
-(void) loadView{
    [menuContainer setDocumentView: [menuViewController view]];
    [self setView: [[MainView alloc] initWithFrame: frame]];
    [[self view] addSubview: menuContainer];
    [[self view] addSubview: mainContainer];
}
-(void) createStocksPage{
    if(![currentController isKindOfClass: StocksViewController]){
        var stockViewController = [[StocksViewController alloc] init];
        [stockViewController setDelegate: self];
        [mainContainer setDocumentView: [stockViewController view]];
        currentController = stockViewController;
        [menuViewController updateMenu];
    }
}
-(void) loadPointsPage{
    [mainContainer setDocumentView: [[CPView alloc] init]];
    currentController = [[CPViewController alloc] init];
}
-(void) loadSellersPage{
    [mainContainer setDocumentView: [[CPView alloc] init]];
    currentController = [[CPViewController alloc] init];
}
-(void) loadSalesPage{
    [mainContainer setDocumentView: [[CPView alloc] init]];
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
