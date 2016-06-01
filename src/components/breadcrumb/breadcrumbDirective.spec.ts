'use strict';

import * as ng from 'angular';

describe('breadcrumbDirective <uif-breadcrumb />', () => {
  let element: JQuery;
  let scope: any;

  /**
   * before each test load all required modules
   */
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.breadcrumb');
  });

  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function, $window: ng.IWindowService) => {

    $window.innerWidth = 800;

    let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
    scope = $rootScope;
    scope.breadcrumbLinks = [
      {href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1'},
      {href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2'},
      {href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3'},
      {href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4'}
    ];

    element = $compile(html)(scope);    // jqLite object
    element = jQuery(element[0]);       // jQuery object

    scope.$digest();
  }));

  it('should not have is-overflow class', () => {
    expect(element).not.toHaveClass('is-overflow');
  });

  it('should create correct HTML', () => {
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
      // ... with correct tabindex...
      expect(aElement[0]).toHaveAttr('tabindex', `${itemIndex + 2}`);
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

  describe('responsive breadCrumb', () => {
    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {

      let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
      scope = $rootScope.$new();
      scope.breadcrumbLinks = [
        {href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1'},
        {href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2'},
        {href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3'},
        {href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4'},
        {href: 'http://ngofficeuifabric.com/5', linkText: 'ngOfficeUiFabric-5'},
        {href: 'http://ngofficeuifabric.com/6', linkText: 'ngOfficeUiFabric-6'}
      ];

      element = $compile(html)(scope);    // jqLite object
      element = jQuery(element[0]);       // jQuery object

      scope.$digest();
    }));

    it('large screen: max 4 items should be visible', () => {

      let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');

      expect(visibleLinks.length === 4).toBeTruthy();

      let firstLink: JQuery = visibleLinks.eq(0).find('a');
      expect(firstLink).toHaveAttr('href', 'http://ngofficeuifabric.com/3');

      let lastLink: JQuery = visibleLinks.eq(3).find('a');
      expect(lastLink).toHaveAttr('href', 'http://ngofficeuifabric.com/6');
    });

    it('large screen: max 2 items should be in contextual menu', () => {

      let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');

      expect(overflowLinks.length === 2).toBeTruthy();

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
      inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService, $window: ng.IWindowService
      ) => {

      $window.innerWidth = 620; // must be less than breaking point

      let html: string = '<uif-breadcrumb uif-breadcrumb-links="breadcrumbLinks"></uif-breadcrumb>';
      scope = $rootScope.$new();
      scope.breadcrumbLinks = [
        {href: 'http://ngofficeuifabric.com/1', linkText: 'ngOfficeUiFabric-1'},
        {href: 'http://ngofficeuifabric.com/2', linkText: 'ngOfficeUiFabric-2'},
        {href: 'http://ngofficeuifabric.com/3', linkText: 'ngOfficeUiFabric-3'},
        {href: 'http://ngofficeuifabric.com/4', linkText: 'ngOfficeUiFabric-4'},
        {href: 'http://ngofficeuifabric.com/5', linkText: 'ngOfficeUiFabric-5'},
        {href: 'http://ngofficeuifabric.com/6', linkText: 'ngOfficeUiFabric-6'}
      ];

      element = $compile(html)(scope);    // jqLite object
      element = jQuery(element[0]);       // jQuery object

      scope.$digest();

      let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length === 2).toBeTruthy();

      let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length === 4).toBeTruthy();


    }));

    it('should change breadcrumb count on resize', inject(($window: ng.IWindowService) => {

      let visibleLinks: JQuery = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length === 4).toBeTruthy();

      let overflowLinks: JQuery = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length === 2).toBeTruthy();

      // narrow down window
      $window.innerWidth = 620; // must be less than breaking point
      ng.element($window).triggerHandler('resize');
      scope.$digest();

      visibleLinks = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length === 2).toBeTruthy();

      overflowLinks = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length === 4).toBeTruthy();

      // back to normal
      $window.innerWidth = 800; // must be less than breaking point
      ng.element($window).triggerHandler('resize');
      scope.$digest();

      visibleLinks = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length === 4).toBeTruthy();

      overflowLinks = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length === 2).toBeTruthy();

      // set the same size again (for branch coverage ;))
      ng.element($window).triggerHandler('resize');
      scope.$digest();

      visibleLinks = element.find('.ms-Breadcrumb-list li');
      expect(visibleLinks.length === 4).toBeTruthy();

      overflowLinks = element.find('.ms-ContextualMenu li');
      expect(overflowLinks.length === 2).toBeTruthy();
    }));

  });
});
