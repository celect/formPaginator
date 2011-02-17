describe("Toms specs", function() {
  var custom_form;

  beforeEach(function() {
    loadFixtures('index2.html');
    // custom_form = $('#test').paginateFormUITools();
  });

  it('has more than 0 page breaks', function () {
    // var page_breaks = custom_form.find('div.page_break');
    // expect(page_breaks.length).toBeGreaterThan( 0 );
    expect($('.next')).toExist();
  });


});
