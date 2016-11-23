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
 * @property {string} itemSelectMode  - Specifies the list item selection mode used by the list
 * @property {string} layout          - Specifies how the list should be rendered
 * @property {IListItemScope[]} items - Contains the data items that belong to the list
 * @property {any[]} selectedItems    - Contains the list of selected items
 */
export interface IListScope extends ng.IScope {
    itemSelectMode?: string;
    layout?: string;
    items: IListItemScope[];
    selectedItems: any[];
}

/**
 * @ngdoc object
 * @name ListController
 * @requires  $scope, $log
 * @description
 * List directive controller. Used to keep track of items selected in the list
 */
class ListController {
    public static $inject: string[] = ['$scope', '$log'];

    constructor(public $scope: IListScope, public $log: ng.ILogService) {
        this.$scope.items = [];
        if (!this.$scope.selectedItems) {
            this.$scope.selectedItems = [];
        }
    }

    get itemSelectMode(): string {
        return this.$scope.itemSelectMode;
    }

    get selectedItems(): IListItemScope[] {
        return this.$scope.selectedItems;
    }

    get items(): IListItemScope[] {
        return this.$scope.items;
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
 *                                          Possible values: none - selecting items is not possible;
 *                                                           single - only one item can be selected;
 *                                                           multiple - multiple items can be selected;
 * @property {string} uifSelectedItems    - Specifies the name of the array used to keep track of the
 *                                          selected items
 */
export interface IListAttributes extends ng.IAttributes {
    uifLayout?: string;
    uifItemSelectMode?: string;
    uifSelectedItems?: string;
}

/**
 * @ngdoc directive
 * @name uifList
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list>` is a directive used to display a list of items
 *
 * @see {link http://dev.office.com/fabric/components/list}
 *
 * @usage
 *
 * <uif-list uif-item-select-mode="single" uif-selected-items="selectedItems">
 *   <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message"
 *    uif-type="itemWithIcon">
 *     <uif-list-item-icon>
 *       <uif-icon uif-type="save"></uif-icon>
 *     </uif-list-item-icon>
 *     <uif-list-item-primary-text>{{message.sender.name}}</uif-list-item-primary-text>
 *     <uif-list-item-secondary-text>{{message.title}}</uif-list-item-secondary-text>
 *     <uif-list-item-tertiary-text>{{message.description}}</uif-list-item-tertiary-text>
 *     <uif-list-item-meta-text>{{message.time | date : 'shortTime'}}</uif-list-item-meta-text>
 *     <uif-list-item-selection-target></uif-list-item-selection-target>
 *     <uif-list-item-actions>
 *       <uif-list-item-action ng-click="mail(message)">
 *         <uif-icon uif-type="mail"></uif-icon>
 *       </uif-list-item-action>
 *       <uif-list-item-action ng-click="delete(message)">
 *         <uif-icon uif-type="trash"></uif-icon>
 *       </uif-list-item-action>
 *       <uif-list-item-action ng-click="pin(message)">
 *         <uif-icon uif-type="pinLeft"></uif-icon>
 *       </uif-list-item-action>
 *     </uif-list-item-actions>
 *   </uif-list-item>
 * </uif-list>
 */
export class ListDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public replace: boolean = false;
    public template: string = '<ul class="ms-List" ng-transclude></ul>';
    public controller: any = ListController;
    public controllerAs: string = 'list';
    public scope: {} = {
        selectedItems: '=?uifSelectedItems'
    };

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

/**
 * @ngdoc object
 * @name ListItemController
 * @requires  $scope, $log
 * @description
 * List Item directive controller
 */
class ListItemController {
    public static $inject: string[] = ['$scope', '$log'];

    constructor(public $scope: IListItemScope, public $log: ng.ILogService) {
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

/**
 * @ngdoc directive
 * @name uifListItem
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item>` is a directive that represents an item in a list
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list uif-item-select-mode="single" uif-selected-items="selectedItems">
 *   <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message"
 *    uif-type="itemWithIcon">
 *     <uif-list-item-icon>
 *       <uif-icon uif-type="save"></uif-icon>
 *     </uif-list-item-icon>
 *     <uif-list-item-primary-text>{{message.sender.name}}</uif-list-item-primary-text>
 *     <uif-list-item-secondary-text>{{message.title}}</uif-list-item-secondary-text>
 *     <uif-list-item-tertiary-text>{{message.description}}</uif-list-item-tertiary-text>
 *     <uif-list-item-meta-text>{{message.time | date : 'shortTime'}}</uif-list-item-meta-text>
 *     <uif-list-item-selection-target></uif-list-item-selection-target>
 *     <uif-list-item-actions>
 *       <uif-list-item-action ng-click="mail(message)">
 *         <uif-icon uif-type="mail"></uif-icon>
 *       </uif-list-item-action>
 *       <uif-list-item-action ng-click="delete(message)">
 *         <uif-icon uif-type="trash"></uif-icon>
 *       </uif-list-item-action>
 *       <uif-list-item-action ng-click="pin(message)">
 *         <uif-icon uif-type="pinLeft"></uif-icon>
 *       </uif-list-item-action>
 *     </uif-list-item-actions>
 *   </uif-list-item>
 * </uif-list>
 */
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

        if (scope.item && list.selectedItems.length > 0) {
            for (let i: number = 0; i < list.selectedItems.length; i++) {
                if (list.selectedItems[i] === scope.item) {
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
        };

        scope.$watch('selected', (newValue: boolean, oldValue: boolean, listItemScope: IListItemScope): void => {
            if (newValue === true) {
                if (list.itemSelectMode === ListItemSelectModeEnum[ListItemSelectModeEnum.single]) {
                    list.selectedItems.length = 0;

                    if (list.items) {
                        for (let i: number = 0; i < list.items.length; i++) {
                            if (list.items[i] !== listItemScope) {
                                list.items[i].selected = false;
                            }
                        }
                    }
                }

                // only add to the list if not yet exists. prevents conflicts
                // with preselected items
                let itemAlreadySelected: boolean = false;
                for (let i: number = 0; i < list.selectedItems.length; i++) {
                    if (list.selectedItems[i] === listItemScope.item) {
                        itemAlreadySelected = true;
                        break;
                    }
                }
                if (!itemAlreadySelected) {
                    list.selectedItems.push(listItemScope.item);
                }

                instanceElement.children().eq(0).addClass('is-selected');
            } else {
                for (let i: number = 0; i < list.selectedItems.length; i++) {
                    if (list.selectedItems[i] === listItemScope.item) {
                        list.selectedItems.splice(i, 1);
                        break;
                    }
                }

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

/**
 * @ngdoc directive
 * @name uifListItemPrimaryText
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-primary-text>` is a directive that represents the primary text of a list item (eg. e-mail sender)
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message">
 *   <uif-list-item-primary-text>{{message.sender.name}}</uif-list-item-primary-text>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemSecondaryText
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-secondary-text>` is a directive that represents the secondary text of a list item (eg. e-mail subject)
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message">
 *   <uif-list-item-secondary-text>{{message.sender.name}}</uif-list-item-secondary-text>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemTertiartText
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-tertiary-text>` is a directive that represents the tertiary text of a list item (eg. e-mail short preview)
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message">
 *   <uif-list-item-tertiary-text>{{message.sender.name}}</uif-list-item-tertiary-text>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemMetaText
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-meta-text>` is a directive that represents the meta text of a list item (eg. e-mail send time)
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}" uif-unseen="{{message.isUnseen}}" uif-item="message">
 *   <uif-list-item-meta-text>{{message.sender.name}}</uif-list-item-meta-text>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemImage
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-image>` is a directive that represents the image of a list item.
 * This directive is required when list item type is set to `itemWithImage`.
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}"
 *    uif-unseen="{{message.isUnseen}}" uif-item="message" uif-type="itemWithImage">
 *   <uif-list-item-image>
 *     <img ng-src="{{message.image}}" />
 *   </uif-list-item-image>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemIcon
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-icon>` is a directive that represents the icon of a list item.
 * This directive is required when list item type is set to `itemWithIcon`.
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}"
 *  uif-unseen="{{message.isUnseen}}" uif-item="message" uif-type="itemWithIcon">
 *   <uif-list-item-icon>
 *     <uif-icon uif-type="save"></uif-icon>
 *   </uif-list-item-icon>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemSelectionTarget
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-selection-target>` is a directive that represents the space used to display item selection box.
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}"
 *  uif-unseen="{{message.isUnseen}}" uif-item="message">
 *   <uif-list-item-selection-target></uif-list-item-selection-target>
 * </uif-list-item>
 */
export class ListItemSelectionTargetDirective implements ng.IDirective {
    public restrict: string = 'E';
    public transclude: boolean = true;
    public template: string = '<div class="ms-ListItem-selectionTarget" ng-transclude></div>';
    public replace: boolean = false;

    public static factory(): ng.IDirectiveFactory {
        const directive: ng.IDirectiveFactory = () => new ListItemSelectionTargetDirective();

        return directive;
    }
}

/**
 * @ngdoc directive
 * @name uifListItemActions
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-actions>` is a directive that wraps any actions specified on a list item.
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}"
 *  uif-unseen="{{message.isUnseen}}" uif-item="message" uif-type="itemWithIcon">
 *   <uif-list-item-actions>
 *     <uif-list-item-action ng-click="mail(message)">
 *       <uif-icon uif-type="mail"></uif-icon>
 *     </uif-list-item-action>
 *     <uif-list-item-action ng-click="delete(message)">
 *       <uif-icon uif-type="trash"></uif-icon>
 *     </uif-list-item-action>
 *     <uif-list-item-action ng-click="pin(message)">
 *       <uif-icon uif-type="pinLeft"></uif-icon>
 *     </uif-list-item-action>
 *   </uif-list-item-actions>
 * </uif-list-item>
 */
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

/**
 * @ngdoc directive
 * @name uifListItemAction
 * @module officeuifabric.components.list
 *
 * @restrict E
 *
 * @description
 * `<uif-list-item-action>` is a directive that represent a single action on a list item
 *
 * @see {link http://dev.office.com/fabric/components/listitem}
 *
 * @usage
 *
 * <uif-list-item ng-repeat="message in messages" uif-unread="{{message.isUnread}}"
 *  uif-unseen="{{message.isUnseen}}" uif-item="message" uif-type="itemWithIcon">
 *   <uif-list-item-actions>
 *     <uif-list-item-action ng-click="mail(message)">
 *       <uif-icon uif-type="mail"></uif-icon>
 *     </uif-list-item-action>
 *   </uif-list-item-actions>
 * </uif-list-item>
 */
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
export let module: ng.IModule = ng.module('officeuifabric.components.list', ['officeuifabric.components'])
    .directive('uifList', ListDirective.factory())
    .directive('uifListItem', ListItemDirective.factory())
    .directive('uifListItemPrimaryText', ListItemPrimaryTextDirective.factory())
    .directive('uifListItemSecondaryText', ListItemSecondaryTextDirective.factory())
    .directive('uifListItemTertiaryText', ListItemTertiaryTextDirective.factory())
    .directive('uifListItemMetaText', ListItemMetaTextDirective.factory())
    .directive('uifListItemImage', ListItemImageDirective.factory())
    .directive('uifListItemIcon', ListItemIconDirective.factory())
    .directive('uifListItemSelectionTarget', ListItemSelectionTargetDirective.factory())
    .directive('uifListItemActions', ListItemActionsDirective.factory())
    .directive('uifListItemAction', ListItemActionDirective.factory());
