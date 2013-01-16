/**
	@class
	@author <a href="mailto:david.díaz.isei@gmail.com">David Díaz</a>
	@description Service prototype.
*/
function Service() {
	this.timelimit    = 15000;
	/**
		@property
		@type Object
		@description Controller delegate.
	*/
	this.delegate     = null;
	this.callsHandler = new CallbacksHandler();
};