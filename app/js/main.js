'use strict';
$(document).ready(function(){
	var ResetLinkModule = (function(){
		function cleaning(link) {
				link.closest('.accordeon__content')
				.find('input:checkbox')
				.removeAttr("checked");
		}
		function listener(link){
			link.on('click',function(event){
				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
				cleaning($(this));
			});
		}
		return {
			reset: listener
		}
	})();

	var AccordeonModule = (function(){
		function listeners(){
			$('.accordeon__toggle').on('click', function(e){
				ToggleBlock($(this));
			});
		}
		function ToggleBlock($this){
			var parentAccordeon=$this.closest('.accordeon'),
				parentBlock=$this.closest('.accordeon__li'),
				togglesActive=parentAccordeon.find('.accordeon_active'),
				togglesContent=parentAccordeon.find('.accordeon_active + .accordeon__content'),
				currentContent=parentBlock.find('.accordeon__content');
			if(!$this.hasClass('accordeon_active')) {
				togglesContent.stop(true, true).slideUp('slow');
				togglesActive.removeClass('accordeon_active');
				$this.addClass('accordeon_active');
				currentContent.stop(true,true).slideDown('slow');
			} else {
				currentContent.stop(true,true).slideUp('slow');
				$this.removeClass('accordeon_active');
			}
		}
		return {
			follow: listeners
		}
	})();

/* слайдер цен */

	var asideFiltersModule = (function(){
		function getValues() {
			var valueMin=jQuery("input#minCost").val();
			var valueMax=jQuery("input#maxCost").val();
			return {
				valueMin: valueMin,
				valueMax: valueMax
			}
		}

		function init (){
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
			setUpListeners();
		}

		function setUpListeners(){
			jQuery("input#minCost").change(function(){
				getValues();
			    if(parseInt(valueMin) > parseInt(valueMax)){
					valueMin = valueMax;
					$(this).val(valueMin);
				}
				$(this).siblings("#slider").slider("values",0,valueMin);
			});

			jQuery("input#maxCost").change(function(){
				getValues();
				if (valueMax > 1000) { valueMax = 1000; jQuery("input#maxCost").val(1000)}

				if(parseInt(valueMin) > parseInt(valueMax)){
					valueMax = valueMin;
					$(this).val(valueMax);
				}
				$(this).siblings("#slider").slider("values",1,valueMax);
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
		}
		return {
			init: init
		}
	})();
	var productPageModule = (function(){
		function setUpListeners(){
			$('.filter-colors__block').on('click',function(event) {
				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
				colorsFilter($(this));
			});
			$('.product-wrap__preview-list').find('.product-wrap__preview-li').on('click',function(){
				PhotoSlider($(this));
			});
			$('.content__view-mode-list').find('[data-mode]').on('click',function(event){
				event.preventDefault ? event.preventDefault() : (event.returnValue=false);
				displayMode($(this));
			})
		}
					// ПЕРЕКЛЮЧАТЕЛЬ DISPLAY MODE
		function displayMode(currentModeLink) {
			var currentMode=currentModeLink.attr('data-mode'),
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
		}
		function PhotoSlider(currentSlider) {
			var sliderList=currentSlider.parent('.product-wrap__preview-list'),
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
		}
		function colorsFilter($this) {
			var Parent=$this.closest('.filter-colors'),
				ColorsBlocks=Parent.find('.filter-colors__block_active');
				ColorsBlocks.removeClass('filter-colors__block_active');
				$this.addClass('filter-colors__block_active');
		}
		return {
			setup : setUpListeners
		}
	})();
			// ВЫЗОВ модулей
		if($('.filter-reset-link').length>=1) {
			ResetLinkModule.reset($('.filter-reset-link'));
		}
		AccordeonModule.follow();
		asideFiltersModule.init();
		productPageModule.setup();
			// Активация необходимых возможностей: columnizer, select2
		$('.site-info__text').columnize({columns: 2 });
		$('.sorter__select').select2().css('width','143');
		$('.select2-container').css('width','143');
})