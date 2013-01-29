/**
	@class
	@author <a href="mailto:david.díaz.isei@gmail.com">David Díaz</a>
	@description Controller in charge of creating all application message.
*/
function MessageController () {
	var self = this;
	/**
		@function
		@description Creates a message with the given options.
		@param {Object} options Options for the message.
	*/
	this.createMessage = function(options){
		var container = this;
		var options = $.extend({},{
			message 	: 'Test message',
			className	: 'warning',
			animation	: 'slideDown',
			speed		: 'fast'
		},options);

		container.find('*[class$="message"]').remove();
		var messageContainer = $('<div class="'+options.className+' message"></div>');
		var messageSpan = $('<span class="text"></span>');
		messageContainer.hide();
		container.find('*:first').before(messageContainer);
		messageContainer.append(messageSpan);
		messageSpan.text(options.message);

		if(typeof messageContainer[options.animation] === "function")
			messageContainer[options.animation].call(messageContainer, options.speed);
		else
			messageContainer.show();
		if(typeof options.delay === "number")
			setTimeout(function(){
				self.removeMessage.call(container);
			}, options.delay);
	};
	/**
		@function
		@description Delete the current message.
		@param {Object} options Options to delete message
	*/
	this.removeMessage = function(options){
		var container = this;
		var options = $.extend({},{
			animation	: 'slideUp',
			speed		: 'fast'
		},options);
		var messages = container.find('*[class$="message"]');
		if(typeof messages[options.animation] === "function")
			messages[options.animation].call(messages, options.speed, function(){messages.remove();});
		else
			messages.show(50, function(){messages.remove();});
	};
	this.addViewAsMessage = function(options){
		var container = this;
		var options = $.extend({},{
			view 		: '',
			animation	: 'slideDown',
			className	: 'warning',
			speed		: 'fast'
		},options);
		if(options.view.constructor === $){
			var messageContainer = $('<div class="'+options.className+' message"></div>');
			container.find('*:first').before(messageContainer);
			messageContainer.append(options.view);
			messageContainer.hide();
			if(typeof messageContainer[options.animation] === "function")
				messageContainer[options.animation].call(messageContainer, options.speed);
			else
				messageContainer.show();
		};
	};
}