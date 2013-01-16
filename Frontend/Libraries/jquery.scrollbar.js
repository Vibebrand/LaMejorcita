/*! Copyright (c) 2011 Oscar David Díaz
* Requires: 1.2.2+
*/
var ScrollBar = 
{
	parentElement: null,
	scrolled: null,
	timerY: null,
	timerX: null,
	add: function add (parents, scrolled, customClass) {
		if(parents && scrolled){
			width = screen.width;
			if(width >= 320 && width <= 480)
				return;
			if(width >= 768 && width <= 1024)
				return;
			var hasOverflowX = ScrollBar.hasOverflowX(scrolled);
			var hasOverflowY = ScrollBar.hasOverflowY(scrolled);
			if(hasOverflowY || hasOverflowX){
				scrolled.css({"overflow":"hidden"});
				ScrollBar.parentElement = parents;
				ScrollBar.scrolled = scrolled;
				ScrollBar.createGeneralEvents();
			}
			if(hasOverflowY){
				ScrollBar.createScrollYElements(customClass);
				ScrollBar.changeScrollbarY();
			}
				
			if(hasOverflowX){
				ScrollBar.createScrollXElements(customClass);
				ScrollBar.changeScrollbarX();
			}
		}
	},
	remove: function remove(parents){
		if(parents){
			ScrollBar.obtainElementsByparentElement(parents);
			ScrollBar.disableMouseXFollow();
			ScrollBar.disableMouseYFollow();
			ScrollBar.disableKeyDownYEvents();
			ScrollBar.disableKeyDownXEvents();
			ScrollBar.parentElement.unbind('mousewheel.scrollY');
			
			ScrollBar.parentElement.find('.overflowX').remove();
			ScrollBar.parentElement.find('.overflowY').remove();
			ScrollBar.parentElement.removeClass('.parentElement');
			ScrollBar.scrolled.removeClass('.scrolled');

			ScrollBar.parentElement=null;
			ScrollBar.scrolled= null;
			ScrollBar.overflowY= null;
			ScrollBar.overflowX= null;
			ScrollBar.thumb= null;
		}
	},
	hasOverflowY : function hasOverflowY (scrolled){
		var element = scrolled[0];
		if(typeof element != "undefined" && typeof element.scrollHeight != "undefined" && typeof element.clientHeight != "undefined"){
			if (element.scrollHeight > element.clientHeight)return true;
		}
    	return false;
	},
	hasOverflowX: function hasOverflowX(scrolled){
		var element = scrolled[0];
		if(typeof element != "undefined" && typeof element.scrollWidth != "undefined" && typeof element.clientWidth != "undefined"){
			if(element.scrollWidth > element.clientWidth)return true;
		}
		return false;
	},
	createScrollYElements: function createScrollYElements(customClass){

		ScrollBar.parentElement.removeClass('parentElement');
		ScrollBar.scrolled.removeClass('scrolled');

		ScrollBar.parentElement.addClass('parentElement');
		ScrollBar.scrolled.addClass('scrolled');

		if(ScrollBar.parentElement.find('.overflowY').length > 0){
			ScrollBar.overflow =  parentElement.find('.overflowY');
			ScrollBar.thumb = overflow.find('.thumbY');
		}
		else
			ScrollBar.createScrollBarY(customClass);

		ScrollBar.createScrollYEvents();
	},
	createScrollXElements: function createScrollXElements(customClass){
		ScrollBar.parentElement.removeClass('parentElement');
		ScrollBar.scrolled.removeClass('scrolled');
		
		ScrollBar.parentElement.addClass('parentElement');
		ScrollBar.scrolled.addClass('scrolled');

		if(parentElement.find('.overflowX').length > 0){
			ScrollBar.overflow =  parentElement.find('.overflowX');
			ScrollBar.thumb = overflow.find('.thumbX');
		}
		else
			ScrollBar.createScrollBarX(customClass);

		ScrollBar.createScrollXEvents();
	},
	//General events
	createGeneralEvents: function createGeneralEvents(){
		ScrollBar.scrolled.bind('mousedown.scroll', function(){
			ScrollBar.obtainElementsByScrolled($(this));
		});
		ScrollBar.parentElement.bind('mousewheel.scroll', function(event,delta){
			ScrollBar.obtainElementsByparentElement($(this));
		});
		$(document).bind('mouseup.scroll', function(){
			ScrollBar.enableSelection();
			ScrollBar.disableMouseYFollow();
			ScrollBar.disableMouseXFollow();
			ScrollBar.disableselectionFollowY();
			ScrollBar.disableselectionFollowX();
		});
		$(document).bind('mousedown.scroll', function(event){
			if(ScrollBar.parentElement){
				if(ScrollBar.parentElement.has(event.target).length < 1){
					ScrollBar.disableKeyDownYEvents();
					ScrollBar.disableKeyDownXEvents();
				}
			}
		});
	},
	//ScrollX events
	createScrollXEvents: function createScrollXEvents(){
		ScrollBar.scrolled.bind('mousedown.scrollX', function(){
			ScrollBar.enableKeyDownXEvents();
			ScrollBar.enableselectionFollowX();
		});
		ScrollBar.parentElement.find('.overflowX').bind('mousedown', function(){
			ScrollBar.obtainElementsByparentElement($(this).parents('.parentElement'));
			ScrollBar.disableSelection();
			ScrollBar.enableMouseXFollow();
			ScrollBar.enableKeyDownXEvents();
		});
	},
	enableMouseXFollow: function enableMouseXFollow(){
		$(document).bind('mousemove.scrollX', function(event){
			ScrollBar.moveScrollX(event.pageX);
		});
	},
	disableMouseXFollow: function disableMouseXFollow(){
		$(document).unbind('mousemove.scrollX');
	},
	moveScrollX: function moveScrollX(distanceX){
		var overflow = ScrollBar.parentElement.find('.overflowX');
		var scrolled = ScrollBar.scrolled;
		var thumb = overflow.find('.thumbX');
		
		var distance = (distanceX - overflow.offset().left);
		
		if(distance > scrolled.width()){
			var totalscrollWidth = scrolled[0].scrollWidth - scrolled[0].clientWidth;
			scrolled[0].scrollLeft = totalscrollWidth;
			thumb.css("margin-left" ,  (overflow[0].clientWidth -  thumb[0].clientWidth) +"px");
		}else if(distance <= 0){
			scrolled[0].scrollLeft = 0;
			thumb.css("margin-left", "0px");
		}else{
			var percent = distance/overflow.width();
			var totalscrollWidth = scrolled[0].scrollWidth - scrolled[0].clientWidth;
			scrolled[0].scrollLeft = totalscrollWidth * percent;
			thumb.css("margin-left", (percent *(overflow[0].clientWidth - thumb[0].clientWidth))+"px");
		}
	},
	enableKeyDownXEvents: function enableMouseXFollow(){
		ScrollBar.disableKeyDownYEvents();
		$(document).bind('keydown.scrollX', function(event){
			ScrollBar.keydownScrollXMove(event);
			ScrollBar.changeScrollbarX();
			return;
		});
	},
	disableKeyDownXEvents: function enableMouseXFollow(){
		$(document).unbind('keydown.scrollX');
	},
	keydownScrollXMove: function keydownScrollYMove(event){
		if(event.keyCode == 37){
			ScrollBar.scrolled[0].scrollLeft -= 50;
			event.preventDefault();
			return;
		}
		if(event.keyCode == 39){
			ScrollBar.scrolled[0].scrollLeft += 50;
			event.preventDefault();
			return;
		}
	},
	enableselectionFollowX: function enableselectionFollowY(){
		$(document).bind('mousemove.selectionX', function(event){
			ScrollBar.selectionFollowX(event.pageX);
			ScrollBar.changeScrollbarX();
		});
	},
	disableselectionFollowX: function enableselectionFollowY(){
		$(document).unbind('mousemove.selectionX');
	},
	selectionFollowX: function selectionFollowY(positionX){
		var scrolled = ScrollBar.scrolled;
		var distanceX = scrolled.offset().left + scrolled.width();
		var offset = scrolled.offset().left;
		var factor = positionX- distanceX;

		if(positionX < offset)
		{
			var factor =  positionX - offset ;
			scrolled[0].scrollLeft += factor;
		}else if(factor > 0){
			scrolled[0].scrollLeft += factor;
		}
	},
	//ScrollY Events
	createScrollYEvents: function createScrollYEvents(){
		ScrollBar.scrolled.bind('mousedown.scrollY', function(){
			ScrollBar.enableKeyDownYEvents();
			ScrollBar.enableselectionFollowY();
		});
		ScrollBar.parentElement.find('.overflowY').bind('mousedown', function(){
			ScrollBar.obtainElementsByparentElement($(this).parents('.parentElement'));
			ScrollBar.disableSelection();
			ScrollBar.enableMouseYFollow();
			ScrollBar.enableKeyDownYEvents();
		});
		ScrollBar.scrolled.bind('mousewheel.scrollY', function(event,delta){
			ScrollBar.mousewheelScrollYMove(event,delta);
			ScrollBar.enableKeyDownYEvents();
		});
	},
	enableMouseYFollow: function enableMouseFollow(){
		$(document).bind('mousemove.scrollY', function(event){
			ScrollBar.moveScrollY(event.pageY);
		});
	},
	disableMouseYFollow : function enableMouseFollow(){
		$(document).unbind('mousemove.scrollY');
	},
	moveScrollY: function moveScrollY(distanceY){
		var overflow = ScrollBar.parentElement.find('.overflowY');
		var scrolled = ScrollBar.scrolled;
		var thumb = overflow.find('.thumbY');
		
		var distance = (distanceY - overflow.offset().top);

		if(distance > scrolled.height()){
			var totalscrollheight = scrolled[0].scrollHeight - scrolled[0].clientHeight;
			scrolled[0].scrollTop = totalscrollheight;
			ScrollBar.changeScrollbarY();
		}else if(distance <= 0){
			scrolled[0].scrollTop = 0;
			ScrollBar.changeScrollbarY();
		}else{
			var percent = distance/overflow.height();
			var totalscrollheight = scrolled[0].scrollHeight - scrolled[0].clientHeight;
			scrolled[0].scrollTop = totalscrollheight * percent;
			ScrollBar.changeScrollbarY();
		}
	},
	mousewheelScrollYMove: function mousewheelScrollYMove(event, delta){
		event.preventDefault();
		ScrollBar.scrolled[0].scrollTop -= (delta*30);
		ScrollBar.changeScrollbarY();
	},
	enableKeyDownYEvents: function enableKeyDownEvents(){
		ScrollBar.disableKeyDownYEvents();
		$(document).bind('keydown.scrollY', function(event){
			ScrollBar.keydownScrollYMove(event);
			ScrollBar.changeScrollbarY();
			return;
		});
	},
	disableKeyDownYEvents: function disableKeyDownEvents(){
		$(document).unbind('keydown.scrollY');
	},
	keydownScrollYMove: function keydownScrollYMove(event){
		if(event.keyCode == 38){
			ScrollBar.scrolled[0].scrollTop -= 50;
			event.preventDefault();
			return;
		}
		if(event.keyCode == 40){
			ScrollBar.scrolled[0].scrollTop += 50;
			event.preventDefault();
			return;
		}
	},
	enableselectionFollowY: function enableselectionFollowY(){
		$(document).bind('mousemove.selectionY', function(event){
			ScrollBar.selectionFollowY(event.pageY);
			ScrollBar.changeScrollbarY();
		});
	},
	disableselectionFollowY: function enableselectionFollowY(){
		$(document).unbind('mousemove.selectionY');
	},
	selectionFollowY: function selectionFollowY(positionY){
		var scrolled = ScrollBar.scrolled;
		var distanceY = scrolled.offset().top + scrolled.height();
		var offset = scrolled.offset().top;
		var factor = positionY-distanceY;
		if(positionY < offset)
		{
			var factor =  positionY - offset;
			scrolled[0].scrollTop += factor;
		}else if(factor > 0){
			scrolled[0].scrollTop += factor;
		}
	},
	//Creation Methods
	createScrollBarY: function createScrollBarY(customClass){
		var overflow = $('<div></div>');
		var thumb = $('<div></div>');
		overflow.attr('class','overflowY');
		thumb.attr('class','thumbY');
		overflow.append(thumb);
		overflow.height(ScrollBar.scrolled.height());
		thumb.css("height", (ScrollBar.scrolled.height()*100) / ScrollBar.scrolled[0].scrollHeight+"%");
		ScrollBar.parentElement.append(overflow);
		if(typeof customClass == "string");
			overflow.addClass(customClass);
	},
	createScrollBarX: function createScrollBarX(customClass){
		var overflow = $('<div></div>');
		var thumb = $('<div></div>');
		overflow.attr('class','overflowX');
		thumb.attr('class','thumbX');
		overflow.append(thumb);

		overflow.width(ScrollBar.scrolled.width());
		thumb.css("width", (ScrollBar.scrolled.width()*100) / ScrollBar.scrolled[0].scrollWidth+"%");
		ScrollBar.parentElement.append(overflow);
		if(typeof customClass == "string");
			overflow.addClass(customClass);
	},
	enableSelection : function enableSelection(){
		$("body").removeAttr('style');
	},
	disableSelection : function disableSelection(){
		$("body").css({
			'-moz-user-select': '-moz-none',
   			'-khtml-user-select': 'none',
   			'-webkit-user-select': 'none',
   			'-ms-user-select': 'none',
   			'user-select': 'none'
		});
	},
	obtainElementsByparentElement: function obtainElementsByparentElement(parentElement){
		if(parentElement){
			ScrollBar.parentElement = parentElement;
			if(ScrollBar.parentElement.hasClass('scrolled'))
				ScrollBar.scrolled = ScrollBar.parentElement;
			else
				ScrollBar.scrolled = ScrollBar.parentElement.find('.scrolled');
		}
	},
	obtainElementsByScrolled: function obtainElementsByScrolled(scrolled){
		if(scrolled){
			ScrollBar.scrolled = scrolled
			if(ScrollBar.scrolled.hasClass('parentElement'))
				ScrollBar.parentElement = ScrollBar.scrolled;
			else
				ScrollBar.parentElement = ScrollBar.scrolled.parents('.parentElement');
		}
	},
	changeScrollbarY: function changeScrollbarY(){
		var scrolled = ScrollBar.scrolled;
		var overflow = ScrollBar.parentElement.find('.overflowY');
		if(scrolled && overflow){
			var thumb = overflow.find('.thumbY');
			var totalscrollheight = scrolled[0].scrollHeight - scrolled[0].clientHeight;
			var percent = (scrolled[0].scrollTop) / totalscrollheight;
			var overflowHeight = overflow[0] ? overflow[0].clientHeight: 0;
			var thumbHeight = thumb[0] ? thumb[0].clientHeight: 0;
			thumb.css('margin-top', (percent * (overflowHeight - thumbHeight))+"px");
		}
	},
	changeScrollbarX: function changeScrollbarX(){
		var scrolled = ScrollBar.scrolled;
		var overflow = ScrollBar.parentElement.find('.overflowX');
		if(scrolled && overflow){
			var thumb = overflow.find('.thumbX');
			var totalscrollWidth = scrolled[0].scrollWidth - scrolled[0].clientWidth;
			var percent = (scrolled[0].scrollLeft) / totalscrollWidth;
			var overflowWidth = overflow[0] ? overflow[0].clientWidth: 0;
			var thumbWidth = thumb[0] ? thumb[0].clientWidth: 0;
			thumb.css('margin-left', (percent * (overflowWidth - thumbWidth))+"px");
		}
	}
};