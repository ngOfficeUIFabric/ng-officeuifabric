'use strict';

import * as angular from 'angular';

describe('contextualmenu: <uif-contextual-menu />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.contextualmenu');
  });

  describe('regular menu tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      $element = angular.element(`
                    <uif-contextual-menu uif-is-open="isOpen" uif-close-on-click="false">
                        <uif-contextual-menu-item>
                          <uif-content><uif-icon uif-type="arrowRight"></uif-icon> Item 1</uif-content>
                        </uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Item2'" uif-type="subMenu">
                                <uif-contextual-menu uif-is-open="sub.isOpen">
                                    <uif-contextual-menu-item uif-text="'SubItem1'"></uif-contextual-menu-item>
                                    <uif-contextual-menu-item uif-text="'SubItem2'" ng-click="item2click()"></uif-contextual-menu-item>
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

    it('should create opened menu', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.isOpen = true;
      $scope.$digest();
      expect($element).toHaveClass('is-open');
    }));

    it('should return menu visibility status', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.isOpen = true;
      $scope.$digest();
      let contextMenuCtrl: any = angular.element($element[0]).controller('uifContextualMenu');

      expect(contextMenuCtrl.isMenuOpened()).toBe(true);
    }));

    it('should have enhanced content', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let content: JQuery = $element.find('li a').first().find('.uif-content');

      expect(content.length).toEqual(1);
    }));

    it('should have an icon as content', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let content: JQuery = $element.find('li a').first().find('.uif-content .ms-Icon');

      expect(content.length).toEqual(1);
    }));

    it('should selects item', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $element.find('li a').first().click();
      $scope.$digest();
      expect($element.find('li a').first()).toHaveClass('is-selected');
    }));

    it('should open submenu', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.sub.isOpen = false;
      $scope.$digest();
      $element.find('li a').eq(1).click();
      $scope.$digest();
      expect($scope.sub.isOpen).toBe(true);
    }));

    it('should click on item2', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
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

    it('should open third level menu', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.sub.isOpen = false;
      $scope.$digest();
      $element.find('li a').eq(1).click();
      $scope.$digest();
      $element.find('li').eq(1).find('ul li a').eq(2).click();
      $scope.$digest();
      expect($element.find('li').eq(1).find('ul').eq(0).find('li ul')).toHaveClass('is-open');
    }));

    it('should throw an error - unsupported menu type', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(() => {
        $compile(angular.element(`
                          <uif-contextual-menu uif-is-open="isOpen">
                            <uif-contextual-menu-item uif-text="'Header'" uif-type="unsupported"></uif-contextual-menu-item>
                        </uif-contextual-menu>`))($rootScope.$new());
      }).toThrow();
    }));

    it('should write an error - invalid \'uif-is-open\' attribute usage', inject(
      ($compile: Function, $rootScope: angular.IRootScopeService, $log: any) => {

        $scope = $rootScope.$new();

        spyOn($log, 'error');

        $scope.isOpen = 'invalid';
        $compile(angular.element(`
                    <uif-contextual-menu uif-is-open="isOpen">
                      <uif-contextual-menu-item uif-text="'Item1'"></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect($log.error).toHaveBeenCalled();
      }));

    it('should write an error - invalid \'uif-is-selected\' attribute usage', inject(
      ($compile: Function, $rootScope: angular.IRootScopeService, $log: any) => {

        $scope = $rootScope.$new();

        spyOn($log, 'error');

        $scope.isSelected = 'invalid';
        $compile(angular.element(`
                    <uif-contextual-menu>
                      <uif-contextual-menu-item uif-text="'Item1'" uif-is-selected="isSelected"></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect($log.error).toHaveBeenCalled();
      }));

    it('should write an error - no text for menu item provided', inject(
      ($compile: Function, $rootScope: angular.IRootScopeService, $log: any) => {
        $scope = $rootScope.$new();

        spyOn($log, 'error');

        $compile(angular.element(`
                    <uif-contextual-menu>
                      <uif-contextual-menu-item></uif-contextual-menu-item>
                    </uif-contextual-menu>`))($scope);
        $scope.$digest();

        expect($log.error).toHaveBeenCalled();
      }));
  });

  describe('multiselect menu tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      $element = angular.element(`
                    <uif-contextual-menu uif-is-open="isOpen" uif-multiselect="true" uif-close-on-click="false">
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

    it('should have valid class for header', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('li').eq(0)).toHaveClass('ms-ContextualMenu-item--header');
    }));

    it('should have valid class for divider', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('li').eq(2)).toHaveClass('ms-ContextualMenu-item--divider');
    }));

    it('should selects item3', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $element.find('li a').eq(1).click();
      $scope.$digest();
      expect($element.find('li a').eq(1)).toHaveClass('is-selected');
    }));
  });

  describe('auto closing menu tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      $element = angular.element(`
                    <uif-contextual-menu uif-is-open="isOpen">
                        <uif-contextual-menu-item uif-text="'Item1'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Item2'"></uif-contextual-menu-item>
                    </uif-contextual-menu>`);
      $scope = $rootScope;
      $scope.isOpen = true;
      $scope.$digest();
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$digest();
    }));

    it('should close menu after click', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $element.find('li a').eq(1).click();
      $scope.$digest();
      expect($element).not.toHaveClass('is-open');
    }));
  });

  describe('disabled items test', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      $element = angular.element(`
                    <uif-contextual-menu uif-is-open="isOpen">
                        <uif-contextual-menu-item disabled="disabled" uif-text="'Item1'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item ng-disabled="itemDisabled" uif-text="'Item2'"></uif-contextual-menu-item>
                    </uif-contextual-menu>`);
      $scope = $rootScope;
      $scope.isOpen = true;
      $scope.$digest();
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$digest();
    }));

    it('should change disabled state', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.itemDisabled = true;
      $scope.$apply();

      let $secondItem: JQuery = $element.find('.ms-ContextualMenu-link').eq(1);

      expect($secondItem).toHaveClass('is-disabled');

      $scope.itemDisabled = false;
      $scope.$apply();

      expect($secondItem).not.toHaveClass('is-disabled');
    }));

    it('should set initial disabled state', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $firstItem: JQuery = $element.find('.ms-ContextualMenu-link').eq(0);

      expect($firstItem).toHaveClass('is-disabled');
    }));

  });
});
