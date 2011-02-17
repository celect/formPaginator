describe("specing out page brakes", function() {
  var custom_form;

  beforeEach(function() {
    loadFixtures('index4.html');
    custom_form = $('#the_form').paginateFormUITools();
  });

  it('has more than 0 page breaks', function () {
    var page_breaks = custom_form.find('div.page_break');
    expect(page_breaks.length).toBeGreaterThan( 0 );
  });

  it("is a parent node", function() {
    var pp = custom_form.find(':parent');
    expect(pp.length).toBeGreaterThan( 0 );
  });
});
