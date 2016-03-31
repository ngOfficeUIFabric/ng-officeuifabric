'use strict';

import * as ng from 'angular';
import {ListItemSelectModeEnum} from './listItemSelectModeEnum';
import {ListItemTypeEnum} from './listItemTypeEnum';
import {ListLayoutEnum} from './listLayoutEnum';

/**
 * @ngdoc interface
 * @name IListScope
 * @module officeuifabric.components.list
 * 
 * @description 
 * Scope used by the list controller. 
 * 
 * @property {string} itemSelectMode - Specifies the list item selection mode used by the list
 * @property {string} layout         - Specifies how the list should be rendered
 * @property {IListItemScope[]}      - Contains the data items that belong to the list  
 */
export interface IListScope extends ng.IScope {
    itemSelectMode?: string;
    layout?: string;
    items: IListItemScope[];
}

class ListController  {
    public static $inject: string[] = ['$scope', '$log'];

    constructor(public $scope: IListScope, public $log: ng.ILogService) {
        this.$scope.items = [];
    }

    get itemSelectMode(): string {
        return this.$scope.itemSelectMode;
    }
    set itemSelectMode(itemSelectMode: string) {
        if (ListItemSelectModeEnum[itemSelectMode] === undefined) {
            this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
            '\'' + itemSelectMode + '\' is not a valid option for \'uif-item-select-mode\'. ' +
            'Valid options are none|single|multiple.');
        } else {
            this.$scope.itemSelectMode = itemSelectMode;
            this.$scope.$digest();
        }
    }

    get layout(): string {
        return this.$scope.layout;
    }
    set layout(layout: string) {
        if (ListLayoutEnum[layout] === undefined) {
            this.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
            '\'' + layout + '\' is not a valid option for \'uif-layout\'. ' +
            'Valid options are list|grid.');
        } else {
            this.$scope.layout = layout;
            this.$scope.$digest();
        }
    }

    get items(): IListItemScope[] {
        return this.$scope.items;
    }
    set items(items: IListItemScope[]) {
        this.$scope.items = items;
    }

    get selectedItems(): any[] {
        let selectedItems: any[] = [];

        for (let i: number = 0; i < this.items.length; i++) {
            if (this.items[i].selected === true) {
                selectedItems.push(this.items[i].item);
            }
        }

        return selectedItems;
    }
}

/**
 * @ngdoc interface
 * @name IListAttributes
 * @module officeuifabric.components.list
 * 
 * @description 
 * Attributes used by the list directive. 
 * 
 * @property {string} uifLayout           - Specifies how the list is rendered.
 *                                          Possible values: list - items are rendered as a list
 *                                                           grid - items are rendered as a grid
 * @property {string} uifItemSelectMode   - Specifies whether the list supports selecting items.
 *                                         Possible values: none - selecting items is not possible;
 *                                                          single - only one item can be selected;
 *                                                          multiple - multiple items can be selected;
 */
export interface IListAttributes extends ng.IAttributes {
    uifLayout?: string;
    uifItemSelectMode?: string;
}

export class ListDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = false;
    public template: string = '<ul class="ms-List" ng-transclude></ul>';
    public controller: any = ListController;
    public controllerAs: string = 'list';

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListDirective();

        return directive;
    }

    public link(scope: IListScope, instanceElement: ng.IAugmentedJQuery, attrs: IListAttributes, controller: ListController): void {
        if (attrs.uifLayout !== undefined && attrs.uifLayout !== null) {
            if (ListLayoutEnum[attrs.uifLayout] === undefined) {
                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                '\'' + attrs.uifLayout + '\' is not a valid option for \'uif-layout\'. ' +
                'Valid options are list|grid.');
            } else {
                scope.layout = attrs.uifLayout;
            }
        }

        if (scope.layout === undefined) {
            scope.layout = ListLayoutEnum[ListLayoutEnum.list];
        }

        if (scope.layout === ListLayoutEnum[ListLayoutEnum.grid]) {
            instanceElement.children().eq(0).addClass('ms-List--grid');
        }

        if (attrs.uifItemSelectMode !== undefined && attrs.uifItemSelectMode !== null) {
            if (ListItemSelectModeEnum[attrs.uifItemSelectMode] === undefined) {
                controller.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                '\'' + attrs.uifItemSelectMode + '\' is not a valid option for \'uif-item-select-mode\'. ' +
                'Valid options are none|single|multiple.');
            } else {
                scope.itemSelectMode = attrs.uifItemSelectMode;
            }
        }

        if (scope.itemSelectMode === undefined) {
            scope.itemSelectMode = ListItemSelectModeEnum[ListItemSelectModeEnum.none];
        }
    }
}

/**
 * @ngdoc interface
 * @name IListItemScope
 * @module officeuifabric.components.list
 * 
 * @description 
 * Scope used by the list item controller. 
 * 
 * @property {any} item                    - Contains data item bound to the list item
 * @property {boolean} selected            - Specifies whether the particular list item is selected or not
 * @property {ListItemTypeEnum} type       - Specifies how the list item should be rendered
 * @property {boolean} unread              - Specifies whether the particular list item is read or not
 * @property (boolean) unseen              - Specifies whether the particular list item is seen or not
 * @property {(ev: any) => void} itemClick - event handler for clicking the list item
 */
export interface IListItemScope extends ng.IScope {
    item: any;
    selected: boolean;
    type: ListItemTypeEnum;
    unread: boolean;
    unseen: boolean;
    itemClick: (ev: any) => void;
}

class ListItemController {
    public static $inject: string[] = ['$scope', '$log'];

    constructor(public $scope: IListItemScope, public $log: ng.ILogService) {
    }

    get item(): any {
        return this.$scope.item;
    }
    set item(item: any) {
        this.$scope.item = item;
        this.$scope.$digest();
    }

    get selected(): boolean {
        return this.$scope.selected;
    }
    set selected(selected: boolean) {
        this.$scope.selected = selected;
        this.$scope.$digest();
    }

    get type(): ListItemTypeEnum {
        return this.$scope.type;
    }
    set type(type: ListItemTypeEnum) {
        this.$scope.type = type;
        this.$scope.$digest();
    }

    get unread(): boolean {
        return this.$scope.unread;
    }
    set unread(unread: boolean) {
        this.$scope.unread = unread;
        this.$scope.$digest();
    }

    get unseen(): boolean {
        return this.$scope.unseen;
    }
    set unseen(unseen: boolean) {
        this.$scope.unseen = unseen;
        this.$scope.$digest();
    }
}

/**
 * @ngdoc interface
 * @name IListItemAttributes
 * @module officeuifabric.components.list
 * 
 * @description 
 * Attributes used by the list item directive. 
 * 
 * @property {any} uifItem        - Data item bound to the item
 * @property {string} uifSelected - Specifies whether the particular item is selected or not
 * @property {string} uifType     - Specifies how the item should be rendered
 * @property {string} uifUnread   - Specifies whether the particular item is read or not
 * @property {string} uifUnseen   - Specifies whether the particular item is seen or not 
 */
export interface IListItemAttributes extends ng.IAttributes {
    uifItem: any;
    uifSelected?: string;
    uifType?: string;
    uifUnread?: string;
    uifUnseen?: string;
}

export class ListItemDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = false;
    public template: string = '<li class="ms-ListItem" ng-transclude></li>';
    public require: string = '^uifList';
    public scope: {} = {
        item: '=uifItem'
    };
    public controller: any = ListItemController;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemDirective();

        return directive;
    }

    public link(scope: IListItemScope, instanceElement: ng.IAugmentedJQuery, attrs: IListItemAttributes, list: ListController): void {
        if (attrs.uifSelected !== undefined &&
            attrs.uifSelected !== null) {
            let selectedString: string = attrs.uifSelected.toLowerCase();

            if (selectedString !== 'true' && selectedString !== 'false') {
                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                    '\'' + attrs.uifSelected + '\' is not a valid boolean value. ' +
                    'Valid options are true|false.');
            } else {
                if (selectedString === 'true') {
                    scope.selected = true;
                }
            }
        }

        if (attrs.uifType !== undefined && attrs.uifType !== null) {
            if (ListItemTypeEnum[attrs.uifType] === undefined) {
                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                '\'' + attrs.uifType + '\' is not a valid option for \'uif-type\'. ' +
                'Valid options are item|itemWithImage|itemWithIcon.');
            } else {
                scope.type = ListItemTypeEnum[attrs.uifType];
            }
        }

        switch (scope.type) {
            case ListItemTypeEnum.itemWithIcon:
                instanceElement.children().eq(0).addClass('ms-ListItem--document');
                if (instanceElement.children().find('uif-list-item-icon').length === 0) {
                    list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                    'List item type itemWithIcon requires the uif-list-item-icon directive');
                }
                break;
            case ListItemTypeEnum.itemWithImage:
                instanceElement.children().eq(0).addClass('ms-ListItem--image');
                if (instanceElement.children().find('uif-list-item-image').length === 0) {
                    list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                    'List item type itemWithImage requires the uif-list-item-image directive');
                }
                break;
            default:
                break;
        }

        if (attrs.uifUnread !== undefined &&
            attrs.uifUnread !== null) {
            let unreadString: string = attrs.uifUnread.toLowerCase();

            if (unreadString !== 'true' && unreadString !== 'false') {
                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                    '\'' + attrs.uifUnread + '\' is not a valid boolean value. ' +
                    'Valid options are true|false.');
            } else {
                if (unreadString === 'true') {
                    scope.unread = true;
                }
            }
        }

        if (attrs.uifUnseen !== undefined &&
            attrs.uifUnseen !== null) {
            let unseenString: string = attrs.uifUnseen.toLowerCase();

            if (unseenString !== 'true' && unseenString !== 'false') {
                list.$log.error('Error [ngOfficeUiFabric] officeuifabric.components.list. ' +
                    '\'' + attrs.uifUnseen + '\' is not a valid boolean value. ' +
                    'Valid options are true|false.');
            } else {
                if (unseenString === 'true') {
                    scope.unseen = true;
                }
            }
        }

        if (scope.item !== undefined) {
            list.items.push(scope);
        }

        scope.itemClick = (ev: any): void => {
          scope.selected = !scope.selected;
          scope.$apply();
        }

        scope.$watch('selected', (newValue: boolean, oldValue: boolean, listItemScope: IListItemScope): void => {
            if (newValue === true) {
                if (list.itemSelectMode === ListItemSelectModeEnum[ListItemSelectModeEnum.single]) {
                    if (list.items) {
                        for (let i: number = 0; i < list.items.length; i++) {
                            if (list.items[i] !== listItemScope) {
                                list.items[i].selected = false;
                            }
                        }
                    }
                }

                instanceElement.children().eq(0).addClass('is-selected');
            } else {
                instanceElement.children().eq(0).removeClass('is-selected');
            }
        });

        scope.$watch('unread', (newValue: boolean, oldValue: boolean, listItemScope: IListItemScope): void => {
            if (newValue === true) {
                instanceElement.children().eq(0).addClass('is-unread');
            } else {
                instanceElement.children().eq(0).removeClass('is-unread');
            }
        });

        scope.$watch('unseen', (newValue: boolean, oldValue: boolean, listItemScope: IListItemScope): void => {
            if (newValue === true) {
                instanceElement.children().eq(0).addClass('is-unseen');
            } else {
                instanceElement.children().eq(0).removeClass('is-unseen');
            }
        });

        if (list.itemSelectMode !== ListItemSelectModeEnum[ListItemSelectModeEnum.none]) {
            instanceElement.on('click', scope.itemClick);
            instanceElement.children().eq(0).addClass('is-selectable');
        }
    }
}

export class ListItemPrimaryTextDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<span class="ms-ListItem-primaryText" ng-transclude></span>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemPrimaryTextDirective();

        return directive;
    }
}

export class ListItemSecondaryTextDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<span class="ms-ListItem-secondaryText" ng-transclude></span>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemSecondaryTextDirective();

        return directive;
    }
}

export class ListItemTertiaryTextDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<span class="ms-ListItem-tertiaryText" ng-transclude></span>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemTertiaryTextDirective();

        return directive;
    }
}

export class ListItemMetaTextDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<span class="ms-ListItem-metaText" ng-transclude></span>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemMetaTextDirective();

        return directive;
    }
}

export class ListItemImageDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-image" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemImageDirective();

        return directive;
    }
}

export class ListItemIconDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-itemIcon" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemIconDirective();

        return directive;
    }
}

export class ListItemSelectionTargetDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-selectionTarget" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemSelectionTargetDirective();

        return directive;
    }

    public link(scope: ng.IScope,
                instanceElement: ng.IAugmentedJQuery,
                attrs: ng.IAttributes): void { }
}

export class ListItemActionsDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-actions" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemActionsDirective();

        return directive;
    }
}

export class ListItemActionDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-action" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemActionDirective();

        return directive;
    }
}

/**
 * @ngdoc module
 * @name officeuifabric.components.list
 * 
 * @description 
 * List
 */
export var module: ng.IModule = ng.module('officeuifabric.components.list', ['officeuifabric.components'])
    .directive('uifList', ListDirective.factory())
    .directive('uifListItem', ListItemDirective.factory())
    .directive('uifListItemPrimaryText', ListItemPrimaryTextDirective.factory())
    .directive('uifListItemSecondaryText', ListItemSecondaryTextDirective.factory())
    .directive('uifListItemTartiaryText', ListItemTertiaryTextDirective.factory())
    .directive('uifListItemMetaText', ListItemMetaTextDirective.factory())
    .directive('uifListItemImage', ListItemImageDirective.factory())
    .directive('uifListItemIcon', ListItemIconDirective.factory())
    .directive('uifListItemSelectionTarget', ListItemSelectionTargetDirective.factory())
    .directive('uifListItemActions', ListItemActionsDirective.factory())
    .directive('uifListItemAction', ListItemActionDirective.factory());
