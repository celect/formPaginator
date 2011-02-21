describe("jquery.formPaginatorUITools.js", function() {

  var custom_form;

  beforeEach(function() {
    loadFixtures('form_fixture.html');
    custom_form = $('.custom_form').paginateFormUITools();
  });

  describe("nextPage()", function() {
    it('has a "next" button', function () {
      expect($('.next')).toExist();
    });
    it('has a "next" button that is visible', function () {
      expect($('.next')).toBeVisible();
    });

    it('remove page breaks', function () {
      expect($('.custom_form')).not.toContain('div.page_break');
    });
  });

  describe("previousPage()", function() {
    it('has a "previous" button', function () {
      expect($('.previous')).toExist();
    });
    it('has a "prev" button that is not visible', function () {
      expect($('.previous')).not.toBeVisible();
    });
  });

  describe("page content and layout", function() {
    it('should contain a signle panes div', function () {
      var panes = $('.custom_form div.panes')
      expect(panes.length).toEqual(1);
    });

    it('should only display a single virtual page', function () {
      $('div.panes > div').each(function(i) {
        if (i == 0) {
          expect($(this)).toBeVisible();
        } else {
          expect($(this)).not.toBeVisible();
        }
      });
    });
  });
});