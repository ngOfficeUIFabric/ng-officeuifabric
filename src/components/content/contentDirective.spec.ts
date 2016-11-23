import * as angular from 'angular';

describe('content: <uif-content />', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.content');
  });

  describe('regular content tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: angular.IRootScopeService, $compile: Function) => {
      $element = angular.element(`<uif-content><uif-icon uif-type="arrowRight"></uif-icon>Item</uif-content>`);
      $scope = $rootScope;
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should have valid class', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      expect($element).toHaveClass('uif-content');
    }));

    it('should render icon inside', inject(($compile: Function, $rootScope: angular.IRootScopeService) => {
      let icon: JQuery = $element.find('.ms-Icon');
      expect(icon.length).toEqual(1);
    }));
  });
});
