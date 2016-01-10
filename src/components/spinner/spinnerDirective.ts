'use strict';
import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifSpinner
 * @module officeuifabric.components.spinner
 *
 * @restrict E
 *
 * @description
 *
 * `<uif-spinner>` is a spinner directive.
 *
 * @see {link http://dev.office.com/fabric/components/}
 *
 * @usage
 *
 * <uif-spinner></uif-Spinner>
 */
export class SpinnerDirective implements ng.IDirective {
  public restrict: string = 'E';
  public transclude: boolean = true;
  public replace: boolean = true;
  public template: string = '<div class="ms-Spinner"></div>';
  public controller: any = SpinnerController;
  public scope: any = {
    'ngShow': '='
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new SpinnerDirective();
    return directive;
  }

  public link(
    scope: ISpinnerScope,
    instanceElement: ng.IAugmentedJQuery,
    attrs: ISpinnerAttributes,
    ctrl: any,
    $transclude: ng.ITranscludeFunction): void {

      if (attrs.uifSpinnersize === 'large') {
        instanceElement.addClass('ms-Spinner--large');
      }

      if (attrs.ngShow != null) {
        scope.$watch('ngShow', (newVisible: boolean, oldVisible: boolean, spinnerScope: ISpinnerScope): void => {
            if (newVisible) {
              spinnerScope.start();
            } else {
              spinnerScope.stop();
            }
        });
      } else {
        scope.start();
      }

      $transclude((clone: ng.IAugmentedJQuery) => {
        if (clone.length > 0) {
          let wrapper: ng.IAugmentedJQuery = ng.element('<div></div>');
          wrapper.addClass('ms-Spinner-label').append(clone);
          instanceElement.append(wrapper);
        }
      });

      scope.init();
  }
}

/**
 * @ngdoc interface
 * @name ISpinnerScope
 * @module officeuifabric.components.spinner
 *
 * @description
 * This is the scope used by the directive.
 *
 * @property {function} start     - Function strating the spinner animation. Called when spinner is being set to visivle state.
 * @property {function} stop      - Function stopping spinner animation. Called when spinner is being hidden.
 * @property {function} init      - Function that initializes spinner circles.
 * @property {boolean} ngShow     - Controls visibility of the spinner and triggers animation start/top on change.
 */
interface ISpinnerScope extends ng.IScope {
  start: () => void;
  stop: () => void;
  init: () => void;
  ngShow: boolean;
}

/**
 * @ngdoc object
 * @name SpinnerController
 * @requires  $scope, $element, $interval
 * @description
 * Spnner directive controller. Used to initialize the spinner element and controls the animation of the spinner.
 */
class SpinnerController {

  public static $inject: string[] = ['$scope', '$element', '$interval'];

  private _offsetSize: number = 0.179;
  private _numCircles: number = 8;
  private _animationSpeed: number = 90;
  private _circles: CircleObject[] = [];
  private _fadeIncrement: number;
  private _animationInterval: ng.IPromise<any>;

  constructor(
    public $scope: ISpinnerScope,
    private $element: ng.IAugmentedJQuery,
    private $interval: ng.IIntervalService) {

    $scope.init = (): void => {
      this.createCirclesAndArrange();
      this.setInitialOpacity();
    }

    $scope.start = (): void => {
      this._animationInterval = $interval(
      () => {
        let i: number = this._circles.length;
        while (i--) {
          this.fadeCircle(this._circles[i]);
        }
       },
      this._animationSpeed);
    };

    $scope.stop = (): void => {
      $interval.cancel(this._animationInterval);
    };
  }

  private createCirclesAndArrange(): void {

    let width: number = this.$element[0].clientWidth;
    let height: number = this.$element[0].clientHeight;
    let angle: number = 0;
    let offset: number = width * this._offsetSize;
    let step: number = (2 * Math.PI) / this._numCircles;
    let i: number = this._numCircles;
    let radius: number = (width - offset) * 0.5;

    while (i--) {
      let circle: ng.IAugmentedJQuery = this.createCircle();

      let x: number = Math.round(width * 0.5 + radius * Math.cos(angle) - circle[0].clientWidth * 0.5) - offset * 0.5;
      let y: number = Math.round(height * 0.5 + radius * Math.sin(angle) - circle[0].clientHeight * 0.5) - offset * 0.5;

      this.$element.append(circle);

      circle.css('left', (x + 'px'));
      circle.css('top', (y + 'px'));

      angle += step;

      let circleObject: CircleObject = new CircleObject(circle, i);
      this._circles.push(circleObject);
    }
  }

  private createCircle(): ng.IAugmentedJQuery {
    let circle: ng.IAugmentedJQuery = ng.element('<div></div>');
    let parentWidth: number = this.$element[0].clientWidth;
    let dotSize: string = (parentWidth * this._offsetSize) + 'px';

    circle.addClass('ms-Spinner-circle').css('width', dotSize).css('height', dotSize);

    return circle;
  };

  private setInitialOpacity(): void {

        let opcaityToSet: number;
        this._fadeIncrement = 1 / this._numCircles;

        this._circles.forEach((circle: CircleObject, index: number) => {
          opcaityToSet = (this._fadeIncrement * (index + 1));
          circle.opacity = opcaityToSet;
        });
  }

  private fadeCircle(circle: CircleObject): void {
    let newOpacity: number = circle.opacity - this._fadeIncrement;

    if (newOpacity <= 0) {
      newOpacity = 1;
    }

    circle.opacity = newOpacity;
  }

}

class CircleObject {
  constructor(
    public circleElement: ng.IAugmentedJQuery,
    public circleIndex: number) {
  }

  public get opacity(): number {
    return +(this.circleElement.css('opacity'));
  }

  public set opacity(opacity: number) {
    this.circleElement.css('opacity', opacity);
  }
}

interface ISpinnerAttributes extends ng.IAttributes {
  uifSpinnersize?: string;
  ngShow?: any;
}

/**
 * @ngdoc module
 * @name officeuifabric.components.spinner
 *
 * @description
 * Spinner
 */
export var module: ng.IModule = ng.module('officeuifabric.components.spinner', ['officeuifabric.components'])
  .directive('uifSpinner', SpinnerDirective.factory());
