/*
 * AppController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPBox.j>

@implementation MainView : CPView
{
}
- (id)initWithFrame: (CGRect)aFrame{
    self = [super initWithFrame: aFrame];
    if (self){
    	[self setAutoresizingMask: CPViewHeightSizable | CPViewWidthSizable];
    }
    return self;
}
@end
