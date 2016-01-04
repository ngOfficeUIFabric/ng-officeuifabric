'use strict';

import * as ng from 'angular';

describe('iconDirective: <uif-icon />', () => {
  let element: ng.IAugmentedJQuery;
  let scope: ng.IScope;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.icon');
  });

  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
    element = ng.element('<uif-icon uif-type="arrowDownLeft" />');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  /**
   * Verifies directive generates the correct HTML element.
   */
  it('should render correct HTML', () => {
    // get the rendered icon element
    let iconElement: ng.IAugmentedJQuery = element.find('i');

    // make sure found the icon
    expect(iconElement.length).toBe(1);
  });

  /**
   * Verifies directive generates the correct CSS classes.
   */
  it('should render correct Office UI Fabric CSS classes', () => {
    // get the rendered icon element
    let iconElement: ng.IAugmentedJQuery = element.find('i');

    // ensure icon has the correct classes
    expect(iconElement.eq(0)).toHaveClass('ms-Icon');
    expect(iconElement.eq(0)).toHaveClass('ms-Icon--arrowDownLeft');
  });

  /**
   * Verifies directive generates the aria-hidden attribute. 
   */
  it('should render correct aria-hidden attribute', () => {
    // get the rendered icon element
    let iconElement: ng.IAugmentedJQuery = element.find('i');

    // ensure icon has aria attribute with correct value
    expect(iconElement.eq(0)).toHaveAttr('aria-hidden');
    expect(iconElement.eq(0).attr('aria-hidden')).toBe('true');
  });

});
