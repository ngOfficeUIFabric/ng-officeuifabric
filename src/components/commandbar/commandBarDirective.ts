'use strict';

import * as ng from 'angular';

/**
 * @ngdoc directive
 * @name uifCommandBar
 * @module officeuifabric.components.commandbar
 *
 * @restrict E
 *
 * @description
 * `<uif-command-bar>` is the commandbar directive.
 *
 * @see {link http://dev.office.com/fabric/components/commandbar}
 *
 * @usage
 *
 * <uif-command-bar>
 *  <uif-command-bar-search></uif-command-bar-search>
 *  <uif-command-bar-side>
 *   <uif-command-bar-item>
 *    <uif-icon uif-type="save" />
 *     <span>Right</span>
 *   </uif-command-bar-item>
 *  </uif-command-bar-side>
 *  <uif-command-bar-main uif-show-overflow='true'>
 *   <uif-command-bar-item ng-click="goToLink('First Item')">
 *    <uif-icon uif-type="save"></uif-icon>
 *     <span>First Item</span>
 *    </uif-command-bar-item>
 *  </uif-command-main>
 * </uif-command-bar>
 */
export class CommandBarDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<div class="ms-CommandBar" ng-transclude></div>';
  public transclude: Boolean = true;
  public replace: boolean = true;

  public scope: {} = {
    placeholder: '@',
    uifSearchTerm: '='
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new CommandBarDirective();
    return directive;

  }

  public link(scope: ICommandBarScope, elem: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
  {

    // focuses the cursor on the input box
    scope.focusSearchInput = () => {
      scope.isSearchActive = true;
      angular.element(elem[0].querySelector('.ms-CommandBarSearch-input'))[0].focus();
    };

    // clears the search term
    scope.clearSearchTerm = () => {
        scope.uifSearchTerm = null;
        scope.isSearchActive = false;
    };

  }};

}

/**
 * @ngdoc interface
 * @name ICommandBarScope
 * @module officeuifabric.components.commandbar
 *
 * @description
 * This is the scope used by the <uif-command-bar> directive.
 *
 * @property {string} uifSearchTerm    -  The string value in the uifCommandBarSearch input
 * @property {string} placeholder    -  The placeholder for the search input
 * @property {boolean} isSearchActive    -  Indicates whether search bar is active - defines the style and behaviour of the element
 * @property {function} focusSearchInput() - Brings the cursor to the search input in mobile mode and when clicking on the search hourglass
 * @property {function} clearSearchTerm()    -  Clears the search term
 */
interface ICommandBarScope extends ng.IScope {
  uifSearchTerm: string;
  placeholder: string;
  isSearchActive: boolean;
  focusSearchInput: () => void;
  clearSearchTerm: () => void;
}

/**
 * @ngdoc directive
 * @name uifCommandBarSearch
 * @module officeuifabric.components.commandbar
 * @restrict E
 *
 * @description
 * `<uif-command-bar-search>` implements the fabric commandbar search box behaviour, optional
 *
 * @usage
 *
 * <uif-command-bar-search placeholder='Search'></uif-command-bar-search>
 */
export class CommandBarSearchDirective implements ng.IDirective {

  public restrict: string = 'E';
  public replace: boolean = true;
  public transclude: boolean = true;
  public template: string = `<div class="ms-CommandBarSearch" ng-class="$parent.isSearchActive == true ? \'is-active\' : \'\';">
                             <input class="ms-CommandBarSearch-input"
                                    type="text"
                                    placeholder="{{$parent.placeholder}}"
                                    tabindex="1"
                                    ng-focus="$parent.isSearchActive = true;"
                                    ng-blur="$parent.isSearchActive = false;"
                                    ng-model="$parent.uifSearchTerm">
                             <div class="ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconSearchWrapper"
                                  ng-click="$parent.focusSearchInput()">
                                  <uif-icon uif-type="search" />
                              </div>
                             <div class="ms-CommandBarSearch-iconWrapper ms-CommandBarSearch-iconClearWrapper ms-font-s"
                                  ng-mousedown="$parent.clearSearchTerm()">
                                  <uif-icon uif-type="x"/>
                              </div>
                            </div>`;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new CommandBarSearchDirective();
    return directive;
  }
}


/**
 * @ngdoc directive
 * @name uifCommandBarSide
 * @module officeuifabric.components.commandbar
 * @restrict E
 *
 * @description
 * `<uif-command-bar-side>` is the side command, show on the right-hand side of the uifCommandBar.
 *
 * @usage
 *
 * <uif-command-bar-side></uif-command-bar-side>
 */
export class CommandBarSideDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<div class="ms-CommandBar-sideCommands" ng-transclude></div>';
  public replace: boolean = true;
  public transclude: Boolean = true;

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new CommandBarSideDirective();
    return directive;
  }
}


/**
 * @ngdoc directive
 * @name uifCommandBarMain
 * @module officeuifabric.components.commandbar
 * @restrict E
 *
 * @description
 * `<uif-command-bar-main>` is the uifCommandBarMain directive. Holds all uifCommandBarItems rendered on the left-hand side
 *
 * @usage
 *
 * <uif-command-bar-main></uif-command-bar-main>
 */
export class CommandBarMainDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = `<div class="ms-CommandBar-mainArea">
                              <ng-transclude></ng-transclude>
                              <div ng-if="uifShowOverflow"
                                class="ms-CommandBarItem ms-CommandBarItem--iconOnly ms-CommandBarItem-overflow"
                                ng-class="overflowVisible == true ? \'is-visible\' : \'\';">
                                  <div class="ms-CommandBarItem-linkWrapper"
                                    ng-click="openOverflowMenu()">
                                    <a class="ms-CommandBarItem-link" tabindex="2">
                                      <uif-icon uif-type="ellipsis" />
                                      </a>
                                    </div>
                                  </div>
                                </div>`;
  public replace: boolean = true;
  public transclude: Boolean = true;
  public controller: any = CommandBarMainController;
  public scope: {} =
  {
    uifShowOverflow: '='
  };

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = ($timeout: ng.ITimeoutService) => new CommandBarMainDirective($timeout);
    directive.$inject = ['$timeout'];
    return directive;
  }

  public compile(element: ng.IAugmentedJQuery,
                 attrs: ng.IAttributes,
                 transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
    return {
      post: this.postLink
    };
  }

  constructor(private $timeout: ng.ITimeoutService) { }

  private postLink( scope: ICommandBarMainScope,
                    elem: ng.IAugmentedJQuery,
                    attrs: ng.IAttributes,
                    ctrl: CommandBarMainController): void {

        // bind window resize to trigger overflow event
        angular.element(window).bind('resize', function(): void {
            scope.overflowMenuOpen = false;
            scope.toggleItemVisibility(elem.prop('offsetWidth'), elem);
          });

        // fire on load to render overflow correctly
        angular.element(document).ready(function (): void {
          scope.loadMenuItems(angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')));
          scope.toggleItemVisibility(elem.prop('offsetWidth'), elem);
        });

        // opens the overflow menu
        scope.openOverflowMenu = function(): void
        {
            scope.overflowMenuOpen = !scope.overflowMenuOpen;

            // buid dropdown
            let contextualMenu: string;
            contextualMenu = ` <uif-contextual-menu class="ms-CommandBar-overflowMenu"
              uif-is-open="overflowMenuOpen"
              uif-close-on-click="false">`;

            angular.element(elem[0].querySelector('.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper ul')).remove();

            angular.forEach(scope.hiddenItems, function(menuitem: any): void {
              if (menuitem.submenu) {
                  contextualMenu += `<uif-contextual-menu-item ng-model="hiddenItems[` + menuitem.i + `]"
                                        ng-click='openOverflowItem(hiddenItems[` + menuitem.i + `])'
                                        uif-text='hiddenItems[` + menuitem.i + `].text'
                                        ng-show='hiddenItems[` + menuitem.i + `].visible'
                                        uif-type="subMenu">
                                          <uif-contextual-menu>
                                              <uif-contextual-menu-item
                                               ng-click='openOverflowItem(subitem)'
                                               uif-text='subitem.text'
                                               uif-type="link"
                                               ng-repeat="subitem in hiddenItems[` + menuitem.i + `].submenuitems track by $index"/>
                                          </uif-contextual-menu>
                                      </uif-contextual-menu-item>`;
                } else {
                  contextualMenu += `<uif-contextual-menu-item ng-model="hiddenItems[` + menuitem.i + `]"
                                        ng-click='openOverflowItem(hiddenItems[` + menuitem.i + `])'
                                        uif-text='hiddenItems[` + menuitem.i + `].text'
                                        ng-show='hiddenItems[` + menuitem.i + `].visible'
                                        uif-type="link">
                                      </uif-contextual-menu-item>`;
                }
              });

            contextualMenu += '</<uif-contextual-menu>';
            let menu: any;
            menu = elem[0].querySelector('.ms-CommandBarItem-overflow .ms-CommandBarItem-linkWrapper');
            angular.element(menu).append(ctrl.$compile(contextualMenu)(scope));
        };

        // calculate total width of items, fired on resize and called on load
        scope.loadMenuItems = function(commandItems: any): void
        {
          let commandItemWidth: number = 0;
          let commandItemIndex: number = 0;
          scope.commandItems = [];
          angular.forEach(commandItems, function(element: any): void {
            if (angular.element(element).hasClass('ms-CommandBarItem-overflow') !== true) {
             commandItemWidth += element.offsetWidth;
             scope.commandItems.push({index: commandItemIndex, offset: commandItemWidth});
             commandItemIndex++;
            }
          });
        };

        // opens the overflow item by calling the click of the related uifCommandBarItem
        scope.openOverflowItem = function(item: any): void
        {
          // open any submenu which was defined in the uifCommandBarItem
          if (item.submenu) {
            item.submenuitems = [];
            angular.forEach(item.submenu.children, function(element: any): void {
              let submenuitem: any;
              submenuitem = {};
              submenuitem.text =  element.innerText;
              submenuitem.menuType =  'item';
              submenuitem.childitem =  true;
              submenuitem.i =  item.submenuitems.length;
              submenuitem.parent =  item.i;

              item.submenuitems.push(submenuitem);
            });
          } else {
            ctrl.$timeout(
              () => {
                if (item.childitem === true) {
                  let m: any;
                  m = elem[0].querySelectorAll('.ms-CommandBarItem')[item.parent].querySelectorAll('.ms-ContextualMenu-item')[item.i];
                  angular.element(m).triggerHandler('click');
                } else {
                  angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[item.i]).triggerHandler('click');
                }
              },
              1);
          }
        };

        // calculated which items should be hidden and places them into overflow
        scope.toggleItemVisibility = function(parentWidth: any, commandBarItem: any): void
        {

          // check for toggle to/from mobile
          if (window.innerWidth < 640 && scope.mobileSwitch === false) {
            scope.loadMenuItems(angular.element(commandBarItem[0].querySelectorAll('.ms-CommandBarItem')));
            scope.mobileSwitch = true;
          } else if (window.innerWidth >= 640 && scope.mobileSwitch === true) {
            scope.loadMenuItems(angular.element(commandBarItem[0].querySelectorAll('.ms-CommandBarItem')));
            scope.mobileSwitch = false;
          }

          // check for any existing items which need to be hidden
          angular.forEach(scope.commandItems, function(element: any): void {
              if (element.offset >= parentWidth - 200) {
                angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[element.index]).addClass('is-hidden');
                scope.hiddenItems[element.index].visible = true;
                scope.overflowVisible = true;
              } else {
                angular.element(elem[0].querySelectorAll('.ms-CommandBarItem')[element.index]).removeClass('is-hidden');
                scope.hiddenItems[element.index].visible = false;
                scope.overflowVisible = false;
              }
          });

          scope.$apply();
        };


    };
}


/**
 * @ngdoc interface
 * @name ICommandBarItemScope
 * @module officeuifabric.components.commandbar
 *
 * @description
 * This is the scope used by the directive.
 *
 * @property {boolean} uifShowOverflow     -  Indicates whether the overflow menu is shown
 * @property {boolean} overflowMenuOpen     -  Indicates whether the overflow menu is open
 * @property {boolean} overflowVisible     -  Indicates whether the overflow icon should be displayed
 * @property {boolean} mobileSwitch     -  Indicates whether the device is in the mobile viewport (below 640px)
 * @property {collection} commandItems     -  contains all hidden items
 * @property {collection} hiddenitems     -  contains all hidden items
 * @property {function} openOverflowItem     -  calls the click of the overflowed item
 * @property {function} loadMenuItems     -  loads all of the menu items from <uif-command-bar-main> and records offset for overflow calc
 * @property {function} toggleItemVisibility     -  Hides and overflows items which break the bounds of the control
 * @property {function} openOverflowMenu     -  Opens the overflow menu
 * @property {function} openOverflowItem     -  Adds an item to hiddenItems
 */
interface ICommandBarMainScope extends ng.IScope {
  uifShowOverflow: boolean;
  overflowMenuOpen: boolean;
  overflowVisible: boolean;
  mobileSwitch: boolean;
  commandItems: any[];
  hiddenItems: any[];
  openOverflowItem: (item: any) => void;
  loadMenuItems: (commandItems: any) => void;
  toggleItemVisibility: (parentWidth: any, commandBarItem: any) => void;
  openOverflowMenu: () => void;
  addOverflowItem: (item: any) => void;
}

/**
 * @ngdoc controller
 * @name CommandBarMainController
 * @module officeuifabric.components.commandbar
 *
 * @description
 * Controller used for the `<uif-command-bar-side-main>` directive.
 */
export class CommandBarMainController {

    public static $inject: string[] = ['$scope', '$element', '$compile', '$timeout'];

    constructor(private $scope: ICommandBarMainScope,
                private $element: ng.IAugmentedJQuery,
                public $compile: ng.ICompileService,
                public $timeout: ng.ITimeoutService) {
    }

    public addOverflowItem(item: any): void {

      if (this.$scope.hiddenItems == null) {
        this.$scope.hiddenItems = [];
      }
      item.i = this.$scope.hiddenItems.length;
      this.$scope.hiddenItems.push(item);
    }
}

/**
 * @ngdoc directive
 * @name uifCommandBarItem
 * @module officeuifabric.components.commandbar
 *
 * @restrict E
 *
 * @description
 * `<uif-command-bar-item>` is the commandbar directive.
 *
 * @usage
 *
 * <uif-command-baritem><span>Item</span></uif-command-bar-item>
 */
export class CommandBarItemDirective implements ng.IDirective {

  public restrict: string = 'E';
  public template: string = '<div class="ms-CommandBarItem">' +
      '<div class="ms-CommandBarItem-linkWrapper">' +
      ' <a class="ms-CommandBarItem-link">' +
      ' </a>' +
      '</div>' +
      '</div>';

  public transclude: boolean = true;
  public replace: boolean = true;
  public controller: any = CommandBarMainController;
  public require: string = '^?uifCommandBarMain';

  public static factory(): ng.IDirectiveFactory {
    const directive: ng.IDirectiveFactory = () => new CommandBarItemDirective();
    return directive;
  }

  public compile(element: ng.IAugmentedJQuery,
                 attrs: ng.IAttributes,
                 transclude: ng.ITranscludeFunction): ng.IDirectivePrePost {
    return {
      post: this.postLink
    };
  }

  private postLink( scope: ICommandBarMainScope,
                    elem: ng.IAugmentedJQuery,
                    attrs: ng.IAttributes,
                    ctrl: CommandBarMainController,
                    transclude: ng.ITranscludeFunction): void {

      transclude((clone: ng.IAugmentedJQuery) => {

        let hiddenItem: any;

        hiddenItem = {};

        for (let i: number = 0; i < clone.length; i++) {
          if (clone[i].tagName === 'UIF-ICON') {
            angular.element(elem[0].querySelector('a.ms-CommandBarItem-link')).append(clone[i]);
          }
          if (clone[i].tagName === 'SPAN') {

            // validate whether user has added fabric class, include if required
            if (!clone[i].classList.contains('ms-CommandBarItem-commandText')) {
              clone[i].classList.add('ms-CommandBarItem-commandText');
            }
            // validate whether user has added any fabric text class, include if required
            if (clone[i].className.indexOf('ms-font-') === -1) {
              clone[i].classList.add('ms-font-m');
            }

            angular.element(elem[0].querySelector('a.ms-CommandBarItem-link')).append(clone[i]);

            hiddenItem.text = clone[i].innerText;

          }

          // add the contextual menu to the appropriate place
          if (clone[i].tagName === 'UL' && clone[i].classList.contains('ms-ContextualMenu')) {
            angular.element(elem).append(clone[i]);

            // go through each item
            hiddenItem.submenu = clone[i];
          }

        }

        if (ctrl !== null) {
          if (hiddenItem.submenu == null) {
            hiddenItem.menuType = 'link';
          } else {
            hiddenItem.menuType = 'subMenu';
          }
          ctrl.addOverflowItem(hiddenItem);
        }

      });

      // check whether there is a uifIcon, set as textonly otherwise
      if (angular.element(elem[0].querySelector('.ms-CommandBarItem-link > uif-icon')).length === 0) {
          angular.element(elem[0].querySelector('.ms-CommandBarItem')).addClass('ms-CommandBarItem-hasTextOnly');
      }

    }

}

/**
 * @ngdoc module
 * @name officeuifabric.components.commandbar
 *
 * @description
 * CommandBar
 *
 */
export var module: ng.IModule = ng.module('officeuifabric.components.commandbar', [
    'officeuifabric.components'
  ])
  .directive('uifCommandBar', CommandBarDirective.factory())
  .directive('uifCommandBarSearch', CommandBarSearchDirective.factory())
  .directive('uifCommandBarItem', CommandBarItemDirective.factory())
  .directive('uifCommandBarMain', CommandBarMainDirective.factory())
  .directive('uifCommandBarSide', CommandBarSideDirective.factory());
