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
