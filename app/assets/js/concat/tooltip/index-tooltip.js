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
