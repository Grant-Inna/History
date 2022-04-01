$(function() {
   /* filters */
  
  function openFilterPanel( trigger, panel, back ) {
     // итогом будет открытие панели фильтра и появление фона
     let $trigger = $(trigger),
         $panel = $(panel),
         $back = $(back);
     
     $trigger.on('click', function (event) {
        event.stopPropagation();
        $panel.slideToggle(350);
        if ($back.is(':visible')) { $back.hide() }
        else { $back.show(); }
     })
     
  }
  
  function choseFilter( trigger, panel, chosen ) {
     // итогом будет копирование информации с выбранного фильтра на отдельное поле
     let $trigger = $(trigger),
         $panel = $(panel),
         $panel_inner = $(panel + ' ' + chosen);
     
     $trigger.on('click', function (event) {
        event.stopPropagation();
        $panel.show();
        let text = $(this).find('.filter__text').html();
        $panel_inner.html(text);
     })
  }
  
  function closeFilterPanel( panel, chosen, back, filter ) {
     // закрытие панели фильтров при нажатии на задник, удаление фильтра или при выборе фильтра
     let $panel = $(panel),
         $chosen = $(chosen),
         $back = $(back),
         $wrapper = $('.wrapper.base_holder'),
         $filter = $(filter);
   
     $filter.on( 'click', function () {
        $panel.slideUp(300);
        $back.hide();
     });
     $chosen.on( 'click', function () {
        $panel.slideUp(300);
        $back.hide();
     });
     $wrapper.on( 'click', function () {
        $panel.slideUp(300)
     });
  }
  
  
  
   openFilterPanel('#triggerFilters', '#Filters', '#back' );
   closeFilterPanel('#Filters', '.filters__item', '#back', '#removeFilters' );
   choseFilter('.filters__item', '#removeFilters', '.filter__chosen' );
   
  
  function showOnlyFiltered( number, filter, holder, item, condition) {
      // при выборе фильтра скрывает записи, не подходящие под выбранную категорию + РАСПРЕДЕЛЕНИЕ
     let $filter = $(filter),
         $holder = $(holder),
         $item = $(item);
     
     let $conditions = $(condition);
   
     $filter.on('click', function () {
        let target;
        
        let type = $(this).find('.filter__icon').data('filter');
        if ( !number ) { target = $holder.find( '.' + type + '__event'); } // отделение страницы с датами
        else {  target = $holder.find( '.icon-' + type ).closest( item ); }
        
        $item.show();
        $item.not(target).hide();
        
        if ($conditions.length > 0 ) { // нужно ли распределение
           addSideClass($holder, target);
        }
     })
  }
  
   showOnlyFiltered( '', '.filters__item', '.elements-holder', '.element-item', '.timeline__holder');
   showOnlyFiltered( '1', '.filters__item', '.elements-holder', '.element-item', '.person__holder');
   showOnlyFiltered( '1', '.filters__item', '.elements-holder', '.element-item', '.concepts__holder');
  
  function showAllElements( trigger, holder, item ) {
      // показ всех дат при нажатии на поле с названием фильтра
     let $trigger = $(trigger),
         $holder = $(holder),
         $item = $(item);
   
     $trigger.on('click', function (event) {
        event.stopPropagation();
        $holder.find($item).show();
        $(this).hide();
        addSideClass( $holder, $item );
     })
  }
  
   showAllElements( '#removeFilters', '.elements-holder', '.element-item');
  
});
