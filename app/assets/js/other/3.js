$(function () {
   
   if ($('#container_3').length) {
      $('#container_3 .cell').on('click', function () {
         let current = this.closest('.cell');
         if (current.classList.contains('past')) {
            return false
         } else if (current.classList.contains('free')) {
            if ($('#container_3 .active').length > 0) {
               return false
            } else {
               
               activate(current);
               
               $('.holder_calendar .caption-active').on('click', function () {
                  deactivate(current);
               });
            }
         }
      });
      
      $('.holder_time .time').on('click', function () {
         let currentTime = this.closest('.time');
         
         if ($('.holder_time .time.click').length > 0) {
            return false
         } else {
            deeper(currentTime);
         }
      });
      $('.holder_time .caption-last').on('click', function () {
         surfacing();
      });
   }
   
   $('.holder_result .button').on( 'click', function() {
      $('.popup_holder').fadeIn();
   });
   $('.btn_yes').on( 'click', function() {
      $('.popup_holder').fadeOut();
      closeAll();
   });
   
   
   function activate(current) {
      let $current = $(current);
      $('.click').removeClass('click');
      $current.addClass('click');
      
      $('#container_3 .holder_main').css( 'width', 'auto');
      $('.time_holder').removeClass('chose_time');
      
      let text = $current.find('.hidden').text();
      $('.holder_result .result_date').text(text);
      
      $current.find('.text').css('display', 'none');
      $current.find('.text-active').fadeIn();
      $('.holder_calendar .caption').css('display', 'none');
      $('.holder_calendar .caption-active').fadeIn();
      $('.holder_time .caption-active').fadeIn();
      $('.holder_time .caption-last').hide();
      
      $current.closest('.holder_main').find('.holder_row').addClass('active');
      
      let ourID = current.id.split('_'),
         ourDate = ourID[1];
      $('.holder_time').animate({opacity: 1, width: '250px'}, 400);
      $('#time_' + ourDate).animate({
         paddingRight: '1rem',
         paddingLeft: '1rem',
         opacity: '1'
      }).fadeIn(400).css('display', 'flex');
   }
   function deactivate(current) {
      let $current = $(current);
      
      $('.click').removeClass('click');
      $('.holder_result').hide();
      $('#container_3 .holder_main').css( 'width', '665px');
      $current.find('.text-active').css('display', 'none');
      $current.find('.text').fadeIn(200);
      $('#container_3 .caption-active').css('display', 'none');
      $('#container_3 .caption').fadeIn();
      
      $current.closest('.holder_main').find('.holder_row').removeClass('active');
      
      let ourID = current.id.split('_'),
         ourDate = ourID[1];
      $('.holder_time').animate({opacity: '0', width: 0});
      $('#time_' + ourDate).css({paddingRight: '0', paddingLeft: '0', opacity: '0'}).hide();
   }
   
   
   function deeper(current) {
      let $current = $(current);
      $('.time.click').removeClass('click');
      $current.addClass('click');
      $('.holder_result .button').removeClass('disable');
      $('.time_holder').addClass('chose_time');
      $('#container_3 .holder_main').css( 'width', 'auto');
      
      let text = $current.text();
      $('.holder_result .result_time').html(text);

      $('.holder_time .caption-active').css('display', 'none');
      $('.holder_time .caption-last').fadeIn();
      
      $('.holder_result').fadeIn().css( 'display', 'flex' );
   }
   function surfacing () {
      $('.time_holder').removeClass('chose_time');
      $('.time.click').removeClass('click');
      $('.holder_result .result_time').html('');
      $('.time_holder').removeClass('chose_time');
   
      $('.holder_result .button').addClass('disable');
      
      $('.holder_time .caption-last').css('display', 'none');
      $('.holder_time .caption-active').fadeIn();
   }
   
   function closeAll () {
      $('.click').removeClass('click');
      $('.time_holder').removeClass('chose_time');
      $('.time.click').removeClass('click');
      $('.holder_calendar .caption').fadeIn();
      $('.holder_calendar .caption-active').hide();
      $('.holder_time .caption-active').hide();
      $('.holder_time .caption-last').hide();
      $('.holder_time').hide();
      $('.holder_result').hide();
      $('#container_3 .holder_main').css( 'width', '665px');
      $('.text-active').css('display', 'none');
      $('.text').fadeIn(200);
      $('#container_3 .cell').find('.text').fadeIn();
      $('.holder_main').find('.holder_row').removeClass('active');
   }
});
