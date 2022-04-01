$(document).ready(function () {
   /* tooltip */
   
   if ($('.inventions__one_invention').length > 0) {
      
      let main_holder = $('.inventions__holder'),
         element_holder = $('.inventions__one_invention'),
         elem_holder_height = parseFloat(element_holder.outerHeight()),
         open_trigger = $('.invention__more'),
         close_trigger = $('.invention__icon .icon-cross');
      
      $(window).on('resize', function () {
         elem_holder_height = parseFloat(element_holder.outerHeight());
      });
      
      open_trigger.on('click', showTooltip);
      close_trigger.on('click', hideTooltip);
      
      function showTooltip() {
         let current = $(this).closest(element_holder),
            current_data = current.data("trigger");
         let element = $('#' + current_data);
         
         element.css('min-height', `${elem_holder_height + 20}px`);
         element.addClass('up');
         element.slideDown();
         
         let offsetTop = current.get(0).getBoundingClientRect().top - main_holder.get(0).getBoundingClientRect().top - 3;
         element.css('top', offsetTop);
         
      }
      
      function hideTooltip() {
         let current_data = $(this).closest(element_holder).data("trigger");
         let element = $('#' + current_data);
         element.removeClass('up');
         element.slideUp();
      }
   }
   
   $('.invention__more-panel p').on('click', function (event) {
      event.stopPropagation()
   })
   
});

$(function(){
   function openAccordion( parent, ask, answer ) {
      const $parent =  $('.period__' + parent),
            $ask =  $('.period__' + ask),
            $answer = $('.period__' + answer),
            $all_answer = $('div[class$=about]'),
            $icon = $('.icon-arrow');
   
      $ask.on('click', function(){
         let current = $(this).parent($parent).find($answer),
             current_icon = $(this).find($icon);
         $all_answer.not(current).slideUp(350);
         current.slideToggle(350);
         $icon.not(current_icon).removeClass('active');
         current_icon.addClass('active');
      });
   }
   
   openAccordion( 'holder', 'name', 'about' );
   openAccordion( 'big_holder', 'big_name', 'big_about' );
});

$(function () {
   /* filters */
   
   'use strict';
   
   if ($('#Filters_slider_icon').length) {
      
      $('#Filters_slider_icon').on('click', function (event) { // при нажтии на иконку слайдера всё начинается
         event.stopPropagation();
         // скрытие #Filters_slider_icon, #Filters_close_icon и .filters__list_trigger
         hideFilters_slider_icon__showSome();
         
         // при нажатии на .filters__list_trigger появляется .соответствующий #Filter_type и размывающий задник
         clickFilters_list_trigger__showFilters_list();
         
         // при нажатии на .filters__list item появляется #Filter_chosen_panel...
         // ... пропадает размывающий задник, .filters__list и копируется текст выбора...
         clickFilters_list_item__showFilter_chosen_panel();
         
         // происходит фильтрация + сортировка
         clickFilters_list_item__filter();
         
         // при нажатии на #Filter_chosen_panel пропадает фильтрация и она сама
         clickFilter_chosen_panel__no_filter();
         
         // при нажатии на #Filters_close_icon или тело страницы пропадает фильтрация и всё закрывается
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
         let $slider_icon = $('#Filters_slider_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $close_icon = $('#Filters_close_icon');
         
         $slider_icon.hide();
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
            $('#Filter_type-' + type).slideDown(300);
            $back.show();
         });
      }
      
      function clickFilters_list_item__showFilter_chosen_panel() {
         let $list = $('.filters__list'),
            $list__item = $('.filters__list .filters__item'),
            $chosen_panel = $('#Filter_chosen_panel'),
            $chosen_panel_text = $('#Filter_chosen_panel .filter__chosen_text'),
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
            $chosen_panel_text = $('#Filter_chosen_panel .filter__chosen_text'),
            
            $holder = $('.elements-holder'),
            $item = $('.element-item-holder');
         
         
         $list__item.on('click', function (event) {
            event.stopPropagation();
            let text = $(this).find('.filter__text').html();
            $chosen_panel_text.html(text);
            
            let type = $(this).find('.filter__data').data('filter'),
               current = $(this).closest('.filters__list').attr('id'),
               current_type = current.split('-')[1],
               needed = $holder.find('.' + type + '__' + current_type),
            
            target = needed.closest('.element-item-holder');
            console.log(target);
            
            $item.hide();
            target.show();
            
            addSideClass($holder, target);
         });
      }
      
      function clickFilter_chosen_panel__no_filter() {
         let $chosen_panel = $('#Filter_chosen_panel'),
            
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
         let $close_icon = $('#Filters_close_icon'),
            $slider_icon = $('#Filters_slider_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $chosen_panel = $('#Filter_chosen_panel'),
            
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
            $slider_icon = $('#Filters_slider_icon'),
            $close_icon = $('#Filters_close_icon'),
            $list_trigger = $('.filters__list_trigger'),
            $chosen_panel = $('#Filter_chosen_panel'),
            
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

$(function () {
   
   'use strict';
   
   if ($('.base_icons_holder').length) {
      // унивесрсальный скрипт для открытия панелей с дополнительной информацией
      // у иконок data атрибут вида data-info='image', у панелей класс .info_image
      
      let $trigger = $('.base_icons_holder .base_icon'),
         $panel_info = $('.base_panel_info'),
         $base_main_info = $('.base_icon-big, .base_main_info, .icon-trigger-more'),
         $back = $('#back'),
         $cross = $('.icon-trigger-more .icon-cross'),
         $more = $('.icon-trigger-more .icon-more');
      
      $trigger.on('click', function (event) {
         event.stopPropagation();
         if ($(this).hasClass('icon-light')) {
            return false
         } else {
            $panel_info.slideUp();
            
            let $sphere = $(this).data('info'),
               $holder = $(this).closest('.element-item-holder'),
               target = $holder.find('.info_' + $sphere),
               current_main_info = $holder.find($base_main_info);

            target.slideDown(300);
            $back.show();
            
            $(this).addClass('up');
            current_main_info.addClass('up');
            
            let more_icon = $holder.find('.icon-more'),
               close_icon = $holder.find('.icon-cross');
            
            more_icon.hide();
            close_icon.show();
         }
      });
      
      $back.on('click', function (event) {
         event.stopPropagation();
         closeEverything();
      });
      $cross.on('click', function (event) {
         event.stopPropagation();
         closeEverything();
      });
   }
   
   function closeEverything() {
      $('.up').removeClass('up');
      $('.base_panel_info').slideUp();
      $('#back').hide();
      $('.icon-trigger-more .icon-more').show();
      $('.icon-trigger-more .icon-cross').hide();
   }
   
});

$(function() {
   /* One item page tabs */
   
   function openTab( content, tabsBlock ) {
      $( '#trigger' + content ).click( function() {
         if ( $(this).hasClass( 'active-tab' )) {
         } else {
            $( tabsBlock + ' .tablink.active-tab ' ).removeClass( 'active-tab' );
            $( tabsBlock + ' .tabcontent.visible-tab' ).removeClass( 'visible-tab' );
            $(this).addClass( 'active-tab' );
            $( '#' + content ).addClass( 'visible-tab' );
         }
      });
   }
    openTab( 'Period', '#tabsDates' );
    openTab( 'Dates', '#tabsDates' );
    
    openTab( 'Person', '#tabsPeople' );
    openTab( 'Nation', '#tabsPeople' );
   
   
   function openPage(pageName, th, activeClassName, visibleClass) {
      var current, nowVisible, content;
      
      current = document.getElementsByClassName(activeClassName);
      current[0].className = current[0].className.replace(activeClassName, "");
      th.className += " " + activeClassName;
      
      nowVisible = document.getElementsByClassName(visibleClass);
      nowVisible[0].className = nowVisible[0].className.replace(visibleClass, "");
      
      content = document.getElementById(pageName);
      content.className += " " + visibleClass;
   }
   
});

$(document).ready(function(){
   /* tooltip */
   
   if ( $('.concepts__one_concept').length > 0 ) {
      
      let main_holder = $('.concept__about'),
         element_holder = $('.concepts__one_concept'),
         open_trigger = $('.concept__source-icon');
      
      open_trigger.on('mouseenter', showTooltip);
      open_trigger.on('mouseleave', hideTooltip);
   
      function showTooltip() {
         let current_holder = $(this).closest(element_holder),
             elem_holder_width = parseFloat(current_holder.outerWidth()),
             elem_holder_height = parseFloat(current_holder.outerHeight()),
             elem_holder_right = current_holder.get(0).getBoundingClientRect().right;
         
         let element = $(this).closest(element_holder).find('.concept__source-text');
   
         // element.css( 'top', `${ elem_holder_height + 20 }px`);
         // element.css( 'right', `${ elem_holder_right}px`);
         element.css( 'width', `${ elem_holder_width}px`);
         element.addClass('up');
         $('#back').show();
         element.slideDown();
         // let offsetTop = current.get(0).getBoundingClientRect().top - main_holder.get(0).getBoundingClientRect().top - 3;
         // element.css( 'top', offsetTop );
         
      }
      function hideTooltip() {
         let current_data = $(this).closest(element_holder).data("trigger");
         let element = $('#' + current_data);
         element.removeClass('up');
         element.slideUp();
      }
   }
   
   $('.invention__more-panel p').on('click', function (event) {
      event.stopPropagation()
   })
   
});

function addSideClass( holder, target ) {
   // функция для чередования на странице timeline + до определённой ширины
   if ($('.timeline__holder').length && innerWidth > 580 ) {
      let $holder = $(holder),
         $element = $(target);
      
      let number = $holder.find($element).length;

      $.each($element, function (id, item) {
         $(item).removeClass('odd');
         $(item).removeClass('even');
         if (number > 0) {
            if (id % 2 == 0)
               $(item).addClass('even');
            else
               $(item).addClass('odd');
         }
      })
   }
}
   /*
   function addSideClass( holder, element ) {
      // функция для чередования
      let $holder = $(holder),
         $element = $(element);
      
      let number = $holder.find($element).length;
      
      $.each($element, function(id, item) {
         $(item).removeClass('odd');
         $(item).removeClass('even');
         if ( number > 0 ) {
            if (id % 2 == 0)
               $(item).addClass('even');
            else
               $(item).addClass('odd');
         }
      })
   }
   */
   
   
   $(document).ready(function () {
      
      function sortItems(holder, element, q) {
         // функция, сортирующая записи по алфавиту
         
         let $holder = $(holder),
            $element = $(element);
         
         $element.sort(function (a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
         });
         $.each($element, function (index, item) {
            $holder.append(item);
            
            if (+q > 0) { // нужно ли распределить по сторонам
               addSideClass($holder, $element);
            }
         });
      }
      
      sortItems('.person__holder', '.persons__one_person', '1');
      sortItems('.war__holder', '.wars__one_war', '');
      sortItems('.inventions__holder', '.inventions__one_concept', '');
      sortItems('.concepts__holder', '.concepts__one_event', '');
      
      function sortDates(holder, element, q) {
         // функция, сортирующая записи по алфавиту
         
         let $holder = $(holder),
            $element = $(element);
         
         $element.sort(function (a, b) {
            var compA = $(a).data('sort').toString();
            var compB = $(b).data('sort').toString();
            
            // console.log(compA);
            
            return (compA > compB) ? -1 : (compA > compB) ? 1 : 0;
         });
         $.each($element, function (index, item) {
            $holder.append(item);
            
            if (+q > 0) { // нужно ли распределить по сторонам
               addSideClass($holder, $element);
            }
         });
      }
      
      sortDates('.timeline__holder', '.timeline__item', '1');
      sortDates('.events__holder', '.events__one_event', '');
      
      /*   var isAscOrder = true;
         $("#sort").click(function () {
            var $holder = $('.elements-holder');
            var element = $holder.children('div').get();
            
            element.sort(function(a, b) {
               var compA = $(a).text().toUpperCase();
               var compB = $(b).text().toUpperCase();
               
               return (isAscOrder ? 1 : -1) * ((compA < compB) ? -1 : (compA > compB) ? 1 : 0);
            });
            
            isAscOrder = !isAscOrder;
            
            $.each(element, function(idx, itm) { $holder.append(itm); });
         });*/
   });

$(document).ready(function(){
   /* index tooltip */
   
   if ( $('#index-tooltip').length > 0 ) {
      let holder = $('.header__title'),
         wrapper_padding = parseFloat($('.header__holder.wrapper').css('padding-left'));
   
      holder.on('mouseenter', showIndexTooltip);
      holder.on('mouseleave', hideIndexTooltip);
   
      function showIndexTooltip() {
         let element = $('#index-tooltip');
         element.show();
      
         let offsetTop = this.getBoundingClientRect().bottom + 40;
         element.css( 'top', `${ offsetTop }px` );
      
         element.css( 'left', wrapper_padding / 1.3 );
         element.css( 'right', wrapper_padding / 1.3 );
      
         let offsetLeft = this.getBoundingClientRect().left + wrapper_padding;
         element.find('.tooltip__arrow').css( 'left', (offsetLeft - 20) ) // 20 тут - половина ширины стрелочки
      }
      function hideIndexTooltip() {
         let element = $('#' + $(this).data("trigger"));
         element.hide();
      }
   
   }
   
   
});

$(document).ready(function(){
   /* tooltip */
   if ( $('.menu__items').length > 0 ) {
      let links_holder = $('.menu__items'),
         wrapper_padding = parseFloat($('.menu__content .wrapper').css('padding-left')),
         t_trigger = $('.menu__item');
   
      t_trigger.on('mouseenter', showTooltip);
      t_trigger.on('mouseleave', hideTooltip);
   
      function showTooltip() {
         let element = $('#' + $(this).data("trigger"));
         element.show();
      
         let offsetTop = this.getBoundingClientRect().bottom - links_holder.get(0).getBoundingClientRect().top + 45;
         element.css( 'top', offsetTop );
      
         let elementWidth =  links_holder.outerWidth() - (wrapper_padding * 2);
         element.css( 'width', `${ elementWidth }px`);
         element.css( 'left', wrapper_padding );
      
         let offsetLeft = this.getBoundingClientRect().left - links_holder.get(0).getBoundingClientRect().left,
            triggerWidth = $(this).outerWidth();
         element.find('.tooltip__arrow').css( 'left', (offsetLeft + triggerWidth / 2 - wrapper_padding - 17) ) // число 17 - половина от ширины стрелки (сейчас это 35)
      }
      function hideTooltip() {
         let element = $('#' + $(this).data("trigger"));
         element.hide();
      }
   }
   
   
});
