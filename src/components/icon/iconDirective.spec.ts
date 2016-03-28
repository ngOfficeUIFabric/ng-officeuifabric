'use strict';

import * as ng from 'angular';
import { IRender, renderFactory } from 'ng-metadata/testing';
import { IconComponent } from './iconDirective'

describe('iconDirective: <uif-icon />', () => {
  let element: ng.IAugmentedJQuery;
  let scope: ng.IScope;
  let $ctrl: typeof IconComponent;

  let render: IRender;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.icon');
  });

  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
    scope = $rootScope.$new();
    render = renderFactory($compile,scope);

    const fixture = render( IconComponent, { attrs: { 'uif-type': 'arrowDownLeft' } } );
    element = fixture.compiledElement;
    $ctrl = fixture.ctrl;

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
