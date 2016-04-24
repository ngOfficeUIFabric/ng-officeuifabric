'use strict';

import * as ng from 'angular';


/**
 * @controller
 * @name MessageBannerController
 * @private
 * @description
 * Used to more easily inject the Angular $log and $window services into the directive.
 */
export class MessageBannerController {
    public static $inject: string[] = ['$scope', '$log', '$window'];
    constructor(public $scope: IMessageBannerScope, public $log: ng.ILogService, public $window: ng.IWindowService) {
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
 *  
 * @property {string} actionLabel    - Label for the action button.
 * @property {string} message        - Message text
 * @property {boolean} isOpen        - Hide or show message banner
 * 
 */
export interface IMessageBannerScope extends ng.IScope {
    actionLabel: string;
    message: string;
    isOpen: boolean;
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
 * @property {Function} uifOnClose      - Expression to be called on message banner close event
 *
 */
export interface IMessageBannerAttributes extends ng.IAttributes {
    uifAction: () => void;
    uifActionLabel: string;
    uifMessage: string;
    uifIsOpen: boolean;
    uifOnClose: () => void;
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
 * <uif-message-banner uif-action="" uif-action-label="" uif-is-open="" uif-on-close="OnCloseCallback">
 *  <uif-content>
 *      <uif-icon uif-type="alert"></uif-icon><b>Important message goes here</b>
 *  </uif-content>
 * </uif-message-banner>
 */
export class MessageBannerDirective implements ng.IDirective {
    constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService) {
    };
    public controller: typeof MessageBannerController = MessageBannerController;
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = false;
    public require: string = 'uifMessageBanner';

    public template: string = '' +
    '<div class="ms-MessageBanner">' +
    '<div class="ms-MessageBanner-content">' +
    '<div class="ms-MessageBanner-text">' +
    '<div class="ms-MessageBanner-clipper"></div>' +
    '</div>' +
    '<uif-button uif-type="command" class="ms-MessageBanner-expand is-visible">' +
    '<uif-icon uif-type="chevronsDown"></uif-icon>' +
    '</uif-button>' +
    '<div class="ms-MessageBanner-action">' +
    '<uif-button uif-type="primary" class="ms-fontColor-neutralLight" ng-click="uifAction()">{{actionLabel}}</uif-button>' +
    '</div>' +
    '</div>' +
    '<uif-button uif-type="command" class="ms-MessageBanner-close" ng-click="uifOnClose()">' +
    '<uif-icon uif-type="x"></uif-icon>' +
    '</uif-button>' +
    '</div>';

    public scope: any = {
        uifAction: '&',
        uifActionLabel: '@',
        uifIsOpen: '=',
        uifMessage: '=?',
        uifOnClose: '&'
    };

    // ui fabric js variables
    private _clipper: ng.IAugmentedJQuery;
    private _bufferSize: number;
    private _textContainerMaxWidth: number = 700;
    private _clientWidth: number;
    private _textWidth: string;
    private _initTextWidth: number;
    private _chevronButton: ng.IAugmentedJQuery;
    private _messageBanner: ng.IAugmentedJQuery;
    private _actionButton: ng.IAugmentedJQuery;
    private _closeButton: ng.IAugmentedJQuery;
    private _bufferElementsWidth: number = 88;
    private _bufferElementsWidthSmall: number = 35;
    private SMALL_BREAK_POINT: number = 480;
    // ui fabric js variables end

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory =
            ($log: ng.ILogService, $timeout: ng.ITimeoutService) => new MessageBannerDirective($log, $timeout);
        directive.$inject = ['$log', '$timeout'];
        return directive;
    }

    public link: ng.IDirectiveLinkFn = (
        $scope: IMessageBannerScope, $elem: ng.IAugmentedJQuery,
        $attrs: IMessageBannerAttributes, $controller: MessageBannerController,
        $transclude: ng.ITranscludeFunction): void => {

        $scope.message = $attrs.uifMessage;
        $scope.actionLabel = $attrs.uifActionLabel;

        this._initLocals($elem);
        this.transcludeChilds($scope, $elem, $transclude);

        // office ui fabric functions
        ng.element($controller.$window).bind('resize', () => {
            this._onResize();
            $scope.$digest();
        });

        // watch for message banner toggle
        $scope.isOpen = $attrs.uifIsOpen;
        $scope.$watch(
            'isOpen',
            (newValue: string, oldValue: string) => {
                if (typeof newValue !== 'undefined') {
                    if ($scope.isOpen) {
                        this._showBanner();
                    } else {
                        this._hideBanner();
                    }
                }
            }
        );
        ng.element(this._chevronButton).bind('click', () => {
            this._toggleExpansion();
        });
        ng.element(this._closeButton).bind('click', () => {
            this._hideBanner();
        });
    };

    private transcludeChilds(
        $scope: IMessageBannerScope, $element: ng.IAugmentedJQuery,
        $transclude: ng.ITranscludeFunction): void {

        $transclude((clone: ng.IAugmentedJQuery) => {
            let hasContent: boolean = this.hasItemContent(clone);

            if (!hasContent && !$scope.message) {
                this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.messagebanner - ' +
                    'you need to provide a text for the message banner.\n' +
                    'For <uif-message-banner> you need to specify either \'uif-message\' ' +
                    'as attribute or <uif-content> as a child directive');
            }
            this.insertItemContent(clone, $scope, $element);
        });
    }

    private insertItemContent(clone: ng.IAugmentedJQuery, $scope: IMessageBannerScope, $element: ng.IAugmentedJQuery): void {
        let contentElement: JQuery = angular.element($element[0].querySelector('.ms-MessageBanner-clipper'));

        if (this.hasItemContent(clone)) { /* element provided */
            for (let i: number = 0; i < clone.length; i++) {
                let element: ng.IAugmentedJQuery = angular.element(clone[i]);
                if (element.hasClass('uif-content')) {
                    contentElement.append(element);
                    break;
                }
            }
        } else { /* text attribute provided */
            contentElement.html($scope.message);
        }
    }

    private hasItemContent(clone: ng.IAugmentedJQuery): boolean {
        for (let i: number = 0; i < clone.length; i++) {
            let element: ng.IAugmentedJQuery = angular.element(clone[i]);
            if (element.hasClass('uif-content')) {
                return true;
            }
        }
        return false;
    }
    // ui fabric private functions
    /**
     * helper for init of local variables
     */
    private _initLocals($elem: ng.IAugmentedJQuery): void {
        this._messageBanner = $elem;
        this._clipper = ng.element($elem[0].querySelector('.ms-MessageBanner-clipper'));
        this._chevronButton = ng.element($elem[0].querySelector('.ms-MessageBanner-expand'));
        this._actionButton = ng.element($elem[0].querySelector('.ms-MessageBanner-action'));
        this._bufferSize = this._actionButton[0].offsetWidth + this._bufferElementsWidth;
        this._closeButton = ng.element($elem[0].querySelector('.ms-MessageBanner-close'));
    }

    /**
     * sets styles on resize
     */
    private _onResize(): void {
        this._clientWidth = this._messageBanner[0].offsetWidth;
        if (window.innerWidth >= this.SMALL_BREAK_POINT) {
            this._resizeRegular();
        } else {
            this._resizeSmall();
        }
    };

    /**
     * resize above 480 pixel breakpoint
     */
    private _resizeRegular(): void {
        if ((this._clientWidth - this._bufferSize) > this._initTextWidth && this._initTextWidth < this._textContainerMaxWidth) {
            this._textWidth = 'auto';
            this._chevronButton[0].className = 'ms-MessageBanner-expand';
            this._collapse();
        } else {
            this._textWidth = Math.min((this._clientWidth - this._bufferSize), this._textContainerMaxWidth) + 'px';
            if (this._chevronButton[0].className.indexOf('is-visible') === -1) {
                this._chevronButton[0].className += ' is-visible';
            }
        }
        this._clipper[0].style.width = this._textWidth;
    };

    /**
     * resize below 480 pixel breakpoint
     */
    private _resizeSmall(): void {
        if (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth) > this._initTextWidth) {
            this._textWidth = 'auto';
            this._collapse();
        } else {
            this._textWidth = (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth)) + 'px';
        }
        this._clipper[0].style.width = this._textWidth;
    };
    /**
     * expands component to show full error message
     */
    private _expand(): void {
        let icon: Element = this._chevronButton[0].querySelector('.ms-Icon');
        this._messageBanner[0].className += ' is-expanded';
        icon.className = 'ms-Icon ms-Icon--chevronsUp';
    };

    /**
     * collapses component to only show truncated message
     */
    private _collapse(): void {
        let icon: Element = this._chevronButton[0].querySelector('.ms-Icon');
        this._messageBanner[0].className = 'ms-MessageBanner';
        icon.className = 'ms-Icon ms-Icon--chevronsDown';
    };

    private _toggleExpansion(): void {
        if (this._messageBanner[0].className.indexOf('is-expanded') > -1) {
            this._collapse();
        } else {
            this._expand();
        }
    };

    /**
     * hides banner when close button is clicked
     */
    private _hideBanner(): void {
        if (this._messageBanner[0].className.indexOf('hide') === -1) {
            this._messageBanner[0].className += ' hide';
            this.$timeout(
                (): void => {
                    this._messageBanner[0].className = 'ms-MessageBanner is-hidden';
                },
                500);
        }
    };

    /**
     * shows banner if the banner is hidden
     */
    private _showBanner(): void {
        this._messageBanner[0].className = 'ms-MessageBanner';
    };
    // ui fabric private functions end
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

