$(function () {
   /* filters */
   
   'use strict';
   
   if ($('#filters_slider_icon').length) {
      
      $('#filters_slider_icon').on('click', function (event) { // при нажтии на иконку слайдера всё начинается
         event.stopPropagation();
         // alert();
         $( '#filter_help' ).fadeOut(100);
         // скрытие #filters_slider_icon, #filters_close_icon и .filters__list_trigger
         hideFilters_slider_icon__showSome();
         
         // при нажатии на .filters__list_trigger появляется соответствующий #filter_type и размывающий задник
         clickFilters_list_trigger__showFilters_list();
         
         // при нажатии на .filters__list item появляется #filter_chosen_panel...
         // ... пропадает размывающий задник, .filters__list и копируется текст выбора...
         clickFilters_list_item__showFilter_chosen_panel();
         
         // происходит фильтрация + сортировка
         clickFilters_list_item__filter();
         
         // при нажатии на #filter_chosen_panel пропадает фильтрация и она сама
         clickFilter_chosen_panel__no_filter();
         
         // при нажатии на #filters_close_icon или тело страницы пропадает фильтрация и всё закрывается
         clickFilter_chose_icon__no_filter__close();
         
         // при нажатии на тело закрывается .filters__list
         // clickWrapper__closeFilters_list();
         
      });
      $('.filters__list_trigger').on( 'click', function ( event ) {
         event.stopPropagation();
         $('.filters__list').slideUp(200);
         $('.chosen-list-trigger').removeClass('chosen-list-trigger');
         $(this).addClass('chosen-list-trigger');
      });
      $('.element-item-holder a').on( 'click', function ( event ) {
         event.stopPropagation();
         $(this).closest('.base_panel_info').slideUp(200);
         $('#back').hide();
      });
      
      
      
      function hideFilters_slider_icon__showSome() {
         let $slider_icon = $('#filters_slider_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $close_icon = $('#filters_close_icon');
         
         $slider_icon.hide(); // добавить тут закрытие подсказки!
         $('#filter_help').fadeOut(100);
         $('#filters_decoding').removeClass('active');
         $list_trigger.slideDown();
         $close_icon.fadeIn(300);
      }
      
      function clickFilters_list_trigger__showFilters_list() {
         let $list_trigger = $('.filters__list_trigger'),
            $back = $('#back');
         
         $list_trigger.on('click', function (event) {
            event.stopPropagation();
            $(this).addClass('chosen-list-trigger');
            
            let type = $(this).data('filter-type');
            $('#filter_type-' + type).slideDown(300);
            $back.show();
         });
      }
      
      function clickFilters_list_item__showFilter_chosen_panel() {
         let $list = $('.filters__list'),
            $list__item = $('.filters__list .filters__item'),
            $chosen_panel = $('#filter_chosen_panel'),
            $chosen_panel_text = $('#filter_chosen_panel .filter__chosen_text'),
            $back = $('#back');
         
         $list__item.on('click', function (event) {
            event.stopPropagation();
            $list.slideUp(300);
            $('.filters__list').slideUp(200);
            $chosen_panel.fadeIn(200).css('display', 'flex');
            let text = $(this).find('.filter__text').html();
            $chosen_panel_text.html(text);
            $back.hide();
            $('.chosen-list-trigger').removeClass('chosen-list-trigger');
         });
      }
      
      function clickFilters_list_item__filter() {
         let $list__item = $('.filters__list .filters__item'),
            $chosen_panel_text = $('#filter_chosen_panel .filter__chosen_text'),
            
            $holder = $('.elements-holder'),
            $item = $('.element-item-holder');
         
         
         $list__item.on('click', function (event) {
            event.stopPropagation();
            let text = $(this).find('.filter__text').html();
            $chosen_panel_text.html(text);
            let type = $(this).find('.filter__data').data('filter'),
                current = $(this).closest('.filters__list').attr('id'),
                current_type = current.split('-')[1],
                concat = '.' + type + '__' + current_type,
                needed = $holder.find(concat),
            
            target = needed.closest('.element-item-holder');
            // console.log('type: ' + type);
            // console.log('current: ' + current);
            // console.log('current_type: ' + current_type);
            // console.log('concat: ' + $(concat));
            // console.log('needed: ' + needed);
            // console.log('target: ' + target);
            
            $item.hide();
            target.show();
            
            addSideClass($holder, target);
         });
      }
      
      function clickFilter_chosen_panel__no_filter() {
         let $chosen_panel = $('#filter_chosen_panel'),
            
            $holder = $('.elements-holder'),
            $item = $('.element-item-holder');
         
         $chosen_panel.on('click', function (event) {
            event.stopPropagation();
            $(this).hide();
            $item.show();
            
            addSideClass($holder, $item);
         });
      }
      
      function clickFilter_chose_icon__no_filter__close() {
         let $close_icon = $('#filters_close_icon'),
            $slider_icon = $('#filters_slider_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $chosen_panel = $('#filter_chosen_panel'),
            
            $holder = $('.elements-holder'),
            $item = $('.element-item-holder');
         
         $close_icon.on('click', function (event) {
            event.stopPropagation();
            $(this).hide();
            $slider_icon.fadeIn();
            $list_trigger.hide();
            $chosen_panel.hide();
            $item.show();
            $('.chosen-list-trigger').removeClass('chosen-list-trigger');
            
            addSideClass($holder, $item);
         });
      }
      
      $('#base_content_holder').on('click', function (event) {
         event.stopPropagation();
         let $list = $('.filters__list'),
            $back = $('#back'),
            $slider_icon = $('#filters_slider_icon'),
            $close_icon = $('#filters_close_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $chosen_panel = $('#filter_chosen_panel'),
            
            $holder = $('.elements-holder'),
            $item = $('.element-item-holder');
         
         
         if ($list.is(':visible')) {
            $list.slideUp(300);
            $back.hide();
            $('.chosen-list-trigger').removeClass('chosen-list-trigger');
         } else {
            $list.slideUp(300);
            $back.hide();
            $chosen_panel.hide();
            $slider_icon.fadeIn(300);
            $close_icon.hide();
            $list_trigger.slideUp(300);
            $item.show();
            
            addSideClass($holder, $item);
         }
      });
   }
});
