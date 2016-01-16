'use strict';

import * as ng from 'angular';

describe('progressIndicatorDirective: <uif-progress-indicator />', () => {
  let element: ng.IAugmentedJQuery;
  let scope: ng.IScope;

  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.progressindicator');
  });

  beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
    element = ng.element('<uif-progress-indicator uif-name="MyFile.docx" uif-description="This is a sample" uif-percent-complete="65" />');
    scope = $rootScope;
    $compile(element)(scope);
    scope.$digest();
  }));

  /**
   * Verifies directive generates the correct HTML element.
   */
  it('should render correct HTML', () => {
    // get the rendered progress indicator element
    let progressIndicatorElement: ng.IAugmentedJQuery = element.find('div');

    // make sure found the progress indicator
    expect(progressIndicatorElement.length).toBe(1);
  });

  /**
   * Verifies directive generates the correct CSS classes.
   */
  it('should render correct Office UI Fabric CSS classes', () => {
    // get the rendered overlay element
    let progressIndicatorElement: ng.IAugmentedJQuery = element.find('div');

    // ensure overlay has the correct classes
    expect(progressIndicatorElement.eq(0)).toHaveClass('ms-ProgressIndicator');
  });
});
