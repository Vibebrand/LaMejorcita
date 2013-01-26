/*! Copyright (c) 2011 Oscar David Díaz
* Requires: 1.2.2+
*/
(function($){
	$.fn.customSelect = function(options){
		options = $.extend( {}, $.fn.customSelect.options , options );
		function makeCustomSelect(){
			var elem = $(this);

			function createContent(){
				var selectorContainer = $('<div></div>');
				var selectedContainer = $('<div></div>');
				var optionsContainer = $('<div></div>');
				elem.empty();
				elem.append(selectorContainer);
				selectorContainer.append(selectedContainer);
				selectorContainer.append(optionsContainer);
				selectorContainer.attr('class', options.selector);
				selectedContainer.attr('class', options.selected);
				optionsContainer.attr('class', options.options);
				selectedContainer.html(options.defaultText);
				optionsContainer.hide();
				selectedContainer.bind('click', onClickSelected);
				createOptions();
				$(document).bind('click.customselected', onClickDocument);
				if(options.defaultSelected != null){
					var optionItem = optionsContainer.find('#'+options.defaultSelected);
					optionItem.trigger('click');
				};
			};
			function onClickDocument(event){
				var target = $(event.target);
				var optionsContainer = elem.find('.'+options.options);
				if(elem.has(target).length < 1){
					if(optionsContainer.is(':visible'))
						optionsContainer.slideUp('fast');
				};
			};
			function createOptions(){
				$.each(options.optionsObject, function(index,value){
					addOption(value, index);
				});
			};
			function onClickSelected(){
				var optionsContainer = elem.find('.'+options.options);
				if(!optionsContainer.is(':visible')){
					var optionItem = optionsContainer.find('.isSelected');
					var optionItems = optionsContainer.find('.'+options.option);
					optionItems.show();
					optionItem.hide();
					optionsContainer.slideDown('fast');
				}
				else
					optionsContainer.slideUp('fast');
				
				if(typeof options.onClickSelected === "function")
						options.onClickSelected.call();
			};
			function onClickOption(){
				var selected = {}
				var optionsContainer = elem.find('.'+options.options);
				var optionItems = elem.find('.'+options.options+' .'+options.option);
				var optionItem = $(this);
				var selectedItem = elem.find('.'+options.selected);
				optionItems.removeClass('isSelected');
				optionItem.addClass('isSelected');
				selectedItem.html(optionItem.html());
				selected.value 	= optionItem.html();
				selected.id 	= optionItem.attr('id');
				selected.data  	= optionItem.data('customselected.data');
				selected.id 	= typeof selected.id != "undefined"? selected.id : '';
				selected.data 	= typeof selected.data != "undefined"? selected.data : '';
				optionsContainer.slideUp('fast');
				options.onChange.call(selected);
			};
			function addOption(info, index){
				if(typeof info ===  "object" && typeof info.value != "undefined"){
					var optionsContainer = elem.find('.'+options.options);
					var optionItem = $('<div></div>');
					optionsContainer.append(optionItem);
					optionItem.attr('class', options.option);
					optionItem.attr('id', info.id? info.id: index );
					optionItem.html(info.value);
					optionItem.data('customselected.data', info.data);
					optionItem.bind('click', onClickOption);
				}
			};
			createContent();
		};
		return this.each(makeCustomSelect);
	};
	// default options
	$.fn.customSelect.options = {
		selected 		: 'selected',
		selector 		: 'selector',
		options 		: 'options',
		option 			: 'option',
		defaultSelected	:  null,
		defaultText 	: 'Choose one ...',
		optionsObject	: [],
		onChange	: function(){}
	};

})(jQuery);