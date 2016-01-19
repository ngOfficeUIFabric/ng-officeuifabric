'use strict';

import * as ng from 'angular';

/**
 * @ngdoc interface
 * @name IProgressIndicatorScope
 * @module officeuifabric.components.progressindicator
 *
 * @description
 * This is the scope used by the `<uif-progress-indicator />` directive.
 *
 * @property {string} uifType - Icon to display. Possible types are defined in {@link IconEnum}.
 */
export interface IProgressIndicatorScope extends ng.IScope {
    uifName: string;
    uifDescription: string;
    uifPercentComplete: number;
}

/**
 * @ngdoc directive
 * @name uifProgressIndicator
 * @module officeuifabric.components.progressindicator
 *
 * @restrict E
 *
 * @description
 * `<uif-progress-indicator>` is a progress indicator directive.
 *
 * @see {link http://dev.office.com/fabric/styles}
 *
 * @usage
 *
 * <uif-progress-indicator uif-name="MyDocument.docx" uif-description="This is a sample document."
 *  uif-percent-complete="65"></uif-progress-indicator>
 */
export class ProgressIndicatorDirective implements ng.IDirective {

    public static log: ng.ILogService;

    public restrict: string = 'E';
    public template: string = '<div class="ms-ProgressIndicator">' +
    '<div class="ms-ProgressIndicator-itemName">{{uifName}}</div>' +
    '<div class="ms-ProgressIndicator-itemProgress">' +
    '<div class="ms-ProgressIndicator-progressTrack"></div>' +
    '<div class="ms-ProgressIndicator-progressBar" ng-style="{width: uifPercentComplete+\'%\'}"></div>' +
    '</div>' +
    '<div class="ms-ProgressIndicator-itemDescription">{{uifDescription}}</div>' +
    '</div>';
    public scope: {} = {
        uifDescription: '@',
        uifName: '@',
        uifPercentComplete: '@'
    };

    public constructor(public log: ng.ILogService) {
        ProgressIndicatorDirective.log = log;
    }

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = (log: ng.ILogService) => new ProgressIndicatorDirective(log);
        directive.$inject = ['$log'];
        return directive;
    }

    public link(scope: IProgressIndicatorScope): void {
        // add watcher

        scope.$watch('uifPercentComplete', (newValue: string, oldValue: string) => {
            // verify a valid percent range was passed in
            if (newValue == null || newValue === '') {
                scope.uifPercentComplete = 0;
                return;
            }

            let newPercentComplete: number = parseFloat(newValue);

            if (isNaN(newPercentComplete) || newPercentComplete < 0 || newPercentComplete > 100) {
                ProgressIndicatorDirective.log.error('Error [ngOfficeUiFabric] officeuifabric.components.progressindicator - ' +
                    'Percent complete must be a valid number between 0 and 100.');

                // ensure percent complete does not go out of range
                scope.uifPercentComplete = Math.max(Math.min(newPercentComplete, 100), 0);
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
export var module: ng.IModule = ng.module('officeuifabric.components.progressindicator', [
    'officeuifabric.components'
])
    .directive('uifProgressIndicator', ProgressIndicatorDirective.factory());
