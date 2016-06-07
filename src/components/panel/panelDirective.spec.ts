'use strict';

describe('panel: <uif-panel />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.panel');
  });

  describe('Basic Tests', () => {

    let panel: JQuery;
    let $scope: any;

    afterEach(() => {
        this.$timeoutservice.verifyNoPendingTasks();
    });

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $timeout: angular.ITimeoutService) => {

      $scope = $rootScope;
      this.$timeoutservice = $timeout;
      $scope.isOpen = true;

      panel = $compile(`<uif-panel uif-type="small" uif-is-open="isOpen" uif-show-overlay="true" uif-show-close="true">
                              <uif-panel-header>Header</uif-panel-header>
                              <uif-content>
                              <span class="ms-font-m">Place your content in here!</span>
                              </uif-content>
                            </uif-panel>
                    `)($scope);
      $scope.$digest();
      $('body').append(panel);
      panel = jQuery(panel[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(panel).toHaveClass('ms-Panel');
      expect(panel.find('div.ms-Overlay').length).toBe(1);
      expect(panel.find('div.ms-Panel-main').length).toBe(1);
      expect(panel.find('div.ms-Panel-commands').length).toBe(1);
      this.$timeoutservice.flush();

    }));

    it('should test for incorrect open value', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.isOpen = 'stringvalue';
      $rootScope.$digest();
      this.$timeoutservice.flush();
      // test to ensure code coverage
      expect(panel).toHaveClass('ms-Panel');

    }));

    it('should allow the panel to be opened', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.isOpen = true;
      $rootScope.$digest();
      this.$timeoutservice.flush();
      expect(panel).toHaveClass('is-open');
    }));

    it('should allow the panel to be closed', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      $scope.isOpen = true;
      $rootScope.$digest();
      this.$timeoutservice.flush();
      expect(panel).toHaveClass('is-open');

      $scope.isOpen = false;
      $rootScope.$digest();
      this.$timeoutservice.flush();
      expect(panel).not.toHaveClass('is-open');

    }));

    it('close button should close the panel', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      $scope.isOpen = true;
      $rootScope.$digest();
      expect(panel).toHaveClass('is-open');

      // close the panel by pressing the button
      panel.find('.ms-Panel-closeButton').trigger('click');
      $rootScope.$digest();
      this.$timeoutservice.flush();
      expect($scope.isOpen).toEqual(false);
    }));

  });

  describe('Command bar is placed correctly', () => {

    let panel: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      $scope = $rootScope;

      panel = $compile(`
                            <uif-panel uif-is-open="isOpen" uif-show-overlay="true" uif-show-close="true">
                              <uif-command-bar uif-search-term="searchValue" placeholder="Search here...">
                                <uif-command-bar-main uif-show-overflow='true'>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span class='ms-font-s'>Save</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="x"></uif-icon>
                                  <span class='ms-font-s'>Cancel</span>
                                </uif-command-bar-item>
                                </uif-command-bar-main>
                              </uif-command-bar>
                              <uif-panel-header>Header</uif-panel-header>
                              <uif-content>
                              <span class="ms-font-m">Place your content in here!</span>
                              </uif-content>
                            </uif-panel>
                    `)($scope);
      $scope.$digest();
      $('body').append(panel);
      panel = jQuery(panel[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(panel.find('div.ms-CommandBar').length).toBe(1);
    }));

    it('should allow the panel to be opened & show the commandbar', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      $scope.isOpen = true;
      $rootScope.$digest();
      expect(panel).toHaveClass('is-open');
      expect(panel.find('div.ms-CommandBarItem')[0]).not.toHaveClass('is-hidden');
    }));


    });

  describe('Ensure default is applied when no uif-type is supplied', () => {
    let panel: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      $scope = $rootScope;

      panel = $compile(`
                            <uif-panel uif-is-open="vm.isOpen1" uif-show-overlay="true" uif-show-close="true">
                              <uif-panel-header>Header</uif-panel-header>
                              <uif-content>
                              <span class="ms-font-m">Place your content in here!</span>
                              </uif-content>
                            </uif-panel>
                    `)($scope);
      $scope.$digest();
      $('body').append(panel);
      panel = jQuery(panel[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(panel).toHaveClass('ms-Panel');
      expect(panel).toHaveClass('ms-Panel--md');
    }));

  });


  describe('Left panel renders', () => {
    let panel: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      $scope = $rootScope;

      panel = $compile(`
                            <uif-panel uif-type="left" uif-is-open="vm.isOpen1" uif-show-overlay="true" uif-show-close="true">
                              <uif-panel-header>Header</uif-panel-header>
                              <uif-content>
                              <span class="ms-font-m">Place your content in here!</span>
                              </uif-content>
                            </uif-panel>
                    `)($scope);
      $scope.$digest();
      $('body').append(panel);
      panel = jQuery(panel[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(panel).toHaveClass('ms-Panel');
      expect(panel).toHaveClass('ms-Panel--left');
    }));

  });

  describe('Handles incorrect panel types', () => {
    let panel: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      $scope = $rootScope;

      panel = $compile(`
                            <uif-panel uif-type="invalid" uif-is-open="vm.isOpen1" uif-show-overlay="true" uif-show-close="true">
                              <uif-panel-header>Header</uif-panel-header>
                              <uif-content>
                              <span class="ms-font-m">Place your content in here!</span>
                              </uif-content>
                            </uif-panel>
                    `)($scope);
      $scope.$digest();
      $('body').append(panel);
      panel = jQuery(panel[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect(panel).toHaveClass('ms-Panel');
      // default to medium
      expect(panel).toHaveClass('ms-Panel--md');
    }));

  });

});
