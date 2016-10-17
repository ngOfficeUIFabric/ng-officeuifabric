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
 * @property {string} actionLabel   - Label for the action button.
 * @property {boolean} isVisible    - Hide or show message banner
 *
 */
export interface IMessageBannerScope extends ng.IScope {
    uifActionLabel: string;
    uifIsVisible: boolean;

    isExpanded: boolean;

    onResize: () => void;
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
 * @property {boolean} uifIsVisible     - Hide or show the message banner
 * @property {Function} uifOnClose      - Expression to be called on message banner close event
 *
 */
export interface IMessageBannerAttributes extends ng.IAttributes {
    uifAction: () => void;
    uifActionLabel: string;
    uifIsVisible: boolean;
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
    public controller: typeof MessageBannerController = MessageBannerController;
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = false;
    public require: string = 'uifMessageBanner';

    public isExpanded: boolean = false;

    public template: string = `
    <div class="ms-MessageBanner" ng-show="uifIsVisible">
    <div class="ms-MessageBanner-content">
    <div class="ms-MessageBanner-text">
    <div class="ms-MessageBanner-clipper"></div>
    </div>
    <uif-button type="button" uif-type="command" class="ms-MessageBanner-expand">
    <uif-icon uif-type="chevronsDown" ng-show="!isExpanded"></uif-icon>
    <uif-icon uif-type="chevronsUp" ng-show="isExpanded"></uif-icon>
    </uif-button>
    <div class="ms-MessageBanner-action">
    <uif-button type="button" uif-type="primary" class="ms-fontColor-neutralLight" ng-click="uifAction()">{{ uifActionLabel }}</uif-button>
    </div>
    </div>
    <uif-button type="button" uif-type="command" class="ms-MessageBanner-close" ng-click="uifOnClose()" style="height:52px">
    <uif-icon uif-type="x"></uif-icon>
    </uif-button>
    </div>`;

    public scope: any = {
        uifAction: '&',
        uifActionLabel: '@',
        uifIsVisible: '=?',
        uifOnClose: '&?'
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
            ($log: ng.ILogService, $timeout: ng.ITimeoutService) =>
                new MessageBannerDirective($log, $timeout);
        directive.$inject = ['$log', '$timeout'];
        return directive;
    }

    constructor(private $log: ng.ILogService, private $timeout: ng.ITimeoutService) {
    };

    public link: ng.IDirectiveLinkFn = (
        $scope: IMessageBannerScope, $elem: ng.IAugmentedJQuery,
        $attrs: IMessageBannerAttributes, $controller: MessageBannerController,
        $transclude: ng.ITranscludeFunction): void => {

        $scope.uifActionLabel = $attrs.uifActionLabel;
        $scope.isExpanded = false;

        $scope.onResize = (innerWidth?: number) => {
            if (innerWidth === undefined) {
                innerWidth = window.innerWidth;
            }
            this._clientWidth = this._messageBanner[0].offsetWidth;
            if (innerWidth >= this.SMALL_BREAK_POINT) {
                this._resizeRegular();
            } else {
                this._resizeSmall();
            }
        };

        this._initLocals($elem);
        this.transcludeChilds($scope, $elem, $transclude);

        this._initTextWidth = (this._clipper.children().eq(0))[0].offsetWidth;

        // office ui fabric functions bindings
        ng.element($controller.$window).bind('resize', () => {
            $scope.onResize();
            $scope.$digest();
        });
        ng.element(this._chevronButton).bind('click', () => {
            this._toggleExpansion($scope);
        });
        ng.element(this._closeButton).bind('click', () => {
            this._hideBanner($scope);
        });

        $scope.onResize();
    };

    private transcludeChilds(
        $scope: IMessageBannerScope, $element: ng.IAugmentedJQuery,
        $transclude: ng.ITranscludeFunction): void {

        $transclude((clone: ng.IAugmentedJQuery) => {
            let hasContent: boolean = this.hasItemContent(clone);

            // if (!hasContent && !$scope.message) {
            if (!hasContent) {
                this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.messagebanner - ' +
                    'you need to provide a text for the message banner.\n' +
                    'For <uif-message-banner> you need to specify' +
                    '<uif-content> as a child directive');
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
        this._messageBanner = ng.element($elem[0].querySelector('.ms-MessageBanner'));
        this._clipper = ng.element($elem[0].querySelector('.ms-MessageBanner-clipper'));
        this._chevronButton = ng.element($elem[0].querySelectorAll('.ms-MessageBanner-expand'));
        this._actionButton = ng.element($elem[0].querySelector('.ms-MessageBanner-action'));
        this._bufferSize = this._actionButton[0].offsetWidth + this._bufferElementsWidth;
        this._closeButton = ng.element($elem[0].querySelector('.ms-MessageBanner-close'));
    }

    /**
     * resize above 480 pixel breakpoint
     */
    private _resizeRegular(): void {
        if ((this._clientWidth - this._bufferSize) > this._initTextWidth && this._initTextWidth < this._textContainerMaxWidth) {
            this._textWidth = 'auto';
            this._chevronButton[0].className = 'ms-MessageBanner-expand';
        } else {
            this._textWidth = Math.min((this._clientWidth - this._bufferSize), this._textContainerMaxWidth) + 'px';
            if (!this._chevronButton.hasClass('is-visible')) {
                this._chevronButton[0].className += ' is-visible';
            }
        }
        this._clipper[0].style.width = this._textWidth;
        this._chevronButton[0].style.height = '52px';
    };

    /**
     * resize below 480 pixel breakpoint
     */
    private _resizeSmall(): void {
        if (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth) > this._initTextWidth) {
            this._textWidth = 'auto';
        } else {
            this._textWidth = (this._clientWidth - (this._bufferElementsWidthSmall + this._closeButton[0].offsetWidth)) + 'px';
        }
        this._clipper[0].style.width = this._textWidth;
        this._chevronButton[0].style.height = '85px';
    };

    private _toggleExpansion($scope: IMessageBannerScope): void {
        $scope.isExpanded = !$scope.isExpanded;
        $scope.$digest();
        this._messageBanner.toggleClass('is-expanded');
    };

    /**
     * hides banner when close button is clicked
     */
    private _hideBanner($scope: IMessageBannerScope): void {
        if ($scope.uifIsVisible) {
            this._messageBanner.addClass('hide');
            this.$timeout(
                (): void => {
                    $scope.uifIsVisible = false;
                    $scope.$apply();
                    this._messageBanner.removeClass('hide');
                },
                500);
        }
    };
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
