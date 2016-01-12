'use strict';

import * as ng from 'angular';

describe('spinnerDirective: <uif-spinner />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.spinner');
  });

  describe('basic tests', () => {
    let element: ng.IAugmentedJQuery;
    let scope: ng.IScope;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      element = ng.element('<uif-spinner></uif-spinner>');
      scope = $rootScope;
      $compile(element)(scope);
      scope.$digest();
    }));

    it('should render as div', () => {
      expect(element[0].tagName === 'DIV').toBe(true);
    });

    it('should render proper CSS class', () => {
      expect(element[0]).toHaveClass('ms-Spinner');
    });

    it('should render proper CSS for large spinner', inject(($compile: Function) => {
      // override default element for suite
      element = ng.element('<uif-spinner uif-spinnersize="large"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      expect(element[0]).toHaveClass('ms-Spinner--large');
    }));

    it('should not render CSS for large spinner if spinnersize not large', inject(($compile: Function) => {
      // override default element for suite
      element = ng.element('<uif-spinner uif-spinnersize="small"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      expect(element[0]).not.toHaveClass('ms-Spinner--large');
    }));

    it('should not render wrapper when no content', () => {
      let wrapperElement: ng.IAugmentedJQuery = element.find('div.ms-Spinner-label');

      expect(wrapperElement.length).toBe(0);
    });

    it('should wrap content in div with proper CSS', inject(($compile: Function) => {
      element = ng.element('<uif-spinner>This should be wrapped!</uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      let wrapperElement: ng.IAugmentedJQuery = element.find('div.ms-Spinner-label');
      expect(wrapperElement.length).toBeGreaterThan(0);
      expect(wrapperElement[0].tagName).toEqual('DIV');
      expect(wrapperElement[0]).toHaveClass('ms-Spinner-label');
      expect(wrapperElement[0].innerText).toEqual('This should be wrapped!');
    }));

    it('should have eight circles rendered with proper CSS', () => {
      let circles: ng.IAugmentedJQuery = element.find('div.ms-Spinner-circle');

      expect(circles.length).toBe(8);
    });

    it('should have initial opacity on circles set', () => {
      let circles: ng.IAugmentedJQuery = element.find('div.ms-Spinner-circle');

      expect(circles.css('opacity')).toBeGreaterThan(0);
    });

  });

  describe('visibility', () => {
    let element: ng.IAugmentedJQuery;
    let scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService) => {
      scope = $rootScope.$new();
      scope.isVisible = false;
    }));

    it('should change visibility after scope value change', inject(($compile: Function) => {
      element = ng.element('<uif-spinner ng-show="isVisible"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      expect(element[0]).toHaveClass('ng-hide');

      scope.isVisible = true;
      scope.$apply();

      expect(element[0]).not.toHaveClass('ng-hide');
    }));

    it('should animate circles when ng-show not set', inject(($compile: Function, $interval: ng.IIntervalService) => {
      element = ng.element('<uif-spinner></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      let circles: ng.IAugmentedJQuery = element.find('div.ms-Spinner-circle');
      let initialOpacity: number = +(circles[0].style.opacity);

      $interval.flush(90);

      let finalOpacity: number = +(circles[0].style.opacity);

      expect(finalOpacity).toBeGreaterThan(initialOpacity);
    }));

    it('should start/stop animation on ng-show change', inject(($compile: Function, $interval: ng.IIntervalService) => {
      scope.spinnerVisible = false;

      element = ng.element('<uif-spinner ng-show="spinnerVisible"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      let circles: ng.IAugmentedJQuery = element.find('div.ms-Spinner-circle');

      // animation not playing
      let initialOpacity: number = +(circles[0].style.opacity);

      $interval.flush(90);

      let finalOpacity: number = +(circles[0].style.opacity);
      expect(finalOpacity === initialOpacity).toBeTruthy();

      // start animation
      scope.spinnerVisible = true;
      scope.$digest();

      $interval.flush(90);

      finalOpacity = +(circles[0].style.opacity);
      expect(finalOpacity > initialOpacity).toBeTruthy();

      // stop animation
      initialOpacity = +(circles[0].style.opacity);

      scope.spinnerVisible = false;
      scope.$digest();

      $interval.flush(90);

      finalOpacity = +(circles[0].style.opacity);
      expect(finalOpacity === initialOpacity).toBeTruthy();
    }));

  });

});
