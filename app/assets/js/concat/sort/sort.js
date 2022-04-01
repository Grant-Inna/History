function addSideClass( holder, target ) {
   // функция для чередования на странице timeline + до определённой ширины
   if ($('.timeline__holder').length && innerWidth > 580 ) {
      let $holder = $(holder),
         $element = $(target);
      
      let number = $holder.find($element).length;

      $.each($element, function (id, item) {
         $(item).removeClass('odd');
         $(item).removeClass('even');
         if (number > 0) {
            if (id % 2 == 0)
               $(item).addClass('even');
            else
               $(item).addClass('odd');
         }
      })
   }
}
   /*
   function addSideClass( holder, element ) {
      // функция для чередования
      let $holder = $(holder),
         $element = $(element);
      
      let number = $holder.find($element).length;
      
      $.each($element, function(id, item) {
         $(item).removeClass('odd');
         $(item).removeClass('even');
         if ( number > 0 ) {
            if (id % 2 == 0)
               $(item).addClass('even');
            else
               $(item).addClass('odd');
         }
      })
   }
   */
   
   
   $(document).ready(function () {
      
      function sortItems(holder, element, q) {
         // функция, сортирующая записи по алфавиту
         
         let $holder = $(holder),
            $element = $(element);
         
         $element.sort(function (a, b) {
            var compA = $(a).text().toUpperCase();
            var compB = $(b).text().toUpperCase();
            
            return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
         });
         $.each($element, function (index, item) {
            $holder.append(item);
            
            if (+q > 0) { // нужно ли распределить по сторонам
               addSideClass($holder, $element);
            }
         });
      }
      
      sortItems('.person__holder', '.persons__one_person', '1');
      sortItems('.war__holder', '.wars__one_war', '');
      sortItems('.inventions__holder', '.inventions__one_concept', '');
      sortItems('.concepts__holder', '.concepts__one_event', '');
      
      function sortDates(holder, element, q) {
         // функция, сортирующая записи по алфавиту
         
         let $holder = $(holder),
            $element = $(element);
         
         $element.sort(function (a, b) {
            var compA = $(a).data('sort').toString();
            var compB = $(b).data('sort').toString();
            
            // console.log(compA);
            
            return (compA > compB) ? -1 : (compA > compB) ? 1 : 0;
         });
         $.each($element, function (index, item) {
            $holder.append(item);
            
            if (+q > 0) { // нужно ли распределить по сторонам
               addSideClass($holder, $element);
            }
         });
      }
      
      sortDates('.timeline__holder', '.timeline__item', '1');
      sortDates('.events__holder', '.events__one_event', '');
      
      /*   var isAscOrder = true;
         $("#sort").click(function () {
            var $holder = $('.elements-holder');
            var element = $holder.children('div').get();
            
            element.sort(function(a, b) {
               var compA = $(a).text().toUpperCase();
               var compB = $(b).text().toUpperCase();
               
               return (isAscOrder ? 1 : -1) * ((compA < compB) ? -1 : (compA > compB) ? 1 : 0);
            });
            
            isAscOrder = !isAscOrder;
            
            $.each(element, function(idx, itm) { $holder.append(itm); });
         });*/
   });
