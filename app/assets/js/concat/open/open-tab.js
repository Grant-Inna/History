$(function() {
   /* One item page tabs */
   
   function openTab( content, tabsBlock ) {
      $( '#trigger' + content ).click( function() {
         if ( $(this).hasClass( 'active-tab' )) {
         } else {
            $( tabsBlock + ' .tablink.active-tab ' ).removeClass( 'active-tab' );
            $( tabsBlock + ' .tabcontent.visible-tab' ).removeClass( 'visible-tab' );
            $(this).addClass( 'active-tab' );
            $( '#' + content ).addClass( 'visible-tab' );
         }
      });
   }
    openTab( 'Period', '#tabsDates' );
    openTab( 'Dates', '#tabsDates' );
    
    openTab( 'Person', '#tabsPeople' );
    openTab( 'Nation', '#tabsPeople' );
   
   
   function openPage(pageName, th, activeClassName, visibleClass) {
      var current, nowVisible, content;
      
      current = document.getElementsByClassName(activeClassName);
      current[0].className = current[0].className.replace(activeClassName, "");
      th.className += " " + activeClassName;
      
      nowVisible = document.getElementsByClassName(visibleClass);
      nowVisible[0].className = nowVisible[0].className.replace(visibleClass, "");
      
      content = document.getElementById(pageName);
      content.className += " " + visibleClass;
   }
   
});
