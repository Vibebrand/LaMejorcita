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


@implementation AppController : CPObject{
    MasterControl _masterControl;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    var theWindow            = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    var contentView          = [theWindow contentView];
    var bounds               = [contentView bounds];
    var mainViewController   = [[MainViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, bounds.size.height)];
    var headervewController  = [[HeaderViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, 100.0)];
    var menuViewController   = [[MenuViewController alloc] initWithSize: CGRectMake(0, 100.0, 200.0, bounds.size.height)];
    var navigationController = [[NavigationController alloc] init];
    var masterControl        = [[MasterControl alloc] init];

    [headervewController setDelegate: mainViewController];
    [menuViewController setDelegate: mainViewController];
    [mainViewController setDelegate: masterControl];
    [navigationController setDelegate: masterControl];

    [mainViewController setHeaderViewController: headervewController];
    [mainViewController setMenuViewController: menuViewController];
    [masterControl setMainViewController: mainViewController];
    [masterControl setNavigationController: navigationController];

    [theWindow orderFront:self];
    [theWindow setContentView: [mainViewController view]];

    [masterControl validateHash];
     _masterControl = masterControl;
}
@end
