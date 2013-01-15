/*
 * AppController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>
@import "Classes/Controllers/MainViewController.j"
@import "Classes/Controllers/MenuViewController.j"
@import "Classes/Controllers/HeaderViewController.j"
@import "Classes/Controllers/MasterControl.j"
@import "Classes/Controllers/NavigationController.j"
@import "Classes/Services/StockService.j"


@implementation AppController : CPObject{
    MasterControl  masterControl @accessors;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    var theWindow            = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    var contentView          = [theWindow contentView];
    var bounds               = [contentView bounds];
    var mainViewController   = [[MainViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, bounds.size.height)];
    var headervewController  = [[HeaderViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, 100.0)];
    var menuViewController   = [[MenuViewController alloc] init];
    var navigationController = [[NavigationController alloc] initWithCookiePrefix: @"lamejorcita"];
    var stockService         = [[StockService alloc] init];
    masterControl            = [[MasterControl alloc] init];

    [navigationController addStandardRoute: @"" withCallback:@selector(loadLoginPage) withParams: nil];
    [navigationController addLoggedRoute: @"" withCallback:@selector(changeHash:) withParams: [[CPArray alloc] initWithObjects: @"",@"Stocks"]];
    [navigationController addLoggedRoute: @"/Stocks" withCallback:@selector(loadStocksPage) withParams: nil];
    [navigationController addLoggedRoute: @"/Sellers" withCallback:@selector(loadSellersPage) withParams: nil];
    [navigationController addLoggedRoute: @"/Points" withCallback:@selector(loadPointsPage) withParams: nil];
    [navigationController addLoggedRoute: @"/Sales" withCallback:@selector(loadSalesPage) withParams: nil];

    [headervewController setDelegate: mainViewController];
    [menuViewController setDelegate: mainViewController];
    [mainViewController setDelegate: masterControl];
    [navigationController setDelegate: masterControl];
    [stockService setDelegate: masterControl];


    [mainViewController setMenuViewController: menuViewController];
    [mainViewController setHeaderViewController: headervewController];
    [masterControl setMainViewController: mainViewController];
    [masterControl setNavigationController: navigationController];
    [masterControl setStockService:  stockService];

    [[mainViewController view] addSubview: [headervewController view]];

    [theWindow orderFront:self];
    [theWindow setContentView: [mainViewController view]];
    [masterControl validateHash];
}
@end
