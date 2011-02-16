(function($) {

  $.fn.paginateForm = function(settings) {
    var config = {pageSize: 2};

    if (settings) {
      $.extend(config, settings);
    }

    this.each(function() {
      var $pageBreaks = $('div.page_break');
      if ($pageBreaks.length > 0) {
        var $this = $(this);

        // find indexes of all page breaks
        var pageBreakIndexes = [];
        $('div.page_break').each(function(i) {
          pageBreakIndexes[i] = $('div').index(this);
        });

        var numOfPages = pageBreakIndexes.length + 1;

        // wrap everything in a single pages div to give tabs something to attach to
        $this.find('div').wrapAll('<div id="pages" />');

        // split the divs into groups based on the position of the page break divs
        var $fields = $this.find('div#pages div')
        , slice_start = 0
        , slice_end = 0;
        for (var i = 0; i < pageBreakIndexes.length; i++) {
          slice_end = pageBreakIndexes[i];
          $fields.slice(slice_start, slice_end).wrapAll('<div id="page-' + (i + 1) + '"></div>');
          slice_start = slice_end + 1;
        }
        $fields.slice(slice_end + 1).wrapAll('<div id="page-' + (i + 1) + '"></div>');

        addNavButons(numOfPages, pageBreakIndexes);
        addNavigationClickHandlers();

        // add tab links
        $this.find('div#pages').prepend(tabLinks(numOfPages));

        // remove the page break divs from dom so they don't mess things up
        $('.page_break').remove();

        $('div#pages').tabs();
      }
    });

    return this;
  };


  function tabLinks(numTabs) {
    var links = '<ul>';
    for (var i = 1; i < numTabs + 1; i++) {
      links += ('<li><a href="#page-' + i + '">Page ' + i + '</a></li>');
    }
    links += '</ul>';

    return links;
  };

  function nextPage() {
    return '<input type="button" class="next" value="Next Page &rarr;">';
  };

  function previousPage() {
    return '<input type="button" class="previous" value="&larr; Previous Page">';
  };

  function addNavButons(numOfPages, pageBreakIndexes) {
    for (var i = 1; i <= numOfPages + 1; i++) {
      if (i == 1) {
        $('#page-' + i).append(nextPage());
      }
      else if (i == pageBreakIndexes.length + 1) {
        $('#page-' + i).append(previousPage());
      }
      else {
        $('#page-' + i).append(previousPage()).append(nextPage());
      }
    }
  };

  function addNavigationClickHandlers() {
    $(".next").click(function() {
      var $tabs = $('#pages').tabs();
      var selected = $tabs.tabs('option', 'selected');

      $tabs.tabs("select", selected + 1)
    });

    $(".previous").click(function() {
      var $tabs = $('#pages').tabs();
      var selected = $tabs.tabs('option', 'selected');

      $tabs.tabs("select", selected - 1)
    });
  };

})(jQuery);
