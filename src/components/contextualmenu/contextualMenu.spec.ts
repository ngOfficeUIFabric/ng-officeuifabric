'use strict';

import * as ng from 'angular';

describe('contextualmenu: <uif-contextual-menu />', () => {
  beforeEach(() => {
    ng.mock.module('officeuifabric.core');
    ng.mock.module('officeuifabric.components.contextualmenu');
  });

  describe('regular menu tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      $element = ng.element(`
                    <uif-contextual-menu uif-is-open="isOpen">
                        <uif-contextual-menu-item uif-text="'Item3'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Item2'" uif-type="subMenu">
                                <uif-contextual-menu uif-is-open="sub.isOpen">
                                    <uif-contextual-menu-item uif-text="'SubItem1'"></uif-contextual-menu-item>
                                    <uif-contextual-menu-item uif-text="'SubItem2'" uif-click="item2click()"></uif-contextual-menu-item>
                                    <uif-contextual-menu-item uif-text="'SubItem3'" uif-type="subMenu">
                                        <uif-contextual-menu>
                                            <uif-contextual-menu-item uif-text="'Item1'"></uif-contextual-menu-item>
                                            <uif-contextual-menu-item uif-text="'Item2'"></uif-contextual-menu-item>
                                            <uif-contextual-menu-item uif-text="'Item3'"></uif-contextual-menu-item>
                                        </uif-contextual-menu>
                                    </uif-contextual-menu-item>
                                </uif-contextual-menu>
                        </uif-contextual-menu-item>
                    </uif-contextual-menu>`);
      $scope = $rootScope;
      $scope.sub = {};
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$digest();
    }));

    it('should create opened menu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.isOpen = true;
      $scope.$digest();
      expect($element).toHaveClass('is-open');
    }));

    it('should selects item', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $element.find('li a').first().click();
      $scope.$digest();
      expect($element.find('li a').first()).toHaveClass('is-selected');
    }));

    it('should open submenu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.sub.isOpen = false;
      $scope.$digest();
      $element.find('li a').eq(1).click();
      $scope.$digest();
      expect($scope.sub.isOpen).toBe(true);
    }));

    it('should click on item2', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.item2click = () => {
        //
      };
      spyOn($scope, 'item2click');
      $scope.$digest();
      $element.find('li a').eq(1).click();
      $scope.$digest();
      $element.find('li ul li a').eq(1).click();
      $scope.$digest();
      expect($scope.item2click).toHaveBeenCalled();
    }));

    it('should open third level menu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.sub.isOpen = false;
      $scope.$digest();
      $element.find('li a').eq(1).click();
      $scope.$digest();
      $element.find('li').eq(1).find('ul li a').eq(2).click();
      $scope.$digest();
      expect($element.find('li').eq(1).find('ul').eq(0).find('li ul')).toHaveClass('is-open');
    }));

    it('should throw an error - unsupported menu type', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      expect(() => {
        $compile(ng.element(`
                          <uif-contextual-menu uif-is-open="isOpen">
                            <uif-contextual-menu-item uif-text="'Header'" uif-type="unsupported"></uif-contextual-menu-item>
                        </uif-contextual-menu>`))($rootScope.$new());
      }).toThrow();
    }));

    it('should write an error - invalid \'uif-is-open\' attribute usage', inject(
      ($compile: Function,
        $rootScope: ng.IRootScopeService,
        /* tslint:disable:variable-name */
        _$log_: any) => {
        /* tslint:enable:variable-name */

        $scope = $rootScope.$new();

        spyOn(_$log_, 'error');

        $scope.isOpen = 'invalid';

        $compile(ng.element(`
                    <uif-contextual-menu uif-is-open="isOpen">
                      <uif-contextual-menu-item uif-text="'Item1'"></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect(_$log_.error).toHaveBeenCalled();
      }));

    it('should write an error - invalid \'uif-is-selected\' attribute usage', inject(
      ($compile: Function,
        $rootScope: ng.IRootScopeService,
        /* tslint:disable:variable-name */
        _$log_: any) => {
        /* tslint:enable:variable-name */

        $scope = $rootScope.$new();

        spyOn(_$log_, 'error');

        $scope.isSelected = 'invalid';

        $compile(ng.element(`
                    <uif-contextual-menu>
                      <uif-contextual-menu-item uif-text="'Item1'" uif-is-selected="isSelected"></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect(_$log_.error).toHaveBeenCalled();
      }));

    it('should write an error - invalid \'uif-is-disabled\' attribute usage', inject(
      ($compile: Function,
        $rootScope: ng.IRootScopeService,
        /* tslint:disable:variable-name */
        _$log_: any) => {
        /* tslint:enable:variable-name */

        $scope = $rootScope.$new();

        spyOn(_$log_, 'error');

        $scope.isDisabled = 'invalid';

        $compile(ng.element(`
                    <uif-contextual-menu>
                      <uif-contextual-menu-item uif-text="'Item1'" uif-is-disabled="isDisabled"></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect(_$log_.error).toHaveBeenCalled();
      }));
  });

  describe('multiselect menu tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      $element = ng.element(`
                    <uif-contextual-menu uif-is-open="isOpen" uif-multiselect="true">
                        <uif-contextual-menu-item uif-text="'Header'" uif-type="header"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Item3'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-type="divider"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Item2'"></uif-contextual-menu-item>
                    </uif-contextual-menu>`);
      $scope = $rootScope;
      $scope.isOpen = true;
      $scope.$digest();
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$digest();
    }));

    it('should have valid class for header', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      expect($element.find('li').eq(0)).toHaveClass('ms-ContextualMenu-item--header');
    }));

    it('should have valid class for divider', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      expect($element.find('li').eq(2)).toHaveClass('ms-ContextualMenu-item--divider');
    }));

    it('should selects item3', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $element.find('li a').eq(1).click();
      $scope.$digest();
      expect($element.find('li a').eq(1)).toHaveClass('is-selected');
    }));
  });
});
