'use strict';
import * as ng from 'angular';

/*
<uif-dialog uif-type="<empty>|header|multiline" uif-close="true|false" uif-overlay="light|dark">
       <uif-dialog-header>
                  <uif-dialog-title> </uif-dialog-title>
           </uif-dialog-header>
           <uif-dialog-content>
                  <uif-dialog-subtext> </uif-dialog-subtext>
           </uif-dialog-content>
       <uif-dialog-actions uif-position="left|right" >
                     <uif-button />
          </uif-dialog-actions>
 </uif-dialog>
 */

export class DialogDirective implements ng.IDirective {
    public restrict: string = 'E';
    public replace: boolean = true;
    public transclude: boolean = true;
    public template: string = '<div class="ms-Dialog"><ng-transclude /></div>';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new DialogDirective();
        return directive;
    }

}

export var module: ng.IModule = ng.module('officeuifabric.components.dialog', ['officeuifabric.components'])
    .directive('uifDialog', DialogDirective.factory());
