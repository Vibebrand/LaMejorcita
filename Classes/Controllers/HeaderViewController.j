/*
 * HeaderViewController.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPViewController.j>
@import "../Views/HeaderView.j"

@implementation HeaderViewController : CPViewController{
	id _delegate;
}
- (id)initWithSize: (CGRect)aFrame
{
    self = [super init];
    if (self){
    	[self setView: [[HeaderView alloc] initWithFrame: aFrame] ];
    }
    return self;
}
-(void)setDelegate:(id)delegate{
    _delegate = delegate;
}
-(id) delegate{
    return _delegate;
}
@end
