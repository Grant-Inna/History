$(function() {
  
  function openPanelButton( trigger, panel, holder, mainHolder ) {
      // открытие панели с местом, показ фона и добавление класса
     let $trigger = $(trigger),
         $panel = $(panel),
         $holder = $(holder),
         $mainHolder = $(mainHolder),
         $back = $('#back');
     
     
     $trigger.on( 'click', function(event) {
        event.stopPropagation();
        let this_main = $(this).closest($mainHolder),
            this_panel = $(this).closest($holder).find($panel);
   
        this_panel.slideDown(350);
        this_main.addClass('open up');
        $back.show();
        
        if (!this_main.hasClass('open up')) { this_main.addClass('open up'); }
     });
  }
   
   openPanelButton( '.icon-map-marker', '.event__place-panel',  '.event__place','.element-item', );
   openPanelButton( '.icon-concent', '.event__person-panel',  '.event__person','.element-item', );
   openPanelButton( '.event__more', '.event__more-panel',  '.event__about','.element-item');
   
   openPanelButton( '.person__icon-more', '.person__about-more-holder',  '.persons__one_person','.element-item');
   openPanelButton( '.person__icon-more', '.person__about-more',  '.persons__one_person','.element-item');
   
   openPanelButton( '.icon-map-marker', '.invention__place-panel',  '.invention__place','.element-item', );
   openPanelButton( '.invention__more', '.invention__more-panel',  '.invention__about','.element-item');
   
   function showCross ( holder, trigger, cross  ) {
      // появление крестика при открытии панели места если нет стрелочки + добавление класса иконке
      let $trigger = $(trigger),
          $holder = $(holder),
          $cross = $(cross);
   
      $trigger.on( 'click', function(event) {
         event.stopPropagation();
         let this_map_marker = $(this).closest($holder).find('.icon-more'),
             this_cross = $(this).closest($holder).find($cross);
   
         $(this).addClass('show');
         if ( !this_map_marker.length ) { this_cross.show(); }
      });
      
   }
   showCross('.element-item','.icon-map-marker', '.event__more .icon-cross');
   showCross('.element-item','.icon-concent', '.event__more .icon-cross');
   
   showCross('.element-item','.icon-map-marker', '.invention__more .icon-cross');
   
   function closePanelBack( holder, panel, cross, show ) {
      // итогом будет закрытие всех панелей и удаление класов при нажатии на задник или на крестик
      let $wrapper = $('.wrapper.base_holder'),
          $holder = $(holder),
          $panel = $(panel),
          $show = $(show),
          $cross = $(cross);
   
      $wrapper.on( 'click', function () {
         closeEverything( $holder, $panel );
         $cross.find('.icon-more').removeClass('cross');
      });
      $cross.on( 'click', function (event) {
         event.stopPropagation();
         closeEverything( $holder, $panel );
      });
      
      $show.on( 'click', function () {
         let sibling_marker = $(this).closest($holder).find('.show').not($(this)),
             sibling_panel = sibling_marker.next('.panel-extra-info');
         if ( sibling_marker.length ) {
            sibling_marker.removeClass('show');
            sibling_panel.hide();
         }
      });
   }
   
   closePanelBack('.element-item', '.panel-extra-info', '.event__more .icon-cross', '.icon-map-marker' );
   closePanelBack('.element-item', '.panel-extra-info', '.event__more .icon-cross', '.icon-concent' );
   
   closePanelBack('.element-item', '.person__about-more-holder', '', '' );
   closePanelBack('.element-item', '.person__about-more', '', '' );
   
   closePanelBack('.element-item', '.panel-extra-info', '.invention__more .icon-cross', '.icon-map-marker' );
   
   
   function closeEverything( holder, panel ) {
      // закрытие всего
      let $back = $('#back'),
         $holder = $(holder),
         $panel = $(panel);

      $holder.removeClass('open up');
      $back.hide();
      $panel.slideUp(300);
      $holder.find('.show').removeClass('show');
   }
   
   
  /* function openOutPanel( trigger, panel  ) {
      // отдельная функция для открытие панели, что находится не в элементе
     let $trigger = $(trigger),
         trigger_div = $('div[data-trigger]'),
         current = $(this).closest(trigger_div);
     
     $trigger.on( 'click', function(event) {
        event.stopPropagation();
        let trigger_data = $(this).closest(trigger_div).data('trigger');
        
        $(panel + '#' + trigger_data + '-tooltip').slideDown(350).addClass('up');
        $(this).css( 'width', '90%' );
        
        let offsetTop = current.get(0).getBoundingClientRect().top - main_holder.get(0).getBoundingClientRect().top - 3;
        
     });
  }
    openOutPanel( '.invention__more', '.invention__more-panel' );*/
});
