'use strict';

import * as ng from 'angular';


/**
 * @controller
 * @name MessageBannerController
 * @private
 * @description
 * Used to more easily inject the Angular $log and $window services into the directive.
 */
class MessageBannerController {
    public static $inject: string[] = ['$log', '$window'];
    constructor(public $log: ng.ILogService, public $window: ng.IWindowService) {
    }
}

/**
 * @ngdoc interface
 * @name IMessageBannerScope
 * @module officeuifabric.components.messagebanner
 *
 * @description
 * This is the scope used by the `<uif-message-banner />` directive.
 *
 * <uif-message-banner uif-is-open="" uif-message="" uif-action-label="" uif-action="" />
 * 
 * @property {string} actionClick    - Expression to be called on the button click event 
 * @property {string} actionLabel    - Label for the action button.
 * @property {string} message        - Message text
 * @property {boolean} isOpen        - Hide or show message banner
 * 
 */
export interface IMessageBannerScope extends ng.IScope {
    actionClick: (ev: any) => any;
    actionLabel: string;
    message: string;
    isOpen: boolean;

    // replacement of office ui
    _onResize: () => void;
}

/**
 * @ngdoc interface
 * @name IMessageBannerAttributes
 * @module officeuifabric.components.messagebanner
 *
 * @description
 * This is the attribute interface used by the directive.
 *
 * @property {Function} uifAction       - Expression to be called on the button click event
 * @property {string} uifActionLabel    - Label for the action button.
 * @property {string} uifMessage        - Message text
 * @property {boolean} uifIsOpen        - Hide or show message banner
 *
 */
export interface IMessageBannerAttributes extends ng.IAttributes {
    uifAction: (ev: any) => any;
    uifActionLabel: string;
    uifMessage: string;
    uifIsOpen: boolean;
}

/**
 * @ngdoc directive
 * @name uifMessageBanner
 * @module officeuifabric.components.messagebanner
 * 
 * @restrict E
 * 
 * @description 
 * `<uif-message-banner>` is an message banner directive.
 * 
 * @see {link http://dev.office.com/fabric/components/messagebanner}
 * 
 * @usage
 * 
 * <uif-message-banner uif-is-open="" uif-message="" uif-action-label="" uif-action="" />
 */
export class MessageBannerDirective implements ng.IDirective {
    public controller: typeof MessageBannerController = MessageBannerController;

    public require: string = 'uifMessageBanner';

    public template: string = '' +
    '<div class="ms-MessageBanner">' +
    '<div class="ms-MessageBanner-content">' +
    '<div class="ms-MessageBanner-text">' +
    '<div class="ms-MessageBanner-clipper">{{message}}</div>' +
    '</div>' +
    '<uif-button uif-type="command" class="ms-MessageBanner-expand is-visible">' +
    '<uif-icon uif-type="chevronsDown"></uif-icon>' +
    '</uif-button>' +
    '<div class="ms-MessageBanner-action">' +
    '<uif-button uif-type="primary" class="ms-fontColor-neutralLight" ng-click="actionClick()">{{actionLabel}}</uif-button>' +
    '</div>' +
    '</div>' +
    '<uif-button uif-type="command" class="ms-MessageBanner-close">' +
    '<uif-icon uif-type="x"></uif-icon>' +
    '</uif-button>' +
    '</div>';

    public scope: any = {
        uifAction: '&',
        uifActionLabel: '@',
        uifIsOpen: '=',
        uifMessage: '@'
    };

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new MessageBannerDirective();

        return directive;
    }

    public link(scope: IMessageBannerScope, elem: ng.IAugmentedJQuery,
                attrs: IMessageBannerAttributes, controller: MessageBannerController): void {

        scope.message = attrs.uifMessage;
        scope.actionClick = attrs.uifAction;
        scope.actionLabel = attrs.uifActionLabel;

        ng.element(controller.$window).bind('resize', () => {
            // let clientWidth: number = elem[0].offsetWidth;
            // let bufferSize: number = 
            // if (controller.$window.innerWidth >= 480) {
            //     if ((clientWidth - _bufferSize) > _initTextWidth && _initTextWidth < _textContainerMaxWidth) {
            //         _textWidth = "auto";
            //         _chevronButton.className = "ms-MessageBanner-expand";
            //         _collapse();
            //     } else {
            //         _textWidth = Math.min((_clientWidth - _bufferSize), _textContainerMaxWidth) + "px";
            //         if (_chevronButton.className.indexOf("is-visible") === -1) {
            //             _chevronButton.className += " is-visible";
            //         }
            //     }
            //     _clipper.style.width = _textWidth;
            // } else {
            //     if (_clientWidth - (_bufferElementsWidthSmall + _closeButton.offsetWidth) > _initTextWidth) {
            //         _textWidth = "auto";
            //         _collapse();
            //     } else {
            //         _textWidth = (_clientWidth - (_bufferElementsWidthSmall + _closeButton.offsetWidth)) + "px";
            //     }
            //     _clipper.style.width = _textWidth;
            // }
            scope.$digest();
        });
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.messagebanner
 * 
 * @description 
 * MessageBanner
 * 
 */
export var module: ng.IModule = ng.module('officeuifabric.components.messagebanner', ['officeuifabric.components'])
    .directive('uifMessageBanner', MessageBannerDirective.factory());

