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
