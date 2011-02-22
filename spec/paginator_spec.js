describe("jquery.paginateFormUITools", function() {
  var custom_form;

  // an empty form!  what do we get...  form elements, NO breaks,, then what?  one page break, (next, no prev, etc etc)

  // form, one form element, pg break, NOTHING after... next>  what??  next page only has prev?  maybe should strip out EMPTY pages...

  beforeEach(function () {
    this.addMatchers({
      toContainText: function(expected) {
        return this.actual.indexOf( expected ) >= 0;
      }
    });
  });

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
        expect($('input.next:first')).toBeVisible();
      });

      describe('clicking the "Next" link', function() {
        beforeEach(function (){
          var click = $.Event('click');
          $('input.next:first').trigger( click );
        });

        it('has a "Previous" button', function() {
          expect($('input.previous:first')).toBeVisible();
        });

        it('has a "Next" button', function() {
          expect($('input.next:eq(0)')).not.toBeVisible();
          expect($('input.next:eq(1)')).toBeVisible();
        });

        it('does not have a "Submit" button', function() {
          expect($('button.save')).not.toBeVisible();
        });

        describe('clicking the "Next" link again', function() {
          beforeEach(function (){
            var click = $.Event('click');
            $('input.next:eq(1)').trigger( click );
          });

          it('has a "Previous" button', function() {
            expect($('input.previous:eq(0)')).not.toBeVisible();
            expect($('input.previous:eq(1)')).toBeVisible();
          });

          it('has does not have a "Next" button', function() {
            expect($('input.next')).not.toBeVisible();
          });

          it('does have a "Submit" button', function() {
            expect($('button.save')).toBeVisible();
          });
        });
      });
    });
  });
});
