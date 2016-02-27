'use strict';
$(document).ready(function(){

	$('.accordeon__toggle').on('click',function(e){
		var $this=$(this),
			parentAccordeon=$this.closest('.accordeon'),
			parentBlock=$this.closest('.accordeon__li'),
			toggles=parentAccordeon.find('.accordeon-toggle'),
			currentContent=parentBlock.find('.accordeon__content'),
			content=parentAccordeon.find('.accordeon__content');

		if(!$this.hasClass('accordeon_active')) {
			toggles.removeClass('accordeon_active');
			content.slideUp('slow');
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



		/*** СЛАЙДЕР фото **/
		$('.product-wrap__preview-list').find('.product-wrap__preview-li').on('click',function(){
			var currentSlider=$(this),
			 	sliderList=currentSlider.parent('.product-wrap__preview-list'),
			 	sliderBlock=currentSlider.closest('.product-wrap__preview'),
			  	link = currentSlider.find('img').attr('src'),
			  	big_image=sliderBlock.find(".product-wrap__big-image"),
			  	big_image_link=big_image.attr('src');

			  	sliderList.find('.product-wrap__preview-li_active').removeClass('product-wrap__preview-li_active');
			  	currentSlider.addClass('product-wrap__preview-li_active');
			  	big_image.stop(true,true).fadeOut('100',function(){
				  	$(this).attr("src",link);
				  	big_image.stop(true,true).fadeIn('100');
				});
		})

		$('.content__view-mode-list').find('[data-mode]').on('click',function(event){
			event.preventDefault ? event.preventDefault() : (event.returnValue=false);
			var currentModeLink=$(this),
				currentMode=currentModeLink.attr('data-mode'),
				productList=$('.content__product-list'),
				productWrap=$('.content__product-wrap');


			var modes = {
				'line': ['product-wrap_line','product-list_line'],
				'table':['product-wrap_table','product-list_table'],
				'tile': ['product-wrap_tile','product-list_tile']
			};
				productList.attr('class','content__product-list');
				productWrap.attr('class','content__product-wrap');

			switch (currentMode){
				case 'line': productList.addClass(modes.line[1]);
							 productWrap.addClass(modes.line[0]);
							 break;
				 case 'table': productList.addClass(modes.table[1]);
							 productWrap.addClass(modes.table[0]);
							 break;
				 case 'tile': productList.addClass(modes.tile[1]);
							 productWrap.addClass(modes.tile[0]);
							 break;
			}
		})

			// ВЫЗОВ модулей
		ResetLinkModule.reset($('.filter-reset-link'));

			// Активация необходимых возможностей: columnizer, select2
		$('.site-info__text').columnize({columns: 2 });
		$('.sorter__select').select2().css('width','143');
		$('.select2-container').css('width','143');
})