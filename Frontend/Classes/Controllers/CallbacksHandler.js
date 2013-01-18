/**
	@class
	@author <a href="mailto:david.diaz.isei@gmail.com">David Díaz</a>
	@description Excecute callback functions.
*/
function CallbacksHandler () {
	var self = this;
	var options = {};
	var defoptions = {
		calls :'',
		handlers:''
	};
	/**
		@function
		@description Execute callbacks with their corresponding parameters.
		@param {Object} _options 
		Object with parameters and callbacks to excecute.
		@example 
		callbacksHandler.makeCallbacks({
			calls :[{'myFunction', 'parameters'}],
			handlers:[scopeforExecution1, 
				  scopeforExecution2, 
				  scopeforExecution3]
		});
	**/
	this.makeCallbacks = function(_options){
		options = $.extend({}, defoptions ,_options);
		if(typeof options.calls === "string" && $.trim(options.calls) != "") validateFunction(options.calls, options.params);
		if(options.calls.constructor === Object){
			var arguments = {};
			arguments.params = options.calls.params;
			arguments.info = options.params;
			arguments = validateParamaters(arguments);
			validateFunction(options.calls.call, arguments);
		};
		if(options.calls.constructor === Array){
			for (var i = 0; i < options.calls.length; i++){
				var arguments = {};
				arguments.params = options.calls[i].params;
				arguments.info = options.params;
				arguments = validateParamaters(arguments);
				validateFunction(options.calls[i].call , arguments);
			};
		};
	};
	/**
		@function
		@private
		@description Validates if a function has valid parameters.
		@param {Object} parameters Function parameters.
	*/
	function validateParamaters(parameters){
		if(typeof parameters.info === "undefined" && typeof parameters.params != "undefined")return parameters.params;
		if(typeof parameters.info != "undefined" && typeof parameters.params === "undefined")return parameters.info;
		return parameters;
	};
	/**
		@function
		@private
		@description If the variable callback is an array of functions this method excecutes them with their given parameters.
		@param {Array} callback  Functions array.
		@param {Object} params Function parameters.
	*/
	function validateFunction(callback, params){
		if(options.handlers.constructor != Array) return;
		for (var i = 0; i < options.handlers.length; i++) {
			 var handler = options.handlers[i];
			 if(typeof handler[callback] === "function"){
				handler[callback].call(null, params);
				break;
			};
		};
	};
};