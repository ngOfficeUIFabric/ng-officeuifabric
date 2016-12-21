import * as angular from 'angular';

describe('<uif-label></uif-label>', () => {
  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.label');
  });

  describe('HTML rendering', () => {
    let labelElement: angular.IAugmentedJQuery;
    let scope: angular.IScope;
    let labelJQuery: JQuery;

    it('should be rendered as LABEL', inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      labelElement = angular.element('<uif-label></uif-label>');
      scope = $rootScope.$new();
      $compile(labelElement)(scope);
      scope.$digest();

      labelJQuery = jQuery(labelElement[0]);

      let label: JQuery = labelJQuery.find('label');

      expect(label.length === 1).toBeTruthy();
      expect(label[0].tagName === 'LABEL').toBeTruthy();
    }));

    it('should have proper CSS', inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      labelElement = angular.element('<uif-label></uif-label>');
      scope = $rootScope.$new();
      $compile(labelElement)(scope);
      scope.$digest();

      labelJQuery = jQuery(labelElement[0]);

      let label: JQuery = labelJQuery.find('label');

      expect(label).toHaveClass('ms-Label');
    }));

    it('should transclude content', inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      labelElement = angular.element('<uif-label>Content to transclude</uif-label>');
      scope = $rootScope.$new();
      $compile(labelElement)(scope);
      scope.$digest();

      labelJQuery = jQuery(labelElement[0]);

      let label: JQuery = labelJQuery.find('label');

      expect(label).toContainHtml('Content to transclude');
    }));

    it('should have proper CSS when disabled', inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      labelElement = angular.element('<uif-label disabled></uif-label>');
      scope = $rootScope.$new();
      $compile(labelElement)(scope);
      scope.$digest();

      labelJQuery = jQuery(labelElement[0]);

      let label: JQuery = labelJQuery.find('label');

      expect(label).toHaveClass('is-disabled');
    }));

    it('should have proper CSS when required', inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
      labelElement = angular.element('<uif-label required></uif-label>');
      scope = $rootScope.$new();
      $compile(labelElement)(scope);
      scope.$digest();

      labelJQuery = jQuery(labelElement[0]);

      let label: JQuery = labelJQuery.find('label');

      expect(label).toHaveClass('is-required');
    }));

    it(
      'should not have CSS when required and disabled not used',
      inject(($rootScope: angular.IRootScopeService, $compile: angular.ICompileService) => {
        labelElement = angular.element('<uif-label></uif-label>');
        scope = $rootScope.$new();
        $compile(labelElement)(scope);
        scope.$digest();

        labelJQuery = jQuery(labelElement[0]);

        let label: JQuery = labelJQuery.find('label');

        expect(label).not.toHaveClass('is-required');
        expect(label).not.toHaveClass('is-disabled');
      }));


  });

});
