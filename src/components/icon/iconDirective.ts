
export class IconDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<i class="ms-Icon ms-Icon--{{uifType}}" aria-hidden="true"></i>';
  public scope: {} = {
    uifType: '@'
  };
  public transclude: Boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new IconDirective();
    return directive;
  }
}

angular.module('fabric.ui.components.icon', ['fabric.ui.components'])
  .directive('uifIcon', IconDirective.factory());

// - two way binding
// - set from code & watch directive change
// - verbose comment