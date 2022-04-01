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
