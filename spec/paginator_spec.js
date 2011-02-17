describe("specing out page brakes", function() {
  var custom_form;

  beforeEach(function() {
    loadFixtures('form_fixture.html');
    custom_form = $('.custom_form').paginateFormUITools();
  });

  it('has 3 tabbed page links', function () {
    var tabbed_page_links = custom_form.find('ul.tabs a');
    expect(tabbed_page_links.length).toEqual(3);
  });
});
