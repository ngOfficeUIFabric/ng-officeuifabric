import * as angular from 'angular';

describe('facepile: <uif-facepile />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.facepile');
  });

  describe('basic mode with no overflow', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`<uif-facepile ng-model="people" uif-facepile-name="Members"></uif-facepile>`);

      $scope = $rootScope;

      $scope.people = [{
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
      {
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      }];

      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();

    }));

    it('should render .ms-Facepile', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-Facepile');
    }));

    it('should have two uifPersona icons', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Persona').length).toBe(2);
    }));

    it('should hide overflow icon', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-itemBtn--overflow.ng-hide').length).toBe(1);
    }));

  });

  describe('basic mode with overflow', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element =
        angular.element(`<uif-facepile ng-model="overflowpeople" uif-overflow-limit="2" uif-facepile-name="Members"></uif-facepile>`);

      $scope = $rootScope;

      $scope.overflowpeople = [{
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
      {
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
      {
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      }];

      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();

    }));

    it('should render .ms-Facepile', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-Facepile');
    }));

    it('should have two uifPersona icons in the members', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-members .ms-Persona').length).toBe(2);
    }));

    it('should have and overflow icon with +2 as text', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-itemBtn--overflow').length).toBe(1);
      expect($element.find('.ms-Facepile-overflowText').text()).toEqual('+1');
    }));

    it('should have three uifPersona icons in the panel', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Panel .ms-Persona').length).toBe(3);
    }));

  });

  describe('including add button', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function, $q: angular.IQService) => {
      $element = angular.element(`<uif-facepile ng-model="overflowpeople" uif-overflow-limit="2" uif-facepile-name="Members">
                              <uif-facepile-add-icon uif-people="onFacePileSearch" placeholder="Add Members..."></uif-facepile-add-icon>
                            </uif-facepile>`);

      $scope = $rootScope;

      $scope.overflowpeople = [{
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
      {
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      },
      {
        color: 'magenta',
        icon: 'Persona.Person2.png',
        presence: 'available',
        primaryText: 'Russel Miller',
        secondaryText: 'Sales'
      }];

      $scope.onFacePileSearch = (querytext: string) => {
        return $scope.overflowpeople;
      };

      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();

    }));

    it('should render .ms-Facepile', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('ms-Facepile');
    }));

    it('should have two uifPersona icons in the members', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-members .ms-Persona').length).toBe(2);
    }));

    it('should have and overflow icon with +2 as text', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-itemBtn--overflow').length).toBe(1);
      expect($element.find('.ms-Facepile-overflowText').text()).toEqual('+1');
    }));

    it('should have an add button', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element.find('.ms-Facepile-itemBtn--addPerson').length).toBe(1);
    }));

  });

});
