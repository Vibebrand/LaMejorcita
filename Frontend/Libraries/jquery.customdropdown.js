/*! Copyright (c) 2011 Oscar David Díaz
* Requires: 1.2.2+
*/
(function($){
	$.fn.customDropdown = function(options){
		function makeSelector(){
			var section = $(this);
			function createContent(){
				var optionList		= $('<ul class="'+options.optionList+'" ></ul>');
				var selectedList 	= $('<ul class="'+options.selectedList+'" ></ul>');
				var input 			= $('<input type="text" class="'+options.input+'"/>');
				optionList.hide();
				section.empty();
				section.append(input);
				section.append(optionList);
				section.append(selectedList);
				input.attr('placeholder', options.placeholder);
				$(document).bind('click.customdropdown', validateClick);
				$(document).bind('keydown.customdropdown', validateKeyDown);
				input.bind('keyup.customdropdown', findOptions);
				input.bind('focusin.customdropdown', findOptions);
				createOptions.call(optionList);
				createSelected();
				optionList.hide();
				optionList.find('.'+options.optionItem).hide();
			};
			function createOptions(){
				if(options.options.constructor === Array){
					for (var i = 0; i < options.options.length; i++)
						createOption.call( this ,options.options[i], i);
				};
			};
			function createOption(info, index){
				var info = $.extend({},{id: index , value : '', data: ''},info);
				if(info.constructor === Object && info.value != "undefined" && $.trim(info.id) != ""){
					var optionItem = $('<li class="'+options.optionItem+'" ></li>');
					this.append(optionItem);
					optionItem.attr('id',info.id);
					optionItem.text(info.value);
					optionItem.data(options.data, info.data);
					optionItem.bind('click', onClickOption);
					optionItem.hide();
				}
			};
			function createSelected(){
				var optionList = section.find('.'+options.optionList);
				for (var i = 0; i < options.selected.length; i++) {
					var optionItem = optionList.find('#'+options.selected[i]);
					optionItem.trigger('click');
				};
			};
			function createSelectedItem(info) {
				var selectedList = section.find('.'+options.selectedList);
				var selectedItem = $('<li class="'+options.selectedItem+'" ></li>');
				var removeButton = $('<button class="'+options.removeBtn+'">X</button>');
				var selectedSpan = $('<span></span>');
				selectedList.append(selectedItem);
				selectedItem.append(selectedSpan);
				selectedItem.append(removeButton);
				selectedItem.attr('id', info.id);
				selectedSpan.text(info.value);
				selectedItem.data(options.data, info.data);
				removeButton.bind('click', onClickRemove);
			};
			function onClickRemove(){
				var selectedItem = $(this).parents('.'+options.selectedItem);
				var optionList = section.find('.'+options.optionList);
				var optionItem = optionList.find('#'+selectedItem.attr('id'));
				optionItem.data('customdropdown.selected', false);
				optionItem.removeClass('selected');
				selectedItem.remove();
				if(optionList.is(':visible'))
					findOptions();
			};
			function onClickOption () {
				var optionItem = $(this);
				if(!optionItem.data('customdropdown.selected')){
					var selectedList = section.find('.'+options.selectedList);
					var optionList = section.find('.'+options.optionList);
					if(!options.multiple){
						var optionList = section.find('.'+options.optionList);
						var optionItems = optionList.find('.'+options.optionItem);
						optionItems.removeClass('selected');
						optionItems.data('customdropdown.selected', false);
						selectedList.empty();
					};
					optionItem.addClass('selected');
					optionItem.data('customdropdown.selected', true);
					createSelectedItem.call(selectedList , {
						id 		: optionItem.attr('id'),
						value 	: optionItem.text(),
						data 	: optionItem.data(options.data)
					});
					findOptions();
					optionList.hide();
				};
			};
			function validateKeyDown (event) {
				if(event.keyCode === 27){
					var input = section.find('.'+options.input);
					var optionList = section.find('.'+options.optionList);
					var optionItems = optionList.find('.'+options.optionItem);
					optionList.hide();
					optionItems.hide();
					input.blur();
				};
			};
			function validateClick (event) {
				var element = section.has(event.target);
				if(element.length < 1 && !$(event.target).hasClass(options.removeBtn)){
					var optionList = section.find('.'+options.optionList);
					var optionItems = optionList.find('.'+options.optionItem);
					optionList.hide();
					optionItems.hide();
				};
			};
			function findOptions() {
				var optionList = section.find('.'+options.optionList);
				var optionItems = optionList.find('.'+options.optionItem);
				var keywords = section.find('.'+options.input).attr('value').toLowerCase();
				optionList.show();
				optionItems.hide();
				for (var i = 0; i < optionItems.length; i++) {
					var optionItem = $(optionItems[i]);
					var optionText = optionItem.text().toLowerCase();
					if(optionText.indexOf(keywords) === 0 && !optionItem.data('customdropdown.selected'))
						optionItem.show();
				};
			};
			createContent();
		};
		var options = $.extend({}, $.fn.customDropdown.options , options);
		
		return this.each(makeSelector);
	};
	$.fn.customDropdown.options = {
		placeholder			: 'Dropdownlist',
		removeBtn 			: 'remove-button',
		input				: 'search',
		data 				: 'customdropdown.data',
		selectedItem		: 'selected-item',
		selectedList		: 'selected-list',
		optionList			: 'option-list',
		optionItem			: 'option-item',
		options 			: [],
		selected 			: [],
		multiple			: false,
		showOptions			: false
	};
})(jQuery);