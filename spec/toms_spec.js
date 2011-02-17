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



    // it('should call next_page function', function () {
    //   spyOn(custom_form, 'nextPage');
    //   expect(custom_form.nextPage).toHaveBeenCalled();
    // });




  });

  describe("previousPage()", function() {
    it('has a "previous" button', function () {
      expect($('.previous')).toExist();
    });
    it('has a "prev" button that is not visible', function () {
      expect($('.previous')).not.toBeVisible();
    });
  });

  // describe("other stuff", function() {
  //   it('remove page breaks', function () {
  //     expect($('div.page_break')).toExist();
  //   });
  // });
});