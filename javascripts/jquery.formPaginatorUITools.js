/**
  
  This version of paginateForm works with jQuery Tools instead of with the regular jQueryUI Tabs

  Dependencies
    - jQuery Tools
*/

(function($) {

  $.fn.paginateFormUITools = function(settings) {
    var config = {pageSize: 2};
    if (settings) {
      $.extend(config, settings);
    }

    this.each(function() {
      var $this = $(this);
      
      var $pageBreaks = $this.find('div.page_break');
      debug($pageBreaks);
      
      if ($pageBreaks.length > 0) {
        debug("Yep, there are page breaks here... let's process them");


        // wrap everything in a single pages div to give tabs something to attach to
        $this.children('div').wrapAll('<div id="wizard" />').wrapAll('<div class="panes" />');
        
        
        // find the indexes of all the page breaks
        var pageBreakIndices = [];
        var $fields = $('div.panes').children();
        $('div.page_break').each(function(i) {
          var parent = $(this).parent();
          pageBreakIndices[i] = $fields.index(parent);
        });
        
        debug('indices: ' + pageBreakIndices);
        var numOfPages = pageBreakIndices.length + 1;
        
        
        // split the divs into groups based on the position of the page break divs
        var slice_start = 0
            , slice_end = 0;
            
        for (var i = 0; i < pageBreakIndices.length; i++) {
          slice_end = pageBreakIndices[i];
          $fields.slice(slice_start, slice_end).wrapAll('<div></div>');
          slice_start = slice_end + 1;
        }
        $fields.slice(slice_end + 1).wrapAll('<div></div>');

        

        
        // add tab links
        $this.find('div#wizard').prepend(tabLinks(numOfPages));
        
        // remove the page break divs from dom so they don't mess things up
        // TODO figure out how to do this so it doesn't use .form-field
        $('div.panes').children('.form-field').remove();



        addNavButons(numOfPages);
        


      	$('ul.tabs', '#wizard').tabs('div.panes > div');
        addNavigationClickHandlers($('ul.tabs', '#wizard').data('tabs'));
      	
      }
    });

    return this;
  };


  function tabLinks(numTabs) {
    var links = '<ul class="tabs">';
    for (var i = 1; i < numTabs + 1; i++) {
      links += ('<li><a href="#">Page ' + i + '</a></li>');
    }
    links += '</ul>';

    return links;
  };

  

  function addNavButons(numOfPages) {
    $('div.panes').children().each(function(index) {
      if (index + 1 == 1) {
        $(this).append(nextPage());
      }
      else if (index + 1 == numOfPages) {
        $(this).append(previousPage());
      }
      else {
        $(this).append(previousPage()).append(nextPage());
      }
    });
  };
  function nextPage() {
    return '<input type="button" class="next" value="Next Page &rarr;">';
  };
  function previousPage() {
    return '<input type="button" class="previous" value="&larr; Previous Page">';
  };
  
  

  function addNavigationClickHandlers(api) {
    $("input.next", '#wizard').click(function() {
      api.next();
    });

    $("input.previous", '#wizard').click(function() {
      api.prev();
    });
  };
  
  function debug(obj) {
    if (window.console && window.console.log)
      window.console.log(obj);
  };

})(jQuery);
