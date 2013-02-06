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
	function validateWithPattern(textValue, pattern, allowEmpty) {
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
	function validateDate(textValue, allowEmpty){
		textValue = $.trim(textValue);
		if(textValue == "")
			return allowEmpty;
		if(new Date(textValue) == "Invalid Date")
			return false;
		return true;
	};
	function validateCurp(textValue, allowEmpty){
		var pattern = /^[A-Z]{4}[0-9]{6}[H,M][A-Z]{5}[A-Z0-9]{1}[A-Z0-9]{1}$/;
		return validateWithPattern(textValue, pattern, allowEmpty);
	};
	function validateRfc(textValue, allowEmpty){
		var pattern =  /^([A-Z]{4}||[A-Z]{3})[0-9]{6}[A-Z0-9]{3}$/;;
		return validateWithPattern(textValue, pattern, allowEmpty);
	};
	function validateEmail(textValue, allowEmpty){
		var pattern = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		return validateWithPattern(textValue, pattern, allowEmpty);
	};
	function validatePhone(textValue, allowEmpty){
		var pattern = /^[0-9]{7,10}$/;
		return validateWithPattern(textValue, pattern, allowEmpty);
	};
	this.validateWithPattern = validateWithPattern;
	this.validateCurp = validateCurp;
	this.validateDate = validateDate;
	this.validateCurp = validateCurp;
	this.validateRfc = validateRfc;
	this.validateEmail = validateEmail;
	this.validatePhone = validatePhone;
};