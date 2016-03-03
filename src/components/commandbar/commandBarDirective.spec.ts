describe('contextualmenu: <uif-contextual-menu />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.contextualmenu');

  });
  describe('Searchbox behaviour tests', () => {

    let commandbar: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {

      $scope = $rootScope;

      commandbar = $compile(`
                            <uif-command-bar uif-search-term="searchValue">
                            <span>{{searchValue}}</span>
                              <uif-command-bar-search  placeholder='Search here...'></uif-command-bar-search>
                              <uif-command-bar-side>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save" />
                                  <span>Right</span>
                                </uif-command-bar-item>
                              </uif-command-bar-side>
                              <uif-command-bar-main uif-show-overflow='true'>
                                <uif-command-bar-item ng-click="goToLink()">
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>First Item</span>
                                </uif-command-bar-item>
                              </uif-command-bar-main>
                            </uif-command-bar>
                    `)($scope);
      $scope.$digest();
      $('body').append(commandbar);
      commandbar = jQuery(commandbar[0]);


    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
        expect(commandbar).toHaveClass('ms-CommandBar');
        expect(commandbar.find('div.ms-CommandBarSearch').length).toBe(1);
        expect(commandbar.find('div.ms-CommandBar-mainArea div.ms-CommandBarItem').not('.ms-CommandBarItem-overflow').length).toBe(1);
        expect(commandbar.find('div.ms-CommandBar-sideCommands div.ms-CommandBarItem').length).toBe(1);
    }));

    it('should allow search box to be entered and exited', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('input.ms-CommandBarSearch-input').focus();
      expect(commandbar.find('div.ms-CommandBarSearch')).toHaveClass('is-active');

      commandbar.find('input.ms-CommandBarSearch-input').blur();
      expect(commandbar.find('div.ms-CommandBarSearch')).not.toHaveClass('is-active');

    }));

    // todo:input of values!
    it('should allow search term to be entered', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('input.ms-CommandBarSearch-input').focus();
      expect(commandbar.find('div.ms-CommandBarSearch')).toHaveClass('is-active');

      commandbar.find('input.ms-CommandBarSearch-input').val('test').trigger('input');
      $scope.$apply();

    }));

    it('should allow search term to be focused by the search icon', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('div.ms-CommandBarSearch-iconSearchWrapper').click();
      expect(commandbar.find('div.ms-CommandBarSearch')).toHaveClass('is-active');

    }));

    it('should allow search term to be cleared', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('input.ms-CommandBarSearch-input').focus();
      expect(commandbar.find('div.ms-CommandBarSearch')).toHaveClass('is-active');

      commandbar.find('div.ms-CommandBarSearch-iconClearWrapper').mousedown();
      expect(commandbar.find('div.ms-CommandBarSearch')).not.toHaveClass('is-active');
    }));

  });



  describe('test with 15 items', () => {

    let commandbar: JQuery;
    let $scope: any;

    afterEach(() => {
        this.$timeoutservice.verifyNoPendingTasks();
    });

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $timeout: angular.ITimeoutService) => {

      $scope = $rootScope;
      this.$timeoutservice = $timeout;

      commandbar = $compile(`
                        <div id='container' style="width:500px">
                            <uif-command-bar uif-search-term="searchValue">
                              <uif-command-bar-main uif-show-overflow='true'>
                                <uif-command-bar-item  ng-click="logClick('Home item clicked')">
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>First Item</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>2nd</span>
                                  <uif-icon uif-type="chevronDown"></uif-icon>
                                  <uif-contextual-menu uif-is-open="isOpen" uif-close-on-click="false">
                                    <uif-contextual-menu-item
                                        uif-text="'New'"
                                        ng-click="goToLink('14th > new')"></uif-contextual-menu-item>
                                    <uif-contextual-menu-item
                                      uif-text="'Save'"
                                      ng-click="goToLink('14th > save')"></uif-contextual-menu-item>
                                  </uif-contextual-menu>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>3rd</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>4th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>5th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>6th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>7th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>8th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>9th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>10th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>11th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <uif-icon uif-type="save"></uif-icon>
                                  <span>12th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <span>13th</span>
                                  <uif-icon uif-type="save"></uif-icon>
                                </uif-command-bar-item>
                                <uif-command-bar-item ng-click="goToLink()">
                                  <span>14th</span>
                                </uif-command-bar-item>
                                <uif-command-bar-item>
                                  <span>15th</span>
                                </uif-command-bar-item>
                              </uif-command-bar-main>
                            </uif-command-bar>
                        </div>
                    `)($scope);
      $scope.$digest();
      $('body').append(commandbar);
      commandbar = jQuery(commandbar[0]);

    }));

    it('should render correct html', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
        expect(commandbar.find('div.ms-CommandBarItem-overflow').length).toBe(1);
        expect(commandbar.find('div.ms-CommandBar-mainArea div.ms-CommandBarItem').not('.ms-CommandBarItem-overflow').length).toBe(15);
        this.$timeoutservice.flush();
    }));

    it('should allow the overflow menu to be opened', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      commandbar.find('div.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper').click();
      expect(commandbar.find('ul.ms-CommandBar-overflowMenu')).toHaveClass('is-open');
      this.$timeoutservice.flush();
    }));


    it('should allow an item to be clicked', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      $scope.logClick = () => {
        //
      };
      spyOn($scope, 'logClick');
      angular.element(commandbar.find('div.ms-CommandBarItem:first')[0]).triggerHandler('click');
      expect($scope.logClick).toHaveBeenCalled();
      this.$timeoutservice.flush();
    }));

    it('should allow an overflowed item to call the parent click', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('div.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper').click();

      $scope.logClick = () => {
        //
      };
      spyOn($scope, 'logClick');
      angular.element(commandbar.find('.ms-CommandBar-overflowMenu li')[0]).triggerHandler('click');
      this.$timeoutservice.flush();
      expect($scope.logClick).toHaveBeenCalled();

    }));

    it('should allow an overflowed item to open a submenu', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      commandbar.find('div.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper').click();

      $scope.goToLink = () => {
        //
      };
      spyOn($scope, 'goToLink');

      angular.element(commandbar.find('.ms-CommandBar-overflowMenu li')[1]).triggerHandler('click');
      angular.element(commandbar.find('.ms-CommandBar-overflowMenu li ul li')[0]).triggerHandler('click');
      this.$timeoutservice.flush();
      expect($scope.goToLink).toHaveBeenCalled();

    }));

  });


});
