
@import <AppKit/CPTableView.j>
@import <AppKit/CPViewController.j>
@implementation StocksViewController : CPViewController
{
	CPArray data;
}
-(void) init{
	self = [super init];
	if(self){
		data = [[CPArray alloc] init];
		var tableView = [[CPTableView alloc] initWithFrame:CGRectMakeZero()];
		var name         = [[CPTableColumn alloc] initWithIdentifier:@"name"];
		var businessName = [[CPTableColumn alloc] initWithIdentifier:@"businessName"];
		var address      = [[CPTableColumn alloc] initWithIdentifier:@"address"];
		var manager      = [[CPTableColumn alloc] initWithIdentifier:@"manager"];

    	[[name headerView] setStringValue: @"Nombre"];
		[[businessName headerView] setStringValue: @"Razón Social"];
		[[address headerView] setStringValue: @"Dirección"];
		[[manager headerView] setStringValue: @"Responsable"];

    	[tableView setUsesAlternatingRowBackgroundColors:YES];
    	[tableView addTableColumn:name];
		[tableView addTableColumn:businessName];
		[tableView addTableColumn:address];
		[tableView addTableColumn:manager];
		[tableView setDataSource:self];
		[tableView setDelegate: self];
		[self setView: tableView];
	}
	return self;
};
- (int)numberOfRowsInTableView:(CPTableView)aTableView {
    return [data count];
}
- (id)tableView:(CPTableView)aTableView objectValueForTableColumn:(CPTableColumn)aTableColumn row:(int)rowIndex {
    var text = [[data objectAtIndex: rowIndex] objectForKey: [aTableColumn identifier]];
    return text;
}
@end
