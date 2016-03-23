'use strict';

import * as ng from 'angular';
import {PivotSize} from './pivotSizeEnum';
import {PivotType} from './pivotTypeEnum';

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

export class PivotItem {
  constructor(public title: string) {}
  public selected: boolean;
}

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

export class PivotDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = false;
  public controller: typeof PivotController = PivotController;
  public require: string[] = ['uifPivot'];
  public template: string = '<ul class="ms-Pivot" ng-class="getClasses()" >' +
    '<li class="ms-Pivot-link" ng-repeat="pivot in uifPivots" ng-click="pivotClick($index)" ' +
      'ng-class="{\'is-selected\': pivot.selected}">{{pivot.title}}</li>' +
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

export interface IPivotScope extends ng.IScope {
  uifPivots: PivotItem[];
  uifSelected: PivotItem;
  uifSize: string;
  uifType: string;

  pivotClick: (index: number) => void;
  getClasses: () => string;
}

export var module: ng.IModule = ng.module('officeuifabric.components.pivot', ['officeuifabric.components'])
  .directive('uifPivot', PivotDirective.factory())
  .directive('uifPivotEllipsis', PivotEllipsisDirective.factory());
