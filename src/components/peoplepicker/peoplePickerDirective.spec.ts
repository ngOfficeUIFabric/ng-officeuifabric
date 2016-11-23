import * as angular from 'angular';

describe('peoplepicker: <uif-people-picker />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.peoplepicker');
  });

  describe('People picker - grouped mode', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`
       <uif-people-picker
         ng-disabled="disabled"
         uif-people="onSearch"
         ng-model="selectedPeople"
         placeholder="Search for people"
         uif-selected-person-click="personClicked">
          <uif-people-search-more>
            <uif-secondary-text>Showing {{sourcePeople.length}} results</uif-secondary-text>
            <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
          </uif-people-search-more>
        </uif-people-picker>`);

      $scope = $rootScope;

      let defaultGroup: any = {
        name: 'default', order: 1
      };

      $scope.people = [{
        additionalData: [
          {
            color: 'magenta',
            group: defaultGroup,
            icon: 'Persona.Person2.png',
            presence: 'available',
            primaryText: 'Joseph Pena',
            secondaryText: 'Contoso Inc.'
          }
        ],
        color: 'magenta',
        group: defaultGroup,
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
        {
          color: 'magenta',
          group: defaultGroup,
          icon: 'Persona.Person2.png',
          presence: 'available',
          primaryText: 'Russel Miller',
          secondaryText: 'Sales'
        }];

      $scope.personClicked = () => {
        return;
      };

      $scope.onSearch = (query) => {
        if (!query) {
          return $scope.people;
        }
        let deferred: angular.IDeferred<any> = $q.defer();

        deferred.resolve([$scope.people[1]]);

        return deferred.promise;
      };
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should render .ms-PeoplePicker', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-PeoplePicker');
    }));

    it('should add and remove acitve class', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();

      expect($element).toHaveClass('is-active');

      jQuery(document).click();
      $scope.$apply();

      expect($element).not.toHaveClass('is-active');
    }));

    it('should render valid disabled states for input', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.disabled = true;
      $scope.$apply();
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();

      expect($searchInput).toHaveAttr('disabled');

      $scope.disabled = false;
      $scope.$apply();

      expect($searchInput).not.toHaveAttr('disabled');
    }));

    it('should not run delayed search', inject(($compile: Function, $rootScope: angular.IRootScopeService,
      $timeout: angular.ITimeoutService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();

      spyOn($scope, 'onSearch');

      $searchInput.keyup(81);
      $scope.$apply();
      $searchInput.keyup(81);
      $scope.$apply();
      $timeout.flush();

      expect($scope.onSearch).not.toHaveBeenCalled();
    }));

    it('should fire person click event', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      let $btn: JQuery = $element.find('.ms-PeoplePicker-resultBtn').first();

      $btn.click();
      $scope.$apply();

      let $persona: JQuery = $element.find('.ms-PeoplePicker-persona .ms-Persona');
      spyOn($scope, 'personClicked');

      $persona.click();
      $scope.$apply();

      expect($scope.personClicked).toHaveBeenCalled();
    }));

    it('should set initial selected persons', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      $scope.selectedPeople = [$scope.people[1]];
      $scope.$apply();
      expect($element.find('.ms-PeoplePicker-searchBox .ms-PeoplePicker-persona').length).toBe(1);
    }));

    it('should work with async data', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchMore: JQuery = $element.find('.ms-PeoplePicker-searchMoreBtn').first();
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.val('search query');
      angular.element($searchInput[0]).triggerHandler('input');
      $scope.$apply();
      $searchMore.click();
      $scope.$apply();
      let $results: JQuery = $element.find('.ms-PeoplePicker-result');

      expect($results.length).toBe(1);
    }));

    it('should write an error - invalid people picker type', inject(($compile: Function,
      $rootScope: angular.IRootScopeService, $log: angular.ILogService) => {
      try {
        $scope = $rootScope.$new();

        spyOn($log, 'error');
        $scope.onSearch = () => {
          //
        };
        $compile(angular.element(`<uif-people-picker uif-people="onSearch" uif-type="undef" ng-model="selected">
                          </uif-people-picker>`
        ))($scope);
        $scope.$apply();
      } catch (err) {
        expect($log.error).toHaveBeenCalled();
      }
    }));

    it('should set disabled on input', inject(($compile: Function,
      $rootScope: angular.IRootScopeService) => {

      $scope = $rootScope.$new();

      $scope.onSearch = () => {
        return [];
      };
      let $newElement: JQuery = angular.element(`
                           <uif-people-picker ng-disabled="true" uif-people="onSearch" ng-model="selected">
                          </uif-people-picker>`);
      $compile($newElement)($scope);
      $scope.$apply();
      $newElement = jQuery($newElement[0]);

      let $searchInput: JQuery = $newElement.find('input.ms-PeoplePicker-searchField').first();

      expect($searchInput).toHaveAttr('disabled');

    }));

    it('should set active state for people picker', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      expect($element).toHaveClass('is-active');
    }));

    it('should add person to selected', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      let $btn: JQuery = $element.find('.ms-PeoplePicker-resultBtn').first();

      $btn.click();
      $scope.$apply();

      expect($scope.selectedPeople.length).toBe(1);
    }));

    it('should not add person to selected twice', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      let $btn: JQuery = $element.find('.ms-PeoplePicker-resultBtn').first();

      $btn.click();
      $scope.$apply();

      $btn.click();
      $scope.$apply();

      expect($scope.selectedPeople.length).toBe(1);
    }));

    it('should remove person from selected', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      let $btn: JQuery = $element.find('.ms-PeoplePicker-resultBtn').first();

      $btn.click();
      $scope.$apply();

      let $personRemove: JQuery = $element.find('.ms-PeoplePicker-persona .ms-PeoplePicker-personaRemove');
      $personRemove.click();
      $scope.$apply();

      expect($scope.selectedPeople.length).toBe(0);
    }));

    it('should remove person from search results', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {

      let $searchResultCloseBtn: JQuery = $element.find('.ms-PeoplePicker-resultAction.js-resultRemove').last();
      $searchResultCloseBtn.click();
      $scope.$apply();
      let $results: JQuery = $element.find('li.ms-PeoplePicker-result');
      expect($results.length).toBe(2);
    }));

    it('should open additional data', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchResultCloseBtn: JQuery = $element.find('.ms-PeoplePicker-resultAction.js-resultRemove').first();
      $searchResultCloseBtn.click();
      $scope.$apply();
      let $result: JQuery = $element.find('li.ms-PeoplePicker-result').first();
      expect($result).toHaveClass('is-expanded');
    }));
  });

  describe('People picker - compact mode', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`
       <uif-people-picker uif-type="compact" uif-search-delay="50"
         uif-people="onSearch"
         ng-model="selectedPeople"
         placeholder="Search for people"
         uif-selected-person-click="personClicked">
          <uif-people-search-more>
            <uif-secondary-text>Showing {{sourcePeople.length}} results</uif-secondary-text>
            <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
          </uif-people-search-more>
        </uif-people-picker>`);

      $scope = $rootScope;

      let defaultGroup: any = {
        name: 'default', order: 1
      };

      $scope.people = [{
        additionalData: [
          {
            color: 'magenta',
            group: defaultGroup,
            icon: 'Persona.Person2.png',
            presence: 'available',
            primaryText: 'Joseph Pena',
            secondaryText: 'Contoso Inc.'
          }
        ],
        color: 'magenta',
        group: defaultGroup,
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
        {
          color: 'magenta',
          group: defaultGroup,
          icon: 'Persona.Person2.png',
          presence: 'available',
          primaryText: 'Russel Miller',
          secondaryText: 'Sales'
        }];

      $scope.onSearch = (query) => {
        if (!query) {
          return $scope.people;
        }
        let deferred: angular.IDeferred<any> = $q.defer();

        deferred.resolve([$scope.people[1]]);

        return deferred.promise;
      };
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should run delayed search', inject(($compile: Function, $rootScope: angular.IRootScopeService,
      $timeout: angular.ITimeoutService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();

      spyOn($scope, 'onSearch');

      $searchInput.keyup(81);
      $scope.$apply();
      $searchInput.keyup(81);
      $scope.$apply();
      $timeout.flush();

      expect($scope.onSearch).toHaveBeenCalled();
    }));

    it('should render valid root class', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-PeoplePicker--compact');
    }));
  });

  describe('People picker - disconnected', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`
       <uif-people-picker
         uif-people="onSearch"
         ng-model="selectedPeople"
         placeholder="Search for people"
         uif-selected-person-click="personClicked">
          <uif-people-search-more uif-disconnected="!connected">
            <uif-secondary-text>Showing {{sourcePeople.length}} results</uif-secondary-text>
            <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
            <uif-disconnected-text>
              We are having trouble connecting to the server.
              <br> Please try again in a few minutes.</uif-disconnected-text>
          </uif-people-search-more>
        </uif-people-picker>`);

      $scope = $rootScope;
      $scope.connected = false;
      let defaultGroup: any = {
        name: 'default', order: 1
      };

      $scope.people = [{
        additionalData: [
          {
            color: 'magenta',
            group: defaultGroup,
            icon: 'Persona.Person2.png',
            presence: 'available',
            primaryText: 'Joseph Pena',
            secondaryText: 'Contoso Inc.'
          }
        ],
        color: 'magenta',
        group: defaultGroup,
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
        {
          color: 'magenta',
          group: defaultGroup,
          icon: 'Persona.Person2.png',
          presence: 'available',
          primaryText: 'Russel Miller',
          secondaryText: 'Sales'
        }];

      $scope.onSearch = (query) => {
        if (!query) {
          return $scope.people;
        }
        let deferred: angular.IDeferred<any> = $q.defer();

        deferred.resolve([$scope.people[1]]);

        return deferred.promise;
      };
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should render valid disconnected class', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $diconnected: JQuery = $element.find('.ms-PeoplePicker-searchMore.ms-PeoplePicker-searchMore--disconnected');
      expect($diconnected.length).toBe(1);
    }));
  });

  describe('People picker - member list', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`
       <uif-people-picker uif-type="memberList"
         uif-people="onSearch"
         ng-model="selectedPeople"
         placeholder="Search for people"
         uif-selected-person-click="personClicked">
          <uif-selected-people-header>{{selectedPeople.length}} selected person(s)</uif-selected-people-header>
        </uif-people-picker>`);

      $scope = $rootScope;
      $scope.connected = false;
      let defaultGroup: any = {
        name: 'default', order: 1
      };

      $scope.people = [{
        color: 'magenta',
        group: defaultGroup,
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
        {
          color: 'magenta',
          group: defaultGroup,
          icon: 'Persona.Person2.png',
          presence: 'available',
          primaryText: 'Russel Miller',
          secondaryText: 'Sales'
        }];

      $scope.onSearch = (query) => {
        if (!query) {
          return $scope.people;
        }
        let deferred: angular.IDeferred<any> = $q.defer();

        deferred.resolve([$scope.people[1]]);

        return deferred.promise;
      };
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should render people list', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $diconnected: JQuery = $element.find('.ms-PeoplePicker-selectedPeople');
      expect($diconnected.length).toBe(1);
    }));
  });

  describe('People picker - facepile', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`
       <uif-people-picker uif-type="facePile"
         uif-people="onSearch"
         ng-model="selectedPeople"
         placeholder="Search for people"
         uif-selected-person-click="personClicked">
          <uif-selected-people-header>{{selectedPeople.length}} selected person(s)</uif-selected-people-header>
          <uif-people-search-more>
            <uif-primary-text uif-search-for-text="You are searching for: ">Search organization people</uif-primary-text>
          </uif-people-search-more>
        </uif-people-picker>`);

      $scope = $rootScope;
      $scope.connected = false;
      let defaultGroup: any = {
        name: 'default', order: 1
      };

      $scope.people = [{
        color: 'magenta',
        group: defaultGroup,
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
        {
          color: 'magenta',
          group: defaultGroup,
          icon: 'Persona.Person2.png',
          presence: 'available',
          primaryText: 'Russel Miller',
          secondaryText: 'Sales'
        }];

      $scope.onSearch = (query) => {
        if (!query) {
          return $scope.people;
        }
        let deferred: angular.IDeferred<any> = $q.defer();

        deferred.resolve([$scope.people[1]]);

        return deferred.promise;
      };
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should render valid markup', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-PeoplePicker--Facepile');
    }));

    it('should animate selected people when acitve', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let $searchInput: JQuery = $element.find('input.ms-PeoplePicker-searchField').first();
      $searchInput.click();
      $scope.$apply();
      expect($element).toHaveClass('is-active');
    }));
  });
});
