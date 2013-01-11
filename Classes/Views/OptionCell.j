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
	CPBox highlightView;
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
- (void)setSelected:(BOOL)flag
{
    if(!highlightView)
    {
        highlightView = [[CPView alloc] initWithFrame:CGRectCreateCopy([self bounds])];
        [highlightView setBackgroundColor:[CPColor blueColor]];
    }
    if(flag){
        [self addSubview:highlightView positioned:CPWindowBelow relativeTo:label];
        [label setTextColor:[CPColor whiteColor]];
        [label setTextShadowColor:[CPColor blackColor]];
    }
    else{
        [highlightView removeFromSuperview];
        [label setTextColor:[CPColor blackColor]];
        [label setTextShadowColor:[CPColor whiteColor]];
    }
}
@end
