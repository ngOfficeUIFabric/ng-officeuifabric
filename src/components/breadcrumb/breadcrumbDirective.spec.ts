'use strict';

import * as ng from 'angular';

describe('breadcrumbDirective <uif-breadcrumb />', () => {
  let element: JQuery;
  let scope: ng.IScope;

  /**
   * before each test load all required modules
   */
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.breadcrumb');
  });

  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
    let html: string = '<uif-breadcrumb>' +
      '<uif-breadcrumb-link ng-href="http://ngofficeuifabric.com/1">ngOfficeUiFabric-1</uif-breadcrumb-link>' +
      '<uif-breadcrumb-link ng-href="http://ngofficeuifabric.com/2">ngOfficeUiFabric-2</uif-breadcrumb-link>' +
      '<uif-breadcrumb-link ng-href="http://ngofficeuifabric.com/3">ngOfficeUiFabric-3</uif-breadcrumb-link>' +
      '<uif-breadcrumb-link ng-href="http://ngofficeuifabric.com/4">ngOfficeUiFabric-4</uif-breadcrumb-link>' +
      '</uif-breadcrumb>';
    scope = $rootScope;

    element = $compile(html)(scope);    // jqLite object
    element = jQuery(element[0]);       // jQuery object

    scope.$digest();
  }));

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

});
