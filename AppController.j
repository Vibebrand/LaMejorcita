/*
 * AppController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013, Your Company All rights reserved.
 */

@import <Foundation/CPObject.j>
@import "Classes/Controllers/MainViewController.j"


@implementation AppController : CPObject
{
}

- (void)applicationDidFinishLaunching:(CPNotification)aNotification
{

    var theWindow   = [[CPWindow alloc] initWithContentRect:CGRectMakeZero() styleMask:CPBorderlessBridgeWindowMask];
    var contentView = [theWindow contentView];
    var bounds      = [contentView bounds];
    var controller  = [[MainViewController alloc] initWithSize: CGRectMake(0, 0, bounds.size.width, bounds.size.height)];

    [theWindow orderFront:self];

    [contentView addSubview: controller.view];
    [theWindow setDelegate: controller];

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
