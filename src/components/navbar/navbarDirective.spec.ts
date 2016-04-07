'use strict';

import * as ng from 'angular';

describe('navbar: <uif-nav-bar />', () => {
  beforeEach(() => {
    ng.mock.module('officeuifabric.core');
    ng.mock.module('officeuifabric.components.navbar');
  });

  describe('regular navbar tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      $element = ng.element(`
                   <uif-nav-bar>
                    <uif-nav-bar-search placeholder="search for smth" uif-on-search="onSearchCallback(search)">
                    </uif-nav-bar-search>
                    <uif-nav-bar-item uif-text="'Home'" ng-click="logClick('Home item clicked')"></uif-nav-bar-item>
                    <uif-nav-bar-item uif-type="menu">
                      <uif-content><uif-icon uif-type="arrowRight"></uif-icon>Sub Menu</uif-content>
                      <uif-contextual-menu>
                        <uif-contextual-menu-item uif-text="'Delete'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Flag'"></uif-contextual-menu-item>
                      </uif-contextual-menu-item>
                    </uif-nav-bar-item>
                    <uif-nav-bar-item uif-text="'Root'" disabled="disabled"></uif-nav-bar-item>
                  </uif-nav-bar>`);
      $scope = $rootScope;
      $scope.sub = {};
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should not to have \'href\' attribute', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').last();
      let navBarLink: JQuery = link.find('.ms-NavBar-link');

      expect(navBarLink).not.toHaveAttr('href');
    }));

    it('should select menu which is clicked', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').first();
      link.click();
      $scope.$apply();

      expect(link).toHaveClass('is-selected');
    }));

    it('should render enhanced menu item', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      let content: JQuery = link.find('span.uif-content');

      expect(content.length).toEqual(1);
    }));

    it('should render enhanced menu item with icon', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      let icon: JQuery = link.find('span.uif-content .ms-Icon');

      expect(icon.length).toEqual(1);
    }));

    it('should execute click handler', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.logClick = () => {
        //
      };
      spyOn($scope, 'logClick');
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').first();
      link.click();
      $scope.$apply();

      expect($scope.logClick).toHaveBeenCalled();
    }));

    it('should open search by clicking on icon', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-item--search').first();
      link.click();
      $scope.$apply();

      expect(link).toHaveClass('is-selected');
      expect(link).toHaveClass('is-open');
    }));

    it('should trigger on search event with correct text by click', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.onSearchCallback = (search: string) => {
        console.log(search);
      };
      spyOn($scope, 'onSearchCallback');
      let link: JQuery = $element.find('.ms-NavBar-item--search').first();
      link.click();
      $scope.$apply();
      let textbox: JQuery = link.find('.ms-TextField-field').first();
      let searchText: string = 'search data';
      textbox.val(searchText);
      ng.element(textbox[0]).triggerHandler('input');
      $scope.$apply();
      link.click();
      $scope.$apply();

      expect($scope.onSearchCallback).toHaveBeenCalledWith(searchText);
    }));

    it('should not trigger on search event when clicking on div', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      $scope.onSearchCallback = (search: string) => {
        console.log(search);
      };
      spyOn($scope, 'onSearchCallback');
      let link: JQuery = $element.find('.ms-NavBar-item--search').first();
      link.click();
      $scope.$apply();
      let textbox: JQuery = link.find('.ms-TextField-field').first();
      let searchText: string = 'search data';
      textbox.val(searchText);
      ng.element(textbox[0]).triggerHandler('input');
      $scope.$apply();
      link.find('div.ms-TextField').click();
      $scope.$apply();

      expect($scope.onSearchCallback).not.toHaveBeenCalled();
    }));

    it('should close search control', inject(($compile: Function, $rootScope: ng.IRootScopeService, $timeout: ng.ITimeoutService) => {
      let search: JQuery = $element.find('.ms-NavBar-item--search').first();
      search.click();
      $scope.$apply();
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').first();
      link.click();
      $scope.$apply();
      $timeout.flush();
      expect(search).not.toHaveClass('is-selected');
      expect(search).not.toHaveClass('is-open');
    }));

    it('should open submenu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      link.click();
      $scope.$apply();
      expect(link.find('.ms-ContextualMenu').first()).toHaveClass('is-open');
    }));

    it('should close submenu by clicking on sub menu item', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      link.click();
      $scope.$apply();
      link.find('.ms-ContextualMenu-link').first().click();
      $scope.$apply();
      expect(link.find('.ms-ContextualMenu').first()).not.toHaveClass('is-open');
    }));

    it('should close submenu by clicking on other menu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      link.click();
      $scope.$apply();
      link.click();
      $scope.$apply();
      expect(link.find('.ms-ContextualMenu').first()).not.toHaveClass('is-open');
    }));

    it('should close submenu by click on document', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(1);
      link.click();
      $scope.$apply();
      jQuery(document.body).click();
      $scope.$apply();

      expect(link.find('.ms-ContextualMenu').first()).not.toHaveClass('is-open');
    }));

    it('should write an error - invalid overlay type', inject(($compile: Function,
      $rootScope: ng.IRootScopeService,
      /* tslint:disable:variable-name */
      _$log_: any) => {
      /* tslint:enable:variable-name */

      $scope = $rootScope.$new();

      spyOn(_$log_, 'error');

      $compile(ng.element(`
                    <uif-nav-bar uif-overlay="hidden">
                      <uif-nav-bar-item uif-text="'Home'"></uif-nav-bar-item>
                    </uif-nav-bar>`))($scope);
      $scope.$apply();

      expect(_$log_.error).toHaveBeenCalled();
    }));

    it('should write an error - invalid item type', inject(($compile: Function,
      $rootScope: ng.IRootScopeService,
      /* tslint:disable:variable-name */
      _$log_: any) => {
      /* tslint:enable:variable-name */

      $scope = $rootScope.$new();

      spyOn(_$log_, 'error');

      $compile(ng.element(`
                    <uif-nav-bar uif-overlay="hidden">
                      <uif-nav-bar-item uif-text="'Home'" uif-type="mytype"></uif-nav-bar-item>
                    </uif-nav-bar>`))($scope);
      $scope.$apply();

      expect(_$log_.error).toHaveBeenCalled();
    }));

    it('should write an error - no text for menu item provided', inject(($compile: Function,
      $rootScope: ng.IRootScopeService,
      /* tslint:disable:variable-name */
      _$log_: any) => {
      /* tslint:enable:variable-name */

      $scope = $rootScope.$new();

      spyOn(_$log_, 'error');

      $compile(ng.element(`
                    <uif-nav-bar uif-overlay="hidden">
                      <uif-nav-bar-item></uif-nav-bar-item>
                    </uif-nav-bar>`))($scope);
      $scope.$apply();

      expect(_$log_.error).toHaveBeenCalled();
    }));

    it('should create disabled menu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let link: JQuery = $element.find('.ms-NavBar-items .ms-NavBar-item:not(.ms-NavBar-item--search)').eq(2);
      link.click();
      $scope.$apply();

      expect(link).toHaveClass('is-disabled');
      expect(link).not.toHaveClass('is-selected');
    }));


  });

  describe('mobile navbar tests', () => {
    let $element: JQuery;
    let $scope: any;
    let originalWidth: string;

    beforeAll(() => {
      originalWidth = jQuery(document.body).css('width');
      jQuery(document.body).css('width', '470px');
      jQuery(window).trigger('resize');
    });

    afterAll(() => {
      jQuery(document.body).css('width', originalWidth);
      jQuery(window).trigger('resize');
    });

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      $element = ng.element(`
                   <uif-nav-bar>
                    <uif-nav-bar-search placeholder="search for smth" uif-on-search="onSearchCallback(search)">
                    </uif-nav-bar-search>
                    <uif-nav-bar-item uif-text="'Home'" ng-click="logClick('Home item clicked')"></uif-nav-bar-item>
                    <uif-nav-bar-item uif-text="'Contacts'" uif-type="menu">
                      <uif-contextual-menu>
                        <uif-contextual-menu-item uif-text="'Delete'"></uif-contextual-menu-item>
                        <uif-contextual-menu-item uif-text="'Flag'"></uif-contextual-menu-item>
                      </uif-contextual-menu-item>
                    </uif-nav-bar-item>
                  </uif-nav-bar>`);
      $scope = $rootScope;
      $scope.sub = {};
      $compile($element)($scope);
      $element = jQuery($element[0]);

      $scope.$apply();
    }));

    it('should open mobile menu when clicked', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let menu: JQuery = $element.find('.js-openMenu').first();
      menu.click();
      $scope.$apply();

      expect($element).toHaveClass('is-open');
    }));

    it('should close mobile menu by clicking on menu', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let menu: JQuery = $element.find('.js-openMenu').first();
      menu.click();
      $scope.$apply();
      let link: JQuery = $element.find('.ms-NavBar-items li:not(.ms-NavBar-item--search)').first();
      link.click();
      $scope.$apply();

      expect($element).not.toHaveClass('is-open');
    }));

    it('should close mobile menu by clicking on overlay', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let menu: JQuery = $element.find('.js-openMenu').first();
      menu.click();
      $scope.$apply();
      let link: JQuery = $element.find('uif-overlay').first();
      link.click();
      $scope.$apply();

      expect($element).not.toHaveClass('is-open');
    }));

  });

});
