import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifContent
 * @module officeuifabric.components.content
 *
 * @restrict E
 *
 * @description
 * `<uif-content>` is a helper directive used by other direcitves (for example contextual menu, navbar).
 *
 * @usage
 *
 * <uif-content>
 *     <uif-icon uif-type="arrowRight"></uif-icon><b>Item</b>
 *     <uif-icon uif-type="arrowLeft"></uif-icon>
 * </uif-content>
 */
export class ContentDirective implements ng.IDirective {
  public static directiveName: string = 'uifContent';

  public replace: boolean = true;
  public restrict: string = 'E';
  public transclude: boolean = true;
  public scope: boolean = true;
  public template: string = `<span class="uif-content" ng-transclude></span>`;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new ContentDirective();
    return directive;
  }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.content
 *
 * @description
 * Content Module
 *
 */
export let module: ng.IModule = ng.module('officeuifabric.components.content', [
  'officeuifabric.components'])
  .directive(ContentDirective.directiveName, ContentDirective.factory());
