/*
 * OptionCell.j
 * La Mejorcita
 *
 * Created by You on January 8, 2013.
 * Copyright 2013,  Vibebrand All rights reserved.
 */
@import <AppKit/CPBox.j>

@implementation OptionCell : CPBox
{
	CPTextField     label;
}
- (void)setRepresentedObject:(CPString)anString
{
	if(!label){
		label = [[CPTextField alloc] initWithFrame:CGRectInset([self bounds], 4, 4)];
		[label setFont:[CPFont systemFontOfSize:16.0]];
        [label setTextShadowColor:[CPColor whiteColor]];
        [label setTextShadowOffset:CGSizeMake(0, 1)];
        [self addSubview:label];
	}
	[label setStringValue:anString];
	[label sizeToFit];
	[label setFrameOrigin:CGPointMake(10,CGRectGetHeight([label bounds]) / 2.0)];
}
@end
