'use strict';

import * as ng from 'angular';
import {PivotSize} from './pivotSizeEnum';
import {PivotType} from './pivotTypeEnum';

/**
 * @ngdoc controller
 * @name PivotController
 * @module officeuifabric.components.pivot
 *
 * @description
 * Controller for the `<uif-pivot>` directive.
 */
export class PivotController {
  public static $inject: string[] = ['$log', '$scope'];

  constructor(public $log: ng.ILogService, public $scope: IPivotScope) {

    $scope.pivotClick = (index: number) => {
      $scope.uifPivots.forEach((pivotItem: PivotItem, pivotIndex: number) => {
        pivotItem.selected = pivotIndex === index;
        if (pivotItem.selected) {
          $scope.uifSelected = pivotItem;
        }
      });
    };
  }
}

/**
 * @ngdoc object
 * @name PivotItem
 * @module officeuifabric.components.pivot
 *
 * @description
 * Object defining content of the pivot item.
 *
 * @property {string} title - defines the content of the pivot item inside pivot element.
 * @property {boolean} selected - used internally to track if current item is selected
 */
export class PivotItem {
  constructor(public title: string) {}
  public selected: boolean;
}

/**
 * @ngdoc directive
 * @name uifPivotEllipsis
 * @module officeuifabric.components.pivot
 *
 * @restrict E
 *
 * @description
 *
 * `<uif-pivot-ellipsis>` is a directive rendering ellipsis element for pivot component.
 *
 * @see {link http://dev.office.com/fabric/components/}
 *
 * @usage
 *
 * <uif-pivot-ellipsis></uif-pivot-ellipsis>
 */
export class PivotEllipsisDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public template: string = '<li class="ms-Pivot-link ms-Pivot-link--overflow">' +
    '<uif-icon uif-type="ellipsis" class="ms-Pivot-ellipsis"></uif-icon>' +
    '<ng-transclude></ng-transclude>' +
  '</li>';
  public scope: boolean = false;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PivotEllipsisDirective();
    return directive;
  }
}

/**
 * @ngdoc directive
 * @name uifPivot
 * @module officeuifabric.components.pivot
 *
 * @restrict E
 *
 * @description
 *
 * `<uif-pivot>` is a directive for rendering pivot component.
 *
 * @see {link http://dev.office.com/fabric/components/}
 *
 * @usage
 *
 * <uif-pivot></uif-pivot>
 */
export class PivotDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public controller: typeof PivotController = PivotController;
  public require: string[] = ['uifPivot'];
  public template: string = '<ul class="ms-Pivot" ng-class="getClasses()" >' +
    '<span ng-repeat-start="pivot in uifPivots"></span>' +
    '<li class="ms-Pivot-link" ng-click="pivotClick($index)" ' +
      'ng-class="{\'is-selected\': pivot.selected}">{{pivot.title}}</li> ' +
    '<span ng-repeat-end></span>' +
    '<ng-transclude></ng-transclude>' +
    '</ul>';

  public scope: any = {
    uifPivots: '=?',
    uifSelected: '=?',
    uifSize: '@',
    uifType: '@'
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new PivotDirective();
    return directive;
  }

  public link(scope: IPivotScope, intanceElement: ng.IAugmentedJQuery, attrs: any, controllers: any): void {

    let pivotController: PivotController = controllers[0];

    scope.$watch('uifSize', (newSize: string) => {
      if (ng.isDefined(newSize) && ng.isUndefined(PivotSize[newSize])) {
        pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
          '"' + newSize + '" is not a valid value for uifSize. It should be regular or large.');
      }
    });

    scope.$watch('uifType', (newType: string) => {
      if (ng.isDefined(newType) && ng.isUndefined(PivotType[newType])) {
        pivotController.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.pivot - Unsupported size: ' +
          '"' + newType + '" is not a valid value for uifType. It should be regular or tabs.');
      }
    });

    scope.$watch('uifSelected', (newValue: PivotItem, oldValue: PivotItem) => {
      if (ng.isDefined(newValue)) {

        scope.uifPivots.forEach((currentPivot: PivotItem) => {
          currentPivot.selected = currentPivot.title === newValue.title;
        });

        // if there is more than one selected, select the first one
        let selectedPivots: PivotItem[] = scope.uifPivots.filter((currentPivot: PivotItem) => {
          return currentPivot.selected;
        });

        if (selectedPivots.length > 1) {
          for (let i: number = 1; i < selectedPivots.length; i++) {
            selectedPivots[i].selected = false;
          }
        }
      }
    });

    scope.getClasses = () => {
      let classes: string = '';

      classes += PivotType[scope.uifType] === PivotType.tabs ? 'ms-Pivot--tabs' : '';
      classes += PivotSize[scope.uifSize] === PivotSize.large ? ' ms-Pivot--large' : '';

      return classes;
    };
  }

}

/**
 * @ngdoc interface
 * @name IPivotScope
 * @module officeuifabric.components.pivot
 *
 * @description
 * This is the scope used by uifPivot directive.
 *
 * @property {array} uifPivots        - Collection of items to be rendered as pivot elements.
 * @property {PivotItem} uifSelected  - Currently selected pivot. Can be used to get & set selected item.
 * @property {string} uifSize         - size of the pivot component.
 * @property {string} uifType         - type of the pivot component.
 * @property {function} pivotClick    - click-event handler for pivot elements for selecting proper elements.
 * @property {function} getClasses    - function for dynamic determination of classes for pivot element.
 */
export interface IPivotScope extends ng.IScope {
  uifPivots: PivotItem[];
  uifSelected: PivotItem;
  uifSize: string;
  uifType: string;

  pivotClick: (index: number) => void;
  getClasses: () => string;
}

/**
 * @ngdoc module
 * @name officeuifabric.components.pivot
 *
 * @description
 * Pivot module
 */
export var module: ng.IModule = ng.module('officeuifabric.components.pivot', ['officeuifabric.components'])
  .directive('uifPivot', PivotDirective.factory())
  .directive('uifPivotEllipsis', PivotEllipsisDirective.factory());
