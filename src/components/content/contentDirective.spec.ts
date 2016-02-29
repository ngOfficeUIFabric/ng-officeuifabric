import * as ng from 'angular';

describe('content: <uif-content />', () => {
  beforeEach(() => {
    ng.mock.module('officeuifabric.core');
    ng.mock.module('officeuifabric.components.content');
  });

  describe('regular content tests', () => {
    let $element: JQuery;
    let $scope: any;

    beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: Function) => {
      $element = ng.element(`<uif-content><uif-icon uif-type="arrowRight"></uif-icon>Item</uif-content>`);
      $scope = $rootScope;
      $compile($element)($scope);
      $element = jQuery($element[0]);
      $scope.$apply();
    }));

    it('should have valid class', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      expect($element).toHaveClass('uif-content');
    }));

    it('should render icon inside', inject(($compile: Function, $rootScope: ng.IRootScopeService) => {
      let icon: JQuery = $element.find('.ms-Icon');
      expect(icon.length).toEqual(1);
    }));
  });
});
