import * as angular from 'angular';

describe('breadcrumb: <uif-breadcrumb />', () => {
  let element: JQuery;
  let scope: any;

  /**
   * before each test load all required modules
   */
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.breadcrumb');
  });

  describe('browser width>=800px', () => {

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $window: angular.IWindowService) => {
      let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
      scope = $rootScope;
      scope.breadcrumbLinks = [
        { href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1' },
        { href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2' },
        { href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3' },
        { href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4' }
      ];

      element = $compile(html)(scope);    // jqLite object
      element = jQuery(element[0]);       // jQuery object

      scope.$digest();
    }));

    it('should not have is-overflow class', () => {
      // get the element scope
      let directiveScope: any = angular.element(element).isolateScope();
      // force recalculation on size
      directiveScope.onResize(800);

      scope.$digest();

      expect(element).not.toHaveClass('is-overflow');
    });

    it('should create correct HTML', () => {
      // get the element scope
      let directiveScope: any = angular.element(element).isolateScope();
      // force recalculation on size
      directiveScope.onResize(800);

      // verify top breadcrumb container & correct style
      expect(element.prop('tagName')).toEqual('DIV');
      expect(element[0]).toHaveClass('ms-Breadcrumb');

      // verify nested should contain UL
      expect(element.find('ul').length).toBe(2);
      let ulElement: JQuery = element.find('ul');
      expect(ulElement[1]).toHaveClass('ms-Breadcrumb-list');

      // look at all list items...
      // ... get all list items...
      let liElements: JQuery = ulElement.find('li');
      // ... make sure there are 4 of them
      expect(liElements.length).toBe(4, 'should only 4 list items present');

      // loop through all list items...
      for (let itemIndex: number = 0; itemIndex < liElements.length; itemIndex++) {
        // for the list item...
        let liElement: JQuery = $(liElements.get(itemIndex));

        // make sure it has correct css
        expect(liElement[0]).toHaveClass('ms-Breadcrumb-listItem');

        // make sure it has exactly 1 nested link...
        expect(liElement.find('a').length).toBe(1, 'expected to find exactly 1 <a> element');
        let aElement: JQuery = liElement.find('a');
        // ... with correct style...
        expect(aElement[0]).toHaveClass('ms-Breadcrumb-itemLink');
        // ... with correct target...
        expect(aElement[0]).toHaveAttr('href', `http://ngofficeuifabric.com/${itemIndex + 1}`);
        // ... with correct value...
        expect(aElement[0].innerText).toBe(`ngOfficeUiFabric-${itemIndex + 1}`);

        // make sure it has exactly 1 cheveron icon...
        let iElement: JQuery = liElement.find('i');
        expect(iElement.length).toBe(1);
        // ... with correct styles...
        expect(iElement[0]).toHaveClass('ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight');
      }

    });
  });


  describe('responsive breadcrumb', () => {

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {

      let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
      scope = $rootScope.$new();
      scope.breadcrumbLinks = [
        { href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1' },
        { href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2' },
        { href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3' },
        { href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4' },
        { href: 'http://ngofficeuifabric.com/5', linkText: 'ngOfficeUiFabric-5' },
        { href: 'http://ngofficeuifabric.com/6', linkText: 'ngOfficeUiFabric-6' }
      ];

      element = $compile(html)(scope);    // jqLite object
      element = jQuery(element[0]);       // jQuery object

      scope.$digest();
    }));

    it('large screen: max 4 items should be visible', () => {
      // get the element scope
      let directiveScope: any = angular.element(element).isolateScope();
      // force recalculation on size
      directiveScope.onResize(800);

      let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');

      expect(visibleLinks.length).toBe(4);

      let firstLink: JQuery = visibleLinks.eq(0).find('a');
      expect(firstLink).toHaveAttr('href', 'http://ngofficeuifabric.com/3');

      let lastLink: JQuery = visibleLinks.eq(3).find('a');
      expect(lastLink).toHaveAttr('href', 'http://ngofficeuifabric.com/6');
    });

    it('large screen: max 2 items should be in contextual menu', () => {
      // get the element scope
      let directiveScope: any = angular.element(element).isolateScope();
      // force recalculation on size
      directiveScope.onResize(800);

      let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');

      expect(overflowLinks.length).toBe(2);

      let firstLink: JQuery = overflowLinks.eq(0).find('a');
      expect(firstLink).toHaveAttr('href', 'http://ngofficeuifabric.com/1');

      let lastLink: JQuery = overflowLinks.eq(1).find('a');
      expect(lastLink).toHaveAttr('href', 'http://ngofficeuifabric.com/2');
    });

    it('should have is-overflow class', () => {
      expect(element).toHaveClass('is-overflow');
    });

    it('should close overflow menu on click outside', () => {
      let overflowButton: JQuery = element.find('.ms-Breadcrumb-overflowButton');
      let overflowMenu: JQuery = element.find('.ms-Breadcrumb-overflowMenu');
      let body: JQuery = jQuery('body');

      expect(overflowMenu).not.toHaveClass('is-open');

      overflowButton.click();
      scope.$digest();

      expect(overflowMenu).toHaveClass('is-open');

      body.click();
      scope.$digest();

      expect(overflowMenu).not.toHaveClass('is-open');
    });

    it(
      'should display 2 on small screen initially',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService, $window: angular.IWindowService
      ) => {
        // get the element scope
        let directiveScope: any = angular.element(element).isolateScope();
        // set size to just under breaker & force recalculation on size
        directiveScope.onResize(620);

        let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
        scope = $rootScope.$new();
        scope.breadcrumbLinks = [
          { href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1' },
          { href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2' },
          { href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3' },
          { href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4' },
          { href: 'http://ngofficeuifabric.com/5', linkText: 'ngOfficeUiFabric-5' },
          { href: 'http://ngofficeuifabric.com/6', linkText: 'ngOfficeUiFabric-6' }
        ];

        element = $compile(html)(scope);    // jqLite object
        element = jQuery(element[0]);       // jQuery object

        scope.$digest();

        let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');
        expect(visibleLinks.length).toBe(2);

        let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');
        expect(overflowLinks.length).toBe(4);
      }));

    it('should change breadcrumb count on resize', inject(($window: angular.IWindowService) => {
      // get the element scope
      let directiveScope: any = angular.element(element).isolateScope();

      // start with normal size
      directiveScope.onResize(800);

      let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length).toBe(4);

      let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length).toBe(2);

      // narrow down window
      directiveScope.onResize(620);

      visibleLinks = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length).toBe(2);

      overflowLinks = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length).toBe(4);

      // back to normal
      directiveScope.onResize(800);

      visibleLinks = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length).toBe(4);

      overflowLinks = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length).toBe(2);
    }));

  });
});
