'use strict';

import * as ng from 'angular';
import * as pivot from './pivotDirective';

describe('uif-pivot tests', () => {
  let liteElement: ng.IAugmentedJQuery;
  let element: JQuery;
  let scope: any;


  beforeEach(() => {
    angular.mock.module('officeuifabric.core');
    angular.mock.module('officeuifabric.components.pivot');
  });

  describe('HTML rendering', () => {

    describe('<uif-pivot>', () => {

      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot></uif-pivot>');
        scope = $rootScope.$new();

        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
      }));

      it('should render as UL wrapped in UIF-PIVOT', () => {
        expect(element[0].tagName === 'UIF-PIVOT').toBeTruthy();

        let list: JQuery = element.children().first();
        expect(list[0].tagName === 'UL').toBeTruthy();
      });

      it('should have correct CSS', () => {
        let list: JQuery = element.children().first();
        expect(list[0]).toHaveClass('ms-Pivot');
      });

      it('should render large pivot', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-size="large"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let list: JQuery = element.children().first();
        expect(list).toHaveClass('ms-Pivot--large');
      }));

      it('should render regular pivot', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-size="regular"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let ul: JQuery = element.children().first();
        expect(ul).not.toHaveClass('ms-Pivot--large');
      }));

      it('should render regular pivot if size not specified', () => {
        let ul: JQuery = element.children().first();
        expect(ul).not.toHaveClass('ms-Pivot--large');
      });

      it('should log error on invalid size value', inject(($log: ng.ILogService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-size="invalid"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        expect($log.error.logs.length === 1).toBeTruthy();

        let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
            '"invalid" is not a valid value for uifSize. It should be regular or large.';

        expect($log.error.logs[0]).toContain(expectedMessage);
      }));

      it('should not be rendered as tabs', () => {
        let ul: JQuery = element.children().first();
        expect(ul).not.toHaveClass('ms-Pivot--tabs');
      });

      it('should be rendered as tabs', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-type="tabs"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let ul: JQuery = element.children().first();
        expect(ul).toHaveClass('ms-Pivot--tabs');
      }));

      it('should validate type attribute', inject(($log: ng.ILogService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-type="invalid"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();
        expect($log.error.logs.length === 1).toBeTruthy();

        let expectedMessage: string = 'Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
            '"invalid" is not a valid value for uifType. It should be regular or tabs.';

        expect($log.error.logs[0]).toContain(expectedMessage);
      }));

      it('shold be rendered as regular', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-type="regular"></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let ul: JQuery = element.children().first();
        expect(ul).not.toHaveClass('ms-Pivot--tabs');
      }));

      it('should render pivot links', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection"></uif-pivot>');
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Shared with me')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let pivots: JQuery = element.find('li');
        expect(pivots.length === 3).toBeTruthy();

        expect(pivots).toHaveClass('ms-Pivot-link');

        expect(pivots[0]).toContainText('My Files');
        expect(pivots[1]).toContainText('Recent');
        expect(pivots[2]).toContainText('Shared with me');
      }));

      it('should have proper class when selected', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection"></uif-pivot>');
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Shared with me')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let pivots: JQuery = element.find('li');

        pivots.eq(1).click();
        scope.$digest();

        expect(pivots[1]).toHaveClass('is-selected');

      }));

      it('should return proper item when selected', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection" uif-selected="selectedPivot"></uif-pivot>');
        scope.selectedPivot = undefined;
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Shared with me')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let pivots: JQuery = element.find('li');

        pivots.eq(1).click();
        scope.$digest();

        expect(pivots[1]).toHaveClass('is-selected');

        expect(scope.selectedPivot).toBeDefined();
        expect(scope.selectedPivot.title === 'Recent').toBeTruthy();
      }));

      it('shoudl select proper item when uif-selected set', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection" uif-selected="selectedPivot"></uif-pivot>');
        scope.selectedPivot = undefined;
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Shared with me')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        scope.$digest();
        scope.selectedPivot = new pivot.PivotItem('Shared with me');
        scope.$digest();

        let pivots: JQuery = element.find('li');

        expect(pivots[2]).toHaveClass('is-selected');

        // expect(scope.selectedPivot).toBeDefined();
        // expect(scope.selectedPivot.title === 'Recent').toBeTruthy();

      }));

      it('shoudl select only one item when uif-selected matches more elements', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection" uif-selected="selectedPivot"></uif-pivot>');
        scope.selectedPivot = undefined;
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Recent')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        scope.$digest();
        scope.selectedPivot = new pivot.PivotItem('Recent');
        scope.$digest();

        let pivots: JQuery = element.find('li');

        expect(pivots[1]).toHaveClass('is-selected');
        expect(pivots[2]).not.toHaveClass('is-selected');

        // expect(scope.selectedPivot).toBeDefined();
        // expect(scope.selectedPivot.title === 'Recent').toBeTruthy();

      }));

      it('should change selection when uif-selected changed', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot uif-pivots="pivotCollection" uif-selected="selectedPivot"></uif-pivot>');
        scope.selectedPivot = undefined;
        scope.pivotCollection = [
          new pivot.PivotItem('My Files'),
          new pivot.PivotItem('Recent'),
          new pivot.PivotItem('Shared with me')
        ];
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        scope.$digest();
        scope.selectedPivot = new pivot.PivotItem('Shared with me');
        scope.$digest();

        let pivots: JQuery = element.find('li');

        expect(pivots[0]).not.toHaveClass('is-selected');
        expect(pivots[2]).toHaveClass('is-selected');

        scope.selectedPivot = new pivot.PivotItem('My Files');
        scope.$digest();
        expect(pivots[0]).toHaveClass('is-selected');
        expect(pivots[2]).not.toHaveClass('is-selected');

      }));

    });

    describe('<uif-pivot-ellipsis>', () => {
      beforeEach(inject(($rootScope: ng.IRootScopeService, $compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot-ellipsis></uif-pivot-ellipsis>');

        // compile = $compile;
        // rootScope = $rootScope;
        scope = $rootScope.$new();
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();
      }));

      it('should render as LI item', () => {
        let ellipsis: JQuery = element.children().first();

        expect(ellipsis.length === 1).toBeTruthy();
        expect(ellipsis[0].tagName === 'LI').toBeTruthy();
      });

      it('should have proper CSS classes', () => {
        let ellipsis: JQuery = element.children().first();

        expect(ellipsis).toHaveClass('ms-Pivot-link');
        expect(ellipsis).toHaveClass('ms-Pivot-link--overflow');
      });

      it('should have ellipsis icon', () => {
        let icon: JQuery = element.find('uif-icon');

        expect(icon.length === 1).toBeTruthy();
        expect(icon[0]).toHaveAttr('uif-type', 'ellipsis');
        expect(icon[0]).toHaveClass('ms-Pivot-ellipsis');
      });

      it('should transclude content', inject(($compile: ng.ICompileService) => {
        liteElement = liteElement = ng.element('<uif-pivot-ellipsis><div>Some sample text</div></uif-pivot-ellipsis>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();
        // recompileElement();

        let sampleDiv: JQuery = liteElement.find('div');
        expect(sampleDiv.length === 1).toBeTruthy();
        expect(sampleDiv.text()).toContain('Some sample text');
      }));

    });

    describe('ellipsis transclusion', () => {
      it('should transclude ellipsis', inject(($compile: ng.ICompileService) => {
        liteElement = ng.element('<uif-pivot><uif-pivot-ellipsis></uif-pivot-ellipsis></uif-pivot>');
        $compile(liteElement)(scope);
        element = jQuery(liteElement[0]);
        scope.$digest();
        // recompileElement();

        let ellipsis: JQuery = element.find('uif-pivot-ellipsis');

        expect(ellipsis.length === 1).toBeTruthy();

        expect(ellipsis.parent().parent()[0]).toHaveClass('ms-Pivot');

      }));
    });

  });

});
