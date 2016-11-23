'use strict';

import * as angular from 'angular';

describe('spinnerDirective: <uif-spinner />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.spinner');
  });

  describe('basic tests', () => {
    let element: JQuery;
    let scope: angular.IScope;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      element = angular.element('<uif-spinner></uif-spinner>');
      scope = $rootScope;
      $compile(element)(scope);
      element = jQuery(element[0]);
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
      element = angular.element('<uif-spinner uif-size="large"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      expect(element[0]).toHaveClass('ms-Spinner--large');
    }));

    it('should render proper CSS for small spinner', inject(($compile: Function) => {
      // override default element for suite
      element = angular.element('<uif-spinner uif-size="small"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      expect(element[0]).not.toHaveClass('ms-Spinner--large');
    }));

    it('should throw error when invalid size provided', inject(($compile: Function, $log: angular.ILogService) => {
      // override default element for suite
      element = angular.element('<uif-spinner uif-size="invalid"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      // expect(element[0]).not.toHaveClass('ms-Spinner--large');

      expect($log.error.logs.length === 1).toBeTruthy();
      expect($log.error.logs[0]).toContain('Error [ngOfficeUiFabric] officeuifabric.components.spinner - Unsupported size: ' +
          'Spinner size (\'invalid\') is not supported by the Office UI Fabric.');
    }));

    it('should not render wrapper when no content', () => {
      let wrapperElement: JQuery = element.find('div.ms-Spinner-label');

      expect(wrapperElement.length).toBe(0);
    });

    it('should wrap content in div with proper CSS', inject(($compile: Function) => {
      element = angular.element('<uif-spinner>This should be wrapped!</uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      let wrapperElement: JQuery = element.find('div.ms-Spinner-label');
      expect(wrapperElement.length).toBeGreaterThan(0);
      expect(wrapperElement[0].tagName).toEqual('DIV');
      expect(wrapperElement[0]).toHaveClass('ms-Spinner-label');
      expect(wrapperElement[0].innerText).toEqual('This should be wrapped!');
    }));

    it('should have eight circles rendered with proper CSS', () => {
      let circles: JQuery = element.find('div.ms-Spinner-circle');

      expect(circles.length).toBe(8);
    });

    it('should have initial opacity on circles set', () => {
      let circles: JQuery = element.find('div.ms-Spinner-circle');

      expect(circles.css('opacity')).toBeGreaterThan(0);
    });

  });

  describe('visibility', () => {
    let element: JQuery;
    let scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService) => {
      scope = $rootScope.$new();
      scope.isVisible = false;
    }));

    it('should change visibility after scope value change', inject(($compile: Function) => {
      element = angular.element('<uif-spinner ng-show="isVisible"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      expect(element[0]).toHaveClass('ng-hide');

      scope.isVisible = true;
      scope.$apply();

      expect(element[0]).not.toHaveClass('ng-hide');
    }));

    it('should animate circles when ng-show not set', inject(($compile: Function, $interval: angular.IIntervalService) => {
      element = angular.element('<uif-spinner></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      let circles: JQuery = element.find('div.ms-Spinner-circle');
      let initialOpacity: number = +(circles[0].style.opacity);

      $interval.flush(90);

      let finalOpacity: number = +(circles[0].style.opacity);

      expect(finalOpacity).toBeGreaterThan(initialOpacity);
    }));

    it('should start/stop animation on ng-show change', inject(($compile: Function, $interval: angular.IIntervalService) => {
      scope.spinnerVisible = false;

      element = angular.element('<uif-spinner ng-show="spinnerVisible"></uif-spinner>');
      $compile(element)(scope);
      scope.$digest();

      element = jQuery(element[0]);

      let circles: JQuery = element.find('div.ms-Spinner-circle');

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
