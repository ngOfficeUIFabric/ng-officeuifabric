'use strict';

import * as angular from 'angular';
import { IconEnum } from './iconEnum';

describe('iconDirective: <uif-icon />', () => {
  let element: angular.IAugmentedJQuery;
  let scope: angular.IScope;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.icon');
  });

  beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
    element = angular.element('<uif-icon uif-type="arrowDownLeft" />');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  /**
   * Verifies directive generates the correct HTML element.
   */
  it('should render correct HTML', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // make sure found the icon
    expect(iconElement.length).toBe(1);
  });

  /**
   * Verifies directive generates the correct CSS classes.
   */
  it('should render correct Office UI Fabric CSS classes', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // ensure icon has the correct classes
    expect(iconElement.eq(0)).toHaveClass('ms-Icon');
    expect(iconElement.eq(0)).toHaveClass('ms-Icon--arrowDownLeft');
  });

  /**
   * Verifies directive generates the aria-hidden attribute.
   */
  it('should render correct aria-hidden attribute', () => {
    // get the rendered icon element
    let iconElement: angular.IAugmentedJQuery = element.find('i');

    // ensure icon has aria attribute with correct value
    expect(iconElement.eq(0)).toHaveAttr('aria-hidden');
    expect(iconElement.eq(0).attr('aria-hidden')).toBe('true');
  });

  /**
   * Verify the icon responds to changes in the uif-type attribute.
   */
  it(
    'should allow to interpolate uif-type value',
    inject((
      $compile: angular.ICompileService,
      $rootScope: angular.IRootScopeService
    ) => {
      let htmlElement: JQuery = null;
      let localScope: any = $rootScope.$new();
      let html: string = '<uif-icon uif-type="{{type}}"></uif-icon>';
      let iconElement: JQuery = angular.element(html);
      let iconType: string = '';

      $compile(iconElement)(localScope);

      // >>> test 1
      // set to one icon in scope
      iconType = IconEnum[IconEnum.arrowDownLeft];
      localScope.type = iconType;

      // run digest cycle
      localScope.$digest();
      iconElement = jQuery(iconElement[0]);

      // test correct icon is used
      htmlElement = iconElement.find('i');
      expect(htmlElement).toHaveClass('ms-Icon--' + iconType);


      // >>> test 2
      // change icon type in scope
      iconType = IconEnum[IconEnum.arrowDownRight];
      localScope.type = iconType;

      // run digest cycle
      localScope.$digest();
      iconElement = jQuery(iconElement[0]);

      // test that new type is there
      htmlElement = iconElement.find('i');
      expect(htmlElement).toHaveClass('ms-Icon--' + iconType);
    })
  );

});
