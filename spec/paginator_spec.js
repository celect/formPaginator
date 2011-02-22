describe("jquery.paginateFormUITools", function() {
  var custom_form;

  // an empty form!  what do we get...  form elements, NO breaks,, then what?  one page break, (next, no prev, etc etc)

  // form, one form element, pg break, NOTHING after... next>  what??  next page only has prev?  maybe should strip out EMPTY pages...

  describe('an empty form', function() {
    it('has no page breaks', function() {
      jasmine.getFixtures().set('<form class="custom_form"/>')
      custom_form = $('.custom_form').paginateFormUITools();
      var tabbed_page_links = custom_form.find('.page_break');
      expect(tabbed_page_links.length).toEqual(0);
    });

    it('has no "Previous" button', function () {
      expect($('.previous')).not.toBeVisible();
    });

    it('has no "Next" button', function () {
      expect($('.next')).not.toBeVisible();
    });
  });


  describe('a 3 pagebreak form example', function() {
    beforeEach(function (){
      loadFixtures('form_fixture.html');
    });

    describe('without jquery fn', function() {
      it('has no page links', function () {
        custom_form = $('.custom_form');
        var tabbed_page_links = custom_form.find('ul.tabs a');
        expect(tabbed_page_links.length).toEqual(0);
      });
    });

    describe('with jquery fn', function() {
      beforeEach(function (){
        custom_form = $('.custom_form').paginateFormUITools();
      });

      it('has 3 tabbed page links', function () {
        var tabbed_page_links = custom_form.find('ul.tabs a');
        expect(tabbed_page_links.length).toEqual(3);
      });

      it('has no "Previous" button', function () {
        expect($('input.previous')).not.toBeVisible();
      });

      it('has a "Next" button', function () {
        // console.info('first')
        // console.info($('input.next'))
        expect($('input.next')).toBeVisible();
      });

      describe('clicking the "Next" link', function() {
        beforeEach(function (){
          var click = $.Event('click');
          $('input.next').trigger( click );
        });

        it('has a "Previous" button', function() {
          // console.info($('input.next'))
          expect($('input.previous')).toBeVisible();
        });

        it('has a "Next" button', function() {
          expect($('input.next')).toBeVisible();
        });

        it('does not have a "Submit" button', function() {
          expect($('button.save')).not.toBeVisible();
        });

      });
    });
  });
});
