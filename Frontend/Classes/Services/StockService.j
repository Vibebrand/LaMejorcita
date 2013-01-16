
@import <Foundation/CPObject.j>

@implementation StockService : CPObject
{
    id delegate @accessors;
}
-(void)getStocksData{
	var request = [[CPURLRequest alloc] initWithURL:@"Mocks/Stocks.json"];
	[request setHTTPMethod:@"GET"];
	var urlConnection = [CPURLConnection connectionWithRequest:request delegate:self];
}
-(void)connection:(CPURLConnection)connection didFailWithError:(id)error
{
	//debugger;
	receivedJsonData = nil;
	// alert(error);
}
-(void)connection:(CPURLConnection)connection didReceiveResponse:(CPHTTPURLResponse)response
{
	//debugger;
	var statusCode = [response statusCode];
}

-(void)connection:(CPURLConnection)connection didReceiveData:(CPString)data
{
	// debugger;
	// Create a javascript object from the JSON content
	var response = [CPDictionary dictionaryWithJSObject: [data objectFromJSON] recursively:YES];
	[ [self delegate] setStockData: response];
}
-(void)connectionDidFinishLoading:(CPURLConnection)connection
{

}

@end
