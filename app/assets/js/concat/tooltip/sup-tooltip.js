$(document).ready(function(){
   /* index tooltip */
   
   if ( $('#index-tooltip').length > 0 ) {
      let holder = $('.header__title'),
         wrapper_padding = parseFloat($('.header__holder.wrapper').css('padding-left')),
         wrapper_left = $('.header__holder.wrapper').offset().left,
         wrapper_right = $('.header__holder.wrapper').offset().right;
      
      holder.on('mouseenter', (event) => showIndexTooltip(event));
      holder.on('mouseleave', hideIndexTooltip);
      
      
      /*function showIndexTooltip() {
         
         let offsetTop = this.getBoundingClientRect().bottom + 20;
         element.css( 'top', `${ offsetTop }px` );
      
         element.css( 'left', wrapper_left + (wrapper_padding / 1.3));
         element.css( 'right', wrapper_right + (wrapper_padding / 1.3));
      
         console.log($(this).find('sup').offset().left);
         let offsetLeft = $(this).find('sup').offset().left;
         element.find('.tooltip__arrow').css( 'left', (offsetLeft - wrapper_padding) ) // 20 тут - половина ширины стрелочки
      }*/
      
      function showIndexTooltip(event) {
         let element = $('#index-tooltip');
         element.show();
         let $parent = $('.header__holder.wrapper');
      
         let offsetBottom = Number($('.header__title').offset().top) + $('.header__title').outerHeight() + 20;
         element.css( 'top', `${ offsetBottom }px` );

         let parentWidth = $parent.outerWidth();
         element.css( 'width', `${ parentWidth }px`);
         
         if ( $parent.offset().left === 0) {
            element.css( 'width', '94vw');
            element.css( 'left', '2vw');
            
            if ($(document).outerWidth() < 560) {
               element.css( 'width', '90vw');
               element.css( 'left', '3vw');
            }
         } else {
            element.css( 'width', `${ parentWidth }px`);
            element.css( 'left', $parent.offset().left);
         }
         
         element.find('.tooltip__arrow').css( 'left', (parentWidth * 15 ) / 100 + 'px');
      }
      function hideIndexTooltip() {
         let element = $('#' + $(this).data("trigger"));
         element.hide();
      }
      
      $(document).on( 'resize', () => {
         wrapper_padding = parseFloat($('.header__holder.wrapper').css('padding-left'));
         wrapper_left = $('.header__holder.wrapper').offset().left;
         wrapper_right = $('.header__holder.wrapper').offset().right;
      });
   }
   
   
      if ( $('#filters_decoding').length > 0 ) {
      
      let $trigger = $('#filters_decoding'),
          $target = $('#filter_help'),
          $close = $('#filters_decoding .icon-cross');
   
      $trigger.on( 'click', function( event ) {
         $(this).addClass('active'); 
         event.stopPropagation();
         $target.fadeToggle(100);
      });
      $close.on( 'click', function( event ) {
         $trigger.removeClass('active');
         event.stopPropagation();
         $target.fadeOut(100);
      });
      
   }
   
});
