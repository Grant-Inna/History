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
      
      $('#base_content_holder').on('click', function (event) {
         event.stopPropagation();
         closeEverything();
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
      $('.base_panel_info').slideUp(100);
      $('.base_panel').slideUp(100);
      $('#back').hide();
      $('.icon-trigger-more .icon-more').show();
      $('.icon-trigger-more .icon-cross').hide();
   }
   
});
