/**
	@class
	@author <a href="mailto:david.díaz.isei@gmail.com">David Díaz</a>
	@description Service class in charge of validating text values.
*/
function TextValidationService(){
	var self = this;
	/**
		@function
		@description This function validates a string text acording to the current parameters.
		@param {String} textValue Text to validate.
		@param {String} pattern Regular expresion.
		@param {Boolean} allowEmpty If its value is true allows empty string values.
	*/
	this.validateText = function (textValue, pattern, allowEmpty) {
		textValue = $.trim(textValue);
		allowEmpty = typeof allowEmpty == 'boolean'? allowEmpty: false;
		if(textValue == "")
			return allowEmpty;
		if(pattern != null){
			if(!pattern.test(textValue))
				return false;
		};
		return true;
	};
};