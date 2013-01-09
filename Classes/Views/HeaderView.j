/*
 * Header.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPBox.j>

@implementation HeaderView : CPBox
{
}
- (id)initWithFrame: (CGRect)aFrame{
    self = [super initWithFrame: aFrame];
    if (self){
    	[self setBorderColor:[CPColor colorWithCalibratedRed: 0.23 green:0.23 blue: 0.23 alpha: 1]];
    	[self setAutoresizingMask:  CPViewWidthSizable];
    }
    return self;
}
@end
