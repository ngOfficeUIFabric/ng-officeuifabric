'use strict';

import * as angular from 'angular';
import {OverlayMode} from './overlayModeEnum';

/**
 * @ngdoc interface
 * @name IIconScope
 * @module officeuifabric.components.contextualmenu
 *
 * @description
 * This is the scope used by the `<uif-icon />` directive.
 *
 * @property {string} uifType - Icon to display. Possible types are defined in {@link IconEnum}.
 */
export interface IOverlayScope extends angular.IScope {
    uifMode: OverlayMode;
}

/**
 * @controller
 * @name OverlayController
 * @private
 * @description
 * Used to more easily inject the Angular $log service into the directive.
 */
class OverlayController {
    public static $inject: string[] = ['$log'];
    constructor(public log: angular.ILogService) {
    }
}

/**
 * @ngdoc directive
 * @name uifOverlay
 * @module officeuifabric.components.overlay
 *
 * @restrict E
 *
 * @description
 * `<uif-overlay>` is an overlay directive.
 *
 * @see {link http://dev.office.com/fabric/styles}
 *
 * @usage
 *
 * <uif-overlay>html markup goes here</uif-overlay>
 * <uif-overlay uif-overlay-dark="true">html markup goes here</>
 */
export class OverlayDirective implements angular.IDirective {

    public static log: angular.ILogService;

    public restrict: string = 'E';
    public template: string = '<div class="ms-Overlay" ng-class="{\'ms-Overlay--dark\': uifMode == \'dark\'}" ng-transclude></div>';
    public scope: {} = {
        uifMode: '@'
    };
    public transclude: boolean = true;

    public static factory(): angular.IDirectiveFactory {
        const directive: angular.IDirectiveFactory = (log: angular.ILogService) => new OverlayDirective(log);
        directive.$inject = ['$log'];
        return directive;
    }

    public constructor(public log: angular.ILogService) {
        OverlayDirective.log = log;
    }

    public link(scope: IOverlayScope): void {

        scope.$watch('uifMode', (newValue: string, oldValue: string) => {

            // verify a valid overlay mode was passed in
            if (OverlayMode[newValue] === undefined) {
                OverlayDirective.log.error('Error [ngOfficeUiFabric] officeuifabric.components.overlay - Unsupported overlay mode: ' +
                    'The overlay mode (\'' + scope.uifMode + '\') is not supported by the Office UI Fabric. ' +
                    'Supported options are listed here: ' +
                    'https://github.com/ngOfficeUIFabric/ng-officeuifabric/blob/master/src/components/overlay/overlayModeEnum.ts');
            }
        });
    };
}

/**
 * @ngdoc module
 * @name officeuifabric.components.overlay
 *
 * @description
 * Overlay
 *
 */
export let module: angular.IModule = angular.module('officeuifabric.components.overlay', [
    'officeuifabric.components'
])
    .directive('uifOverlay', OverlayDirective.factory());
