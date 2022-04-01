$(document).ready(function(){
   /* tooltip */
   
   if ( $('.concepts__one_concept').length > 0 ) {
      
      let main_holder = $('.concept__about'),
         element_holder = $('.concepts__one_concept'),
         open_trigger = $('.concept__source-icon');
      
      open_trigger.on('mouseenter click', showTooltip);
   
      function showTooltip() {
         let current_holder = $(this).closest(element_holder),
             elem_holder_width = parseFloat(current_holder.outerWidth()),
             elem_holder_height = parseFloat(current_holder.outerHeight()),
             elem_holder_right = current_holder.get(0).getBoundingClientRect().right;
         
         let element = $(this);
   
         // element.css( 'top', `${ elem_holder_height + 20 }px`);
         element.css( 'right', `${ elem_holder_right}px`);
         element.css( 'width', `${ elem_holder_width}px`);
         element.addClass('up');
         $('#back').show();
         element.slideDown();
   // добро пожаловать в мир создания кукол / кукединственные в своём роде
         let offsetTop = current.get(0).getBoundingClientRect().top - main_holder.get(0).getBoundingClientRect().top - 3;
         element.css( 'top', offsetTop );
         
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
