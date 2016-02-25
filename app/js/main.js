'use strict';
$(document).ready(function(){
	$('.site-info__text').columnize({columns: 2 });

	$('.accordeon__toggle').on('click',function(e){
		var $this=$(this),
			parentAccordeon=$this.closest('.accordeon'),
			parentBlock=$this.closest('.accordeon__li'),
			toggles=parentAccordeon.find('.accordeon-toggle'),
			currentContent=parentBlock.find('.accordeon__content'),
			content=parentAccordeon.find('.accordeon__content');

		if(!$this.hasClass('accordeon_active')) {
			toggles.removeClass('accordeon_active');
			content.slideUp('fast');
			$this.addClass('accordeon_active');
			currentContent.stop(true,true).slideDown('slow');
		} else {
			currentContent.stop(true,true).slideUp('slow');
			$this.removeClass('accordeon_active');
			toggles.removeClass('accordeon_active');
		}

	});

	var ResetLinkModule = (function(){

		function cleaning(link) {
				var parent=link.closest('.accordeon__content');
				console.log(parent);
				var checkbox=parent.find('input:checkbox');
				checkbox.removeAttr("checked");
		}
		function listener(link){
			link.on('click',function(event){
				var $this=$(this);
				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
				cleaning($this);

			});

		}
		return {
			reset: listener
		}

	})();


	// ВЫЗОВ
	ResetLinkModule.reset($('.filter-reset-link'));


/* слайдер цен */

jQuery("#slider").slider({
	min: 0,
	max: 1000,
	values: [0,1000],
	range: true,
	stop: function(event, ui) {
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));

    },
    slide: function(event, ui){
		jQuery("input#minCost").val(jQuery("#slider").slider("values",0));
		jQuery("input#maxCost").val(jQuery("#slider").slider("values",1));
    }
});

jQuery("input#minCost").change(function(){

	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();

    if(parseInt(value1) > parseInt(value2)){
		value1 = value2;
		jQuery("input#minCost").val(value1);
	}
	jQuery("#slider").slider("values",0,value1);
});


jQuery("input#maxCost").change(function(){

	var value1=jQuery("input#minCost").val();
	var value2=jQuery("input#maxCost").val();

	if (value2 > 1000) { value2 = 1000; jQuery("input#maxCost").val(1000)}

	if(parseInt(value1) > parseInt(value2)){
		value2 = value1;
		jQuery("input#maxCost").val(value2);
	}
	jQuery("#slider").slider("values",1,value2);
});



// фильтрация ввода в поля
	jQuery('input#maxCost,input#minCost').keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;

		if (event.keyCode) key = event.keyCode;
		else if(event.which) key = event.which;

		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);

		if(!/\d/.test(keyChar))	return false;

	});


	$('.filter-colors__block').on('click',function(event) {
		event.preventDefault ? event.preventDefault() : (event.returnValue=false);
		var $this=$(this),
			Parent=$this.closest('.filter-colors'),
			ColorsBlocks=Parent.find('.filter-colors__block_active');
			console.log(Parent);
			ColorsBlocks.removeClass('filter-colors__block_active');
			$(this).addClass('filter-colors__block_active');
	})
})