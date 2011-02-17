describe("jquery.formPaginator", function() {
  var custom_form;

  describe("no page brakes", function() {

    beforeEach(function() {
      jasmine.getFixtures().set('<form id="the_form" class="custom_form"/>');
      custom_form = $('#the_form').paginateFormUITools();
    });

    it("has no page breaks", function() {
      page_breaks = custom_form.find('div.page_break');
      expect(page_breaks.length).toEqual( 0 );
    });

    it("is not a parent node", function() {
      pp = custom_form.find(':parent');
      expect(pp.length).toEqual( 0 );
    });
  });

  describe("with page brakes", function() {

    beforeEach(function() {
      jasmine.getFixtures().set('<form id="the_form" class="custom_form"><div class="page_break" /></form>');
      custom_form = $('#the_form').paginateFormUITools();
    });

    it("has more than 0 page breaks", function() {
      page_breaks = custom_form.find('div.page_break');
      expect(page_breaks.length).toBeGreaterThan( 0 );
    });

    it("is a parent node", function() {
      pp = custom_form.find(':parent');
      expect(pp.length).toBeGreaterThan( 0 );
    });
  });
});

