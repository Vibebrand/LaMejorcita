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


@implementation AppController : CPObject{
    MasterControl _masterControl;
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{
    var theWindow           = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    var contentView         = [theWindow contentView];
    var bounds              = [contentView bounds];
    var mainViewController  = [[MainViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, bounds.size.height)];
    var headervewController = [[HeaderViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, 100.0)];
    var menuViewController  = [[MenuViewController alloc] initWithSize: CGRectMake(0, 100.0, 200.0, bounds.size.height)];
    var masterControl       = [[MasterControl alloc] init];

    [mainViewController setHeaderViewController: headervewController];
    [mainViewController setMenuViewController: menuViewController];
    [masterControl setMainViewController: mainViewController];

    [theWindow orderFront:self];
    [theWindow setContentView: [mainViewController view]];

     _masterControl = masterControl;

    /*var mainViewController = [[MainViewController alloc] initWithFrame: ];
    console.log(mainViewController);
    var theWindow = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask],
        contentView = [theWindow contentView];

    var label = [[CPTextField alloc] initWithFrame:CGRectMakeZero()];

    [label setStringValue:@"Hello World!"];
    [label setFont:[CPFont boldSystemFontOfSize:24.0]];

    [label sizeToFit];

    [label setAutoresizingMask:CPViewMinXMargin | CPViewMaxXMargin | CPViewMinYMargin | CPViewMaxYMargin];
    [label setCenter:[contentView center]];

    [contentView addSubview:label];

    [theWindow orderFront:self];*/

    // Uncomment the following line to turn on the standard menu bar.
    //[CPMenu setMenuBarVisible:YES];
}

@end
